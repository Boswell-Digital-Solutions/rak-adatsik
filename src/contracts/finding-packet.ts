import type { SpecialistLaneType } from "./specialist-lane-result";

export type FindingSourceKind =
  | "repo_crawler"
  | "worm"
  | "specialist_lane";

export type FindingSeverity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type FindingPacketPosture =
  | "candidate"
  | "supported"
  | "inconclusive"
  | "contradicted"
  | "degraded";

export interface FindingPacketV1 {
  schemaVersion: "finding_packet.v1";
  packetId: string;
  runId: string;
  repoId: string;
  repoCommitSha: string;
  sourceKind: FindingSourceKind;
  laneType?: SpecialistLaneType;
  posture: FindingPacketPosture;
  severity: FindingSeverity;
  summary: string;
  affectedPaths: string[];
  evidencePacketRefs: string[];
  producedAt: string;
}
