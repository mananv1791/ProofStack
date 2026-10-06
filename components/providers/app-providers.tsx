"use client";

import { useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    const state = posthog as unknown as { __loaded?: boolean };

    if (!key || state.__loaded) {
      return;
    }

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      capture_pageview: "history_change",
      person_profiles: "identified_only",
    });
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return children;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
