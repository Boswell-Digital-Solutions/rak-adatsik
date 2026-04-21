export type SpecialistLaneType =
  | "contract_drift"
  | "docs_code_mismatch"
  | "api_boundary"
  | "migration_schema_risk"
  | "auth_permission_boundary"
  | "dead_path_stale_code"
  | "test_gap"
  | "ui_route_state_consistency";

export type SpecialistLaneResultPosture =
  | "supported"
  | "unsupported"
  | "inconclusive"
  | "contradicted"
  | "insufficient_evidence"
  | "degraded";

export type SpecialistLaneWeightingProfile =
  | "balanced"
  | "mechanical_first"
  | "operator_guarded";

export interface SpecialistLaneContradictionRecordV1 {
  schemaVersion: "specialist_lane_contradiction_record.v1";
  contradictionId: string;
  conflictingRef: string;
  summary: string;
}

export interface SpecialistLaneWeightingMetadataV1 {
  schemaVersion: "specialist_lane_weighting_metadata.v1";
  weightingProfile: SpecialistLaneWeightingProfile;
  normalizedWeight: number;
  evidenceCoverage: number;
  contradictionPenalty: number;
}

export interface SpecialistLaneResultV1 {
  schemaVersion: "specialist_lane_result.v1";
  packetId: string;
  runId: string;
  repoId: string;
  repoCommitSha: string;
  laneId: string;
  laneType: SpecialistLaneType;
  posture: SpecialistLaneResultPosture;
  confidence: number;
  summary: string;
  evidenceRefs: string[];
  contradictions: SpecialistLaneContradictionRecordV1[];
  notes: string[];
  producedAt: string;
  weighting: SpecialistLaneWeightingMetadataV1;
}
