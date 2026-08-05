# Shared Dialog Guide

Recruma uses one shared dialog for messages, confirmations, forms, and any custom content. Prefer this over `alert()` / `confirm()`.

## Setup

`DialogProvider` is already mounted in the root layout via `Providers`. You do not need to wrap pages again.

## Import

```tsx
// From React components (hook)
import { useDialog } from "@/components/ui/DialogProvider";

// From anywhere (including non-React modules like pdfGenerator)
import { openDialog, showAlert, showConfirm, closeDialog } from "@/components/ui/Dialog";
```

## Quick helpers

### Alert (OK button)

```tsx
const dialog = useDialog();

dialog.alert({
  title: "Something went wrong",
  message: "We could not complete that request. Please try again.",
  variant: "error",
});
```

### Confirm (returns Promise)

```tsx
const ok = await dialog.confirm({
  title: "Start over?",
  message: "This will clear all resume information you entered.",
  confirmLabel: "Clear everything",
  cancelLabel: "Keep editing",
  danger: true,
});

if (ok) {
  // user confirmed
}
```

## Full `open` API (any content)

```tsx
dialog.open({
  title: "Edit contact",
  description: "Optional short helper text under the title.",
  variant: "info",      // default | info | success | warning | error
  size: "lg",           // sm | md | lg | xl | full
  showClose: true,
  closeOnBackdrop: true,
  content: (
    <div className="space-y-3">
      <label className="block text-sm">
        Email
        <input className="mt-1 w-full border rounded-lg px-3 py-2" />
      </label>
      <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm">
        Warning: this email will be visible on your resume.
      </p>
    </div>
  ),
  actions: [
    { label: "Cancel", variant: "secondary" },
    {
      label: "Save",
      variant: "primary",
      onClick: async () => {
        // save logic
      },
    },
  ],
});
```

## Action buttons

Each action supports:

| Field | Type | Notes |
|-------|------|--------|
| `label` | string | Button text |
| `variant` | `primary` \| `secondary` \| `danger` \| `ghost` | Visual style |
| `onClick` | `() => void \| Promise<void>` | Optional handler |
| `closeOnClick` | boolean | Defaults to `true` |
| `disabled` | boolean | Disables the button |

## Sizing

The dialog grows with content up to `max-h-[90vh]`. Long bodies scroll inside the panel. Pick `size` for width only; height stays dynamic.

## Variants

- `default` — neutral slate theme
- `info` — informational notice
- `success` — completed action
- `warning` — caution / destructive confirmation
- `error` — failure (use friendly copy; do not dump stack traces or API payloads)

## User-facing errors

Never show raw exception messages, stack traces, API model names, timeouts, or provider JSON in the dialog **or** the browser console.

```tsx
// Bad — leaks provider / stack details into DevTools
console.error(error);
dialog.alert({ message: error.message });

// Good — generic UI + generic browser log; details stay on the server
console.error("Resume generation failed");
dialog.alert({
  title: "Could not generate resume",
  message: "Something went wrong while generating your resume. Please try again in a moment.",
  variant: "error",
});
```

Server routes (e.g. `/api/generate-resume`) may log full provider details in the **IDE/server terminal** only. Responses to the browser must use fixed safe strings plus an opaque `code` for support correlation.

## Closing

- Backdrop click (if `closeOnBackdrop` is true)
- Escape key
- Close (X) button
- Any action with `closeOnClick !== false`
- `closeDialog()` / `dialog.close()`

## Files

| File | Role |
|------|------|
| `src/components/ui/dialogStore.ts` | Imperative state + helpers |
| `src/components/ui/Dialog.tsx` | UI host + re-exports |
| `src/components/ui/DialogProvider.tsx` | React context + `useDialog` |
| `src/components/Providers.tsx` | App-level provider mount |
