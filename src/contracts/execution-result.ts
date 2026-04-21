export type ExecutionResultOutcome =
  | "applied"
  | "skipped"
  | "failed"
  | "partial";

export interface ExecutionResultV1 {
  schemaVersion: "execution_result.v1";
  executionId: string;
  proposalId: string;
  decisionId: string;
  repoId: string;
  repoCommitShaBefore: string;
  repoCommitShaAfter?: string;
  outcome: ExecutionResultOutcome;
  summary: string;
  artifactRefs: string[];
  producedAt: string;
}
