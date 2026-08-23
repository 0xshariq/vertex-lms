import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!token || !host) {
  if (process.env.NODE_ENV !== "production") {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN or NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, " +
        "this causes events to be silently missed. This error stops appearing once both variables are configured.",
    );
  }
} else {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: host,
    defaults: "2026-01-30",
    capture_exceptions: true,
    // Vertex uses PostHog for product analytics only. Surveys are out of scope,
    // and loading the extension only invites blockers to fail the request and
    // log "Could not load surveys script".
    disable_surveys: true,
    debug: process.env.NODE_ENV === "development",
  });
}
