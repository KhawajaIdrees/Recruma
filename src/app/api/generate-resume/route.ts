import OpenAI from "openai";
import { NextResponse } from "next/server";

interface ResumeGenerationResponse {
  choices: Array<{ message: { content: string } }>;
}

const apiKey = process.env.OPENROUTER_API_KEY;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Recruma",
  },
});

/** Free model fallbacks — order matters (first healthy model wins). */
const FREE_MODELS = [
  "nemotron-3-nano-30b-a3b:free",
  "arcee-ai/trinity-large-preview:free",
  "lfm-2.5-1.2b-thinking:free",
  "molmo-2-8b:free",
];

/** Safe messages returned to the browser — never include model IDs, keys, or provider payloads. */
const CLIENT_ERRORS = {
  missingKey: "Resume generation is temporarily unavailable. Please try again later.",
  invalidRequest: "We could not process that request. Please check your input and try again.",
  allFailed: "We could not generate your resume right now. Please try again in a moment.",
  unexpected: "Something went wrong. Please try again.",
} as const;

function cleanJsonString(str: string) {
  return str.replace(/^```(json)?\s*/i, "").replace(/\s*```$/, "");
}

/** Short opaque id for correlating client reports with server logs. */
function requestId() {
  return `gen_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function clientError(message: string, status: number, id: string) {
  return NextResponse.json(
    { success: false, error: message, code: id },
    { status }
  );
}

export async function POST(req: Request) {
  const id = requestId();

  try {
    if (!apiKey) {
      console.error(`[${id}] Missing OPENROUTER_API_KEY`);
      return clientError(CLIENT_ERRORS.missingKey, 503, id);
    }

    let prompt: unknown;
    try {
      const body = await req.json();
      prompt = body?.prompt;
    } catch {
      console.warn(`[${id}] Invalid JSON body`);
      return clientError(CLIENT_ERRORS.invalidRequest, 400, id);
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
      console.warn(`[${id}] Empty or invalid prompt`);
      return clientError(CLIENT_ERRORS.invalidRequest, 400, id);
    }

    const systemPrompt = `You are an expert resume writer. Return a valid JSON object. No markdown. No conversation.
    Structure:
    {
      "personalInfo": { "fullName": "", "email": "", "phone": "", "address": "", "linkedin": "", "github": "" },
      "summary": "",
      "experiences": [ { "company": "", "position": "", "startDate": "", "endDate": "", "description": "", "current": false } ],
      "educations": [ { "school": "", "degree": "", "field": "", "startDate": "", "endDate": "", "gpa": "" } ],
      "skills": [ "Skill1", "Skill2" ]
    }`;

    const errorLog: string[] = [];
    const MODEL_TIMEOUT = process.env.GEN_TIMEOUT_MS
      ? parseInt(process.env.GEN_TIMEOUT_MS, 10)
      : 45000;

    for (let i = 0; i < FREE_MODELS.length; i++) {
      const modelName = FREE_MODELS[i];
      const label = `provider-${i + 1}`;

      try {
        console.log(`[${id}] Attempting ${label}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          try {
            controller.abort();
          } catch {
            /* ignore */
          }
        }, MODEL_TIMEOUT);

        let response: ResumeGenerationResponse;
        try {
          response = (await openai.chat.completions.create(
            {
              model: modelName,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt },
              ],
            },
            { signal: controller.signal },
          )) as ResumeGenerationResponse;
        } finally {
          clearTimeout(timeoutId);
        }

        const content = response.choices[0]?.message?.content || "{}";
        const cleanedContent = cleanJsonString(content);

        try {
          const data = JSON.parse(cleanedContent);
          console.log(`[${id}] Success with ${label}`);
          return NextResponse.json({ success: true, data });
        } catch {
          console.warn(`[${id}] ${label} returned invalid JSON`);
          errorLog.push(`${label}: invalid_json`);
          continue;
        }
      } catch (modelError: unknown) {
        const isAbort =
          modelError &&
          typeof modelError === "object" &&
          "name" in modelError &&
          (modelError as { name?: string }).name === "AbortError";

        if (isAbort) {
          console.warn(`[${id}] ${label} timed out after ${MODEL_TIMEOUT}ms`);
          errorLog.push(`${label}: timeout`);
        } else {
          const errorMessage =
            modelError instanceof Error ? modelError.message : "unknown";
          // Server-only: full provider message stays in the IDE/server terminal
          console.warn(`[${id}] ${label} failed: ${errorMessage}`);
          errorLog.push(`${label}: failed`);
        }
        continue;
      }
    }

    console.error(`[${id}] All providers failed:`, errorLog.join(", "));
    return clientError(CLIENT_ERRORS.allFailed, 503, id);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error(`[${id}] Unexpected error:`, message);
    return clientError(CLIENT_ERRORS.unexpected, 500, id);
  }
}
