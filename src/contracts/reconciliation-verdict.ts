import type {
  SpecialistLaneResultPosture,
  SpecialistLaneType,
} from "./specialist-lane-result";

export type ReconciliationContributorKind =
  | "mechanical_finding"
  | "worm_finding"
  | "specialist_lane_result";

export type ReconciliationVerdictPosture =
  | "reconciled_supported"
  | "reconciled_inconclusive"
  | "reconciled_contradicted"
  | "requires_operator_review"
  | "not_proposal_eligible"
  | "proposal_eligible";

export interface ReconciliationContributorReferenceV1 {
  schemaVersion: "reconciliation_contributor_reference.v1";
  contributorId: string;
  contributorKind: ReconciliationContributorKind;
  contributorRef: string;
  laneType?: SpecialistLaneType;
  posture?: SpecialistLaneResultPosture;
  confidence: number;
  normalizedWeight: number;
}

export interface ReconciliationVerdictV1 {
  schemaVersion: "reconciliation_verdict.v1";
  verdictId: string;
  runId: string;
  repoId: string;
  repoCommitSha: string;
  posture: ReconciliationVerdictPosture;
  summary: string;
  contributorRefs: ReconciliationContributorReferenceV1[];
  contradictionRefs: string[];
  proposalEligible: boolean;
  requiresOperatorReview: boolean;
  evidenceRefs: string[];
  producedAt: string;
}
