import OpenAI from "openai";
import { NextResponse } from "next/server";

// 1. Check for API Key
const apiKey = process.env.OPENROUTER_API_KEY;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Resume Builder",
  },
});

// ✅ FINAL STABLE LIST (2026)
// We use the non-dated 'flash-exp' ID which is the main stable free version.
const FREE_MODELS = [
  "arcee-ai/trinity-large-preview:free",
  "lfm-2.5-1.2b-thinking:free",
  "molmo-2-8b:free",
  "nemotron-3-nano-30b-a3b:free",
];

function cleanJsonString(str: string) {
  // Remove markdown code blocks if present
  return str.replace(/^```(json)?\s*/i, "").replace(/\s*```$/, "");
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Server Configuration Error: API Key is missing.",
        },
        { status: 500 },
      );
    }

    const { prompt } = await req.json();

    const systemPrompt = `You are an expert resume writer. Return a valid JSON object. No markdown. No conversation.
    Structure:
    {
      "personalInfo": { "fullName": "", "email": "", "phone": "", "address": "", "linkedin": "", "github": "" },
      "summary": "",
      "experiences": [ { "company": "", "position": "", "startDate": "", "endDate": "", "description": "", "current": false } ],
      "educations": [ { "school": "", "degree": "", "field": "", "startDate": "", "endDate": "", "gpa": "" } ],
      "skills": [ "Skill1", "Skill2" ]
    }`;

    // Error Accumulator
    const errorLog: string[] = [];

    // Per-model timeout (ms) - configurable via env var
    const MODEL_TIMEOUT = process.env.GEN_TIMEOUT_MS ? parseInt(process.env.GEN_TIMEOUT_MS) : 10000;

    // Loop through models
    for (const modelName of FREE_MODELS) {
      try {
        console.log(`Attempting generation with: ${modelName}`);

        // Use AbortController to limit wait time per-model
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          try {
            controller.abort();
          } catch (e) {}
        }, MODEL_TIMEOUT);

        let response;
        try {
          response = await openai.chat.completions.create({
            model: modelName,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt },
            ],
            signal: controller.signal,
          } as any);
        } finally {
          clearTimeout(timeoutId);
        }

        const content = response.choices[0].message.content || "{}";
        const cleanedContent = cleanJsonString(content);

        // Validate JSON
        try {
          const data = JSON.parse(cleanedContent);

          // ✅ SUCCESS!
          // This log confirms Gemini worked. The loop stops here immediately.
          console.log(`✅ Success with ${modelName}`);
          return NextResponse.json({ success: true, data });
        } catch (parseError) {
          console.warn(`⚠️ ${modelName} returned invalid JSON.`);
          errorLog.push(`${modelName}: Invalid JSON`);
          continue;
        }
      } catch (modelError: unknown) {
        const errorMessage = modelError instanceof Error ? modelError.message : "Unknown error";
        // If aborted, provide clearer message
        if (modelError && typeof modelError === 'object' && (modelError as any).name === 'AbortError') {
          console.warn(`⏱️ ${modelName} timed out after ${MODEL_TIMEOUT}ms`);
          errorLog.push(`${modelName}: timed out after ${MODEL_TIMEOUT}ms`);
        } else {
          console.warn(`❌ ${modelName} failed: ${errorMessage}`);
          errorLog.push(`${modelName}: ${errorMessage}`);
        }
        continue;
      }
    }

    // If we get here, EVERY model failed.
    console.error(
      "All models failed. Summary:",
      JSON.stringify(errorLog, null, 2),
    );

    throw new Error(`All models failed. Details:\n${errorLog.join("\n")}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
