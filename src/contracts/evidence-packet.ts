export type EvidenceProducerKind =
  | "repo_crawler"
  | "worm"
  | "specialist_lane"
  | "centipede_reconciliation"
  | "operator_annotation";

export interface EvidenceReferenceV1 {
  schemaVersion: "evidence_reference.v1";
  evidenceRefId: string;
  path: string;
  summary: string;
  startLine?: number;
  endLine?: number;
  sha256?: string;
}

export interface EvidencePacketV1 {
  schemaVersion: "evidence_packet.v1";
  packetId: string;
  runId: string;
  repoId: string;
  repoCommitSha: string;
  producerKind: EvidenceProducerKind;
  evidenceRefs: EvidenceReferenceV1[];
  notes: string[];
  producedAt: string;
}
