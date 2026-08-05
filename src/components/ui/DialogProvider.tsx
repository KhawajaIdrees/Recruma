"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import DialogHost, {
  closeDialog,
  openDialog,
  showAlert,
  showConfirm,
  type DialogOptions,
} from "./Dialog";

interface DialogApi {
  open: (options: DialogOptions) => void;
  close: () => void;
  alert: typeof showAlert;
  confirm: typeof showConfirm;
}

const DialogContext = createContext<DialogApi | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const api = useMemo<DialogApi>(
    () => ({
      open: openDialog,
      close: closeDialog,
      alert: showAlert,
      confirm: showConfirm,
    }),
    []
  );

  return (
    <DialogContext.Provider value={api}>
      {children}
      <DialogHost />
    </DialogContext.Provider>
  );
}

/** Access the shared dialog from any client component under DialogProvider. */
export function useDialog(): DialogApi {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    // Fall back to imperative API so callers outside the tree still work
    return {
      open: openDialog,
      close: closeDialog,
      alert: showAlert,
      confirm: showConfirm,
    };
  }
  return ctx;
}
