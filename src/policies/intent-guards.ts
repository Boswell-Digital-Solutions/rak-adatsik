import type { RakAdatsikIntentV1 } from "../contracts/intent";

export function assertIntentOnlyDispatch(intent: RakAdatsikIntentV1): void {
  if (intent.dispatchMode !== "intent_only") {
    throw new Error("Rak-Adatsik may create intents only");
  }

  if (!intent.directExecutionForbidden) {
    throw new Error("Rak-Adatsik may not issue direct execution commands");
  }

  if (!intent.hermesBypassForbidden) {
    throw new Error("Rak-Adatsik may not bypass YellowJacket to Hermes");
  }
}

export function buildIntent(
  partial: Omit<
    RakAdatsikIntentV1,
    "schemaVersion" | "dispatchMode" | "directExecutionForbidden" | "hermesBypassForbidden"
  >,
): RakAdatsikIntentV1 {
  return {
    schemaVersion: "openclaw_intent.v1",
    dispatchMode: "intent_only",
    directExecutionForbidden: true,
    hermesBypassForbidden: true,
    ...partial,
  };
}
