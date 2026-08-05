"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import {
  closeDialog,
  getDialogState,
  subscribeDialog,
  type DialogAction,
  type DialogSize,
  type DialogState,
  type DialogVariant,
} from "./dialogStore";

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-4xl",
};

const variantAccent: Record<
  DialogVariant,
  { icon: ReactNode; bar: string; iconWrap: string }
> = {
  default: {
    icon: null,
    bar: "bg-slate-900",
    iconWrap: "bg-slate-100 text-slate-700",
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    bar: "bg-slate-900",
    iconWrap: "bg-slate-100 text-slate-800",
  },
  success: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    bar: "bg-emerald-600",
    iconWrap: "bg-emerald-50 text-emerald-700",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bar: "bg-amber-500",
    iconWrap: "bg-amber-50 text-amber-700",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    bar: "bg-rose-600",
    iconWrap: "bg-rose-50 text-rose-700",
  },
};

function actionClass(variant: DialogAction["variant"] = "primary"): string {
  switch (variant) {
    case "secondary":
      return "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50";
    case "danger":
      return "bg-rose-600 text-white hover:bg-rose-700 border border-transparent";
    case "ghost":
      return "bg-transparent text-slate-600 hover:bg-slate-100 border border-transparent";
    case "primary":
    default:
      return "bg-slate-900 text-white hover:bg-slate-800 border border-transparent";
  }
}

function DialogPanel({ state }: { state: DialogState }) {
  const titleId = useId();
  const accent = variantAccent[state.variant ?? "default"];

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [state.open]);

  if (!state.open) return null;

  const handleAction = async (action: DialogAction) => {
    if (action.disabled) return;
    try {
      await action.onClick?.();
    } finally {
      if (action.closeOnClick !== false) closeDialog();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={() => {
          if (state.closeOnBackdrop !== false) closeDialog();
        }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={state.title ? titleId : undefined}
        className={`relative w-full ${sizeClasses[state.size ?? "md"]} max-h-[min(90vh,900px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-[fadeInUp_0.25s_ease-out]`}
      >
        <div className={`h-1.5 w-full shrink-0 ${accent.bar}`} />

        {(state.title || state.showClose !== false) && (
          <div className="flex items-start gap-3 px-5 sm:px-6 pt-5 pb-3 shrink-0">
            {accent.icon && (
              <div
                className={`mt-0.5 shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${accent.iconWrap}`}
              >
                {accent.icon}
              </div>
            )}
            <div className="flex-1 min-w-0 pt-1">
              {state.title && (
                <h2
                  id={titleId}
                  className="text-lg sm:text-xl font-bold text-slate-900 font-montserrat leading-snug"
                >
                  {state.title}
                </h2>
              )}
              {state.description && (
                <div className="mt-1.5 text-sm text-slate-600 font-poppins leading-relaxed">
                  {state.description}
                </div>
              )}
            </div>
            {state.showClose !== false && (
              <button
                type="button"
                onClick={() => closeDialog()}
                className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {state.content && (
          <div className="px-5 sm:px-6 pb-4 overflow-y-auto flex-1 min-h-0 font-poppins text-slate-700">
            {state.content}
          </div>
        )}

        {state.actions && state.actions.length > 0 && (
          <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-end gap-2 shrink-0">
            {state.actions.map((action, index) => (
              <button
                key={`${action.label}-${index}`}
                type="button"
                disabled={action.disabled}
                onClick={() => handleAction(action)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold font-montserrat transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${actionClass(action.variant)}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Mount once near the app root. Renders the active shared dialog. */
export default function DialogHost() {
  const [state, setState] = useState<DialogState>(getDialogState);

  useEffect(() => subscribeDialog(setState), []);

  return <DialogPanel state={state} />;
}

export {
  openDialog,
  closeDialog,
  showAlert,
  showConfirm,
} from "./dialogStore";
export type {
  DialogOptions,
  DialogAction,
  DialogVariant,
  DialogSize,
} from "./dialogStore";
