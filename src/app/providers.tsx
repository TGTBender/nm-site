"use client";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * The original App.tsx also mounted a react-query QueryClientProvider,
 * but nothing in the site ever issued a query or mutation — the quote
 * form posts with plain fetch. It has been dropped rather than carried
 * over as an unused dependency.
 *
 * Routing providers are gone too: wouter's <Switch>/<Route> is replaced
 * by App Router file conventions (page.tsx / not-found.tsx).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}
