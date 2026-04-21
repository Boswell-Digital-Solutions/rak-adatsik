export type RepairProposalActionType =
  | "patch"
  | "config_change"
  | "docs_update"
  | "test_addition"
  | "migration"
  | "operator_review_only";

export type RepairProposalPosture =
  | "draft"
  | "ready_for_review"
  | "blocked";

export interface RepairProposalActionV1 {
  schemaVersion: "repair_proposal_action.v1";
  actionId: string;
  actionType: RepairProposalActionType;
  targetRef: string;
  summary: string;
}

export interface RepairProposalV1 {
  schemaVersion: "repair_proposal.v1";
  proposalId: string;
  runId: string;
  repoId: string;
  repoCommitSha: string;
  verdictRef: string;
  findingPacketRefs: string[];
  evidencePacketRefs: string[];
  posture: RepairProposalPosture;
  summary: string;
  actions: RepairProposalActionV1[];
  producedAt: string;
}
