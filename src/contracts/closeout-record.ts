export type CloseoutRecordPosture =
  | "verified_closed"
  | "verification_failed"
  | "reopened"
  | "operator_acknowledged";

export interface CloseoutRecordV1 {
  schemaVersion: "closeout_record.v1";
  closeoutId: string;
  proposalId: string;
  executionResultRef: string;
  verificationEvidenceRefs: string[];
  posture: CloseoutRecordPosture;
  summary: string;
  closedAt: string;
}
