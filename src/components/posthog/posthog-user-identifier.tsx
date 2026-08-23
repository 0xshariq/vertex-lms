"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import posthog from "posthog-js";

/**
 * Identifies the signed-in Clerk user with PostHog so all analytics events
 * are attributed to the correct person. Place this inside ClerkProvider.
 *
 * posthog.reset() is only called on the logout transition (previously identified
 * → now anonymous) to preserve the anonymous distinct ID on plain page loads.
 */
export function PostHogUserIdentifier() {
  const { user, isLoaded } = useUser();
  const previousUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded) return;

    const currentUserId = user?.id ?? null;

    if (currentUserId) {
      posthog.identify(currentUserId, {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
      });
    } else if (previousUserId.current !== undefined && previousUserId.current !== null) {
      // Transition from identified → anonymous (logout). Reset to a fresh anonymous ID.
      posthog.reset();
    }

    previousUserId.current = currentUserId;
  }, [isLoaded, user]);

  return null;
}
