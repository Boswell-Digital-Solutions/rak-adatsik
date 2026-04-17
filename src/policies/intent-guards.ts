import type { OpenClawIntentV1 } from "../contracts/intent";

export function assertIntentOnlyDispatch(intent: OpenClawIntentV1): void {
  if (intent.dispatchMode !== "intent_only") {
    throw new Error("OpenClaw may create intents only");
  }

  if (!intent.directExecutionForbidden) {
    throw new Error("OpenClaw may not issue direct execution commands");
  }

  if (!intent.hermesBypassForbidden) {
    throw new Error("OpenClaw may not bypass YellowJacket to Hermes");
  }
}

export function buildIntent(
  partial: Omit<
    OpenClawIntentV1,
    "schemaVersion" | "dispatchMode" | "directExecutionForbidden" | "hermesBypassForbidden"
  >,
): OpenClawIntentV1 {
  return {
    schemaVersion: "openclaw_intent.v1",
    dispatchMode: "intent_only",
    directExecutionForbidden: true,
    hermesBypassForbidden: true,
    ...partial,
  };
}
