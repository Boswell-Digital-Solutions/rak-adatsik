export type ApprovalDecisionOutcome =
  | "approved"
  | "rejected"
  | "needs_revision"
  | "deferred";

export type ApprovalDecisionMode =
  | "operator"
  | "policy_gate";

export interface ApprovalDecisionV1 {
  schemaVersion: "approval_decision.v1";
  decisionId: string;
  proposalId: string;
  decision: ApprovalDecisionOutcome;
  decisionMode: ApprovalDecisionMode;
  reason: string;
  decidedBy: string;
  evidenceRefs: string[];
  decidedAt: string;
}
