export type OperatorQueueState =
  | "requested"
  | "admitted"
  | "planned"
  | "executing"
  | "verifying"
  | "review_ready"
  | "approval_required"
  | "closed"
  | "degraded"
  | "blocked"
  | "replay_pending"
  | "replay_running"
  | "replay_closed";

export interface OperatorQueueItemV1 {
  schemaVersion: "operator_queue_item.v1";
  queueItemId: string;
  intentId: string;
  targetRef: string;
  state: OperatorQueueState;
  statusSummary: string;
  lastUpdatedAt: string;
}
