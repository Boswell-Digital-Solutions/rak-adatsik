export type ReviewTaskDisposition = "review_ready" | "approval_required" | "closed";

export interface ReviewTaskV1 {
  schemaVersion: "review_task.v1";
  reviewTaskId: string;
  queueItemId: string;
  reviewPacketRef: string;
  disposition: ReviewTaskDisposition;
  title: string;
  summary: string;
  createdAt: string;
}
