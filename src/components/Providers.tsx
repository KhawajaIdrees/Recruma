"use client";

import type { ReactNode } from "react";
import { DialogProvider } from "@/components/ui/DialogProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <DialogProvider>{children}</DialogProvider>;
}
