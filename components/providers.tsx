"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { PostHogProvider } from "@/components/providers/posthog-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PostHogProvider>{children}</PostHogProvider>
    </ThemeProvider>
  );
}
