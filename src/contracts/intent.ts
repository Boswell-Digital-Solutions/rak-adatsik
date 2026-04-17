export type OpenClawIntentAction =
  | "documentation_drift_digest_run"
  | "documentation_drift_digest_replay"
  | "review_packet_acknowledge"
  | "review_packet_approve"
  | "review_packet_reject";

export interface OpenClawIntentV1 {
  schemaVersion: "openclaw_intent.v1";
  intentId: string;
  action: OpenClawIntentAction;
  targetRef: string;
  requestedBy: string;
  requestedAt: string;
  source: "operator";
  dispatchMode: "intent_only";
  directExecutionForbidden: true;
  hermesBypassForbidden: true;
  parameters: Record<string, unknown>;
}
