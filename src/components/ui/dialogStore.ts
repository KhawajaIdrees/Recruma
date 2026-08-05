"use client";

import type { ReactNode } from "react";

export type DialogVariant = "default" | "info" | "success" | "warning" | "error";
export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogAction {
  label: string;
  onClick?: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  closeOnClick?: boolean;
  disabled?: boolean;
}

export interface DialogOptions {
  title?: ReactNode;
  description?: ReactNode;
  /** Fully custom body — fields, lists, forms, warnings, etc. */
  content?: ReactNode;
  actions?: DialogAction[];
  variant?: DialogVariant;
  size?: DialogSize;
  /** Show close (X) button. Default true. */
  showClose?: boolean;
  /** Close when backdrop is clicked. Default true. */
  closeOnBackdrop?: boolean;
  /** Called whenever the dialog closes for any reason. */
  onClose?: () => void;
}

export interface DialogState extends DialogOptions {
  open: boolean;
}

type Listener = (state: DialogState) => void;

const CLOSED: DialogState = {
  open: false,
  title: undefined,
  description: undefined,
  content: undefined,
  actions: undefined,
  variant: "default",
  size: "md",
  showClose: true,
  closeOnBackdrop: true,
  onClose: undefined,
};

let state: DialogState = { ...CLOSED };
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(state));
}

export function getDialogState(): DialogState {
  return state;
}

export function subscribeDialog(listener: Listener): () => void {
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}

/** Open the shared dialog with any combination of title, content, and actions. */
export function openDialog(options: DialogOptions): void {
  state = {
    ...CLOSED,
    ...options,
    open: true,
    showClose: options.showClose ?? true,
    closeOnBackdrop: options.closeOnBackdrop ?? true,
    variant: options.variant ?? "default",
    size: options.size ?? "md",
  };
  emit();
}

export function closeDialog(): void {
  const onClose = state.onClose;
  state = { ...CLOSED };
  emit();
  onClose?.();
}

/** Convenience: simple message dialog with an OK button. */
export function showAlert(options: {
  title?: string;
  message: ReactNode;
  variant?: DialogVariant;
  okLabel?: string;
}): void {
  openDialog({
    title: options.title ?? "Notice",
    description: options.message,
    variant: options.variant ?? "info",
    actions: [{ label: options.okLabel ?? "OK", variant: "primary" }],
  });
}

/** Convenience: confirm dialog. Resolves true if confirmed, false if cancelled. */
export function showConfirm(options: {
  title?: string;
  message: ReactNode;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value: boolean) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    openDialog({
      title: options.title ?? "Confirm",
      description: options.message,
      variant: options.variant ?? (options.danger ? "warning" : "default"),
      closeOnBackdrop: true,
      onClose: () => finish(false),
      actions: [
        {
          label: options.cancelLabel ?? "Cancel",
          variant: "secondary",
          onClick: () => finish(false),
        },
        {
          label: options.confirmLabel ?? "Confirm",
          variant: options.danger ? "danger" : "primary",
          onClick: () => {
            settled = true;
            resolve(true);
          },
        },
      ],
    });
  });
}
