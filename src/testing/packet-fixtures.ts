import type { ApprovalDecisionV1 } from "../contracts/approval-decision";
import type { CloseoutRecordV1 } from "../contracts/closeout-record";
import type { EvidencePacketV1 } from "../contracts/evidence-packet";
import type { ExecutionResultV1 } from "../contracts/execution-result";
import type { FindingPacketV1 } from "../contracts/finding-packet";
import type { ReconciliationVerdictV1 } from "../contracts/reconciliation-verdict";
import type { RepairProposalV1 } from "../contracts/repair-proposal";
import type { SpecialistLaneResultV1 } from "../contracts/specialist-lane-result";

const DEFAULT_REPO_ID = "forge-command";
const DEFAULT_REPO_SHA = "1111111111111111111111111111111111111111";
const DEFAULT_RUN_ID = "run_centipede_fixture_001";
const DEFAULT_TIMESTAMP = "2026-04-21T07:30:00Z";

export interface PacketFixtureSetV1 {
  specialistLaneResult: SpecialistLaneResultV1;
  evidencePacket: EvidencePacketV1;
  findingPacket: FindingPacketV1;
  reconciliationVerdict: ReconciliationVerdictV1;
  repairProposal: RepairProposalV1;
  approvalDecision: ApprovalDecisionV1;
  executionResult: ExecutionResultV1;
  closeoutRecord: CloseoutRecordV1;
}

export function createSpecialistLaneResultFixture(
  overrides: Partial<SpecialistLaneResultV1> = {},
): SpecialistLaneResultV1 {
  return {
    schemaVersion: "specialist_lane_result.v1",
    packetId: "lane_packet_001",
    runId: DEFAULT_RUN_ID,
    repoId: DEFAULT_REPO_ID,
    repoCommitSha: DEFAULT_REPO_SHA,
    laneId: "contract_drift_lane",
    laneType: "contract_drift",
    posture: "supported",
    confidence: 0.92,
    summary: "Detected contract drift between producer and consumer payload fields.",
    evidenceRefs: ["evidence_ref_001"],
    contradictions: [],
    notes: ["fixture"],
    producedAt: DEFAULT_TIMESTAMP,
    weighting: {
      schemaVersion: "specialist_lane_weighting_metadata.v1",
      weightingProfile: "mechanical_first",
      normalizedWeight: 0.85,
      evidenceCoverage: 0.9,
      contradictionPenalty: 0,
    },
    ...overrides,
  };
}

export function createEvidencePacketFixture(
  overrides: Partial<EvidencePacketV1> = {},
): EvidencePacketV1 {
  return {
    schemaVersion: "evidence_packet.v1",
    packetId: "evidence_packet_001",
    runId: DEFAULT_RUN_ID,
    repoId: DEFAULT_REPO_ID,
    repoCommitSha: DEFAULT_REPO_SHA,
    producerKind: "specialist_lane",
    evidenceRefs: [
      {
        schemaVersion: "evidence_reference.v1",
        evidenceRefId: "evidence_ref_001",
        path: "src/lib/self-healing/forgehq.ts",
        summary: "Transport/detail model mismatch fixture evidence.",
        startLine: 120,
        endLine: 160,
      },
    ],
    notes: ["fixture"],
    producedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createFindingPacketFixture(
  overrides: Partial<FindingPacketV1> = {},
): FindingPacketV1 {
  return {
    schemaVersion: "finding_packet.v1",
    packetId: "finding_packet_001",
    runId: DEFAULT_RUN_ID,
    repoId: DEFAULT_REPO_ID,
    repoCommitSha: DEFAULT_REPO_SHA,
    sourceKind: "specialist_lane",
    laneType: "contract_drift",
    posture: "supported",
    severity: "high",
    summary: "Contract drift candidate supported by specialist lane evidence.",
    affectedPaths: ["src/lib/self-healing/forgehq.ts"],
    evidencePacketRefs: ["evidence_packet_001"],
    producedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createReconciliationVerdictFixture(
  overrides: Partial<ReconciliationVerdictV1> = {},
): ReconciliationVerdictV1 {
  return {
    schemaVersion: "reconciliation_verdict.v1",
    verdictId: "verdict_001",
    runId: DEFAULT_RUN_ID,
    repoId: DEFAULT_REPO_ID,
    repoCommitSha: DEFAULT_REPO_SHA,
    posture: "proposal_eligible",
    summary: "Reconciled finding is eligible for governed proposal review.",
    contributorRefs: [
      {
        schemaVersion: "reconciliation_contributor_reference.v1",
        contributorId: "contributor_lane_001",
        contributorKind: "specialist_lane_result",
        contributorRef: "lane_packet_001",
        laneType: "contract_drift",
        posture: "supported",
        confidence: 0.92,
        normalizedWeight: 0.85,
      },
    ],
    contradictionRefs: [],
    proposalEligible: true,
    requiresOperatorReview: true,
    evidenceRefs: ["evidence_packet_001"],
    producedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createRepairProposalFixture(
  overrides: Partial<RepairProposalV1> = {},
): RepairProposalV1 {
  return {
    schemaVersion: "repair_proposal.v1",
    proposalId: "proposal_001",
    runId: DEFAULT_RUN_ID,
    repoId: DEFAULT_REPO_ID,
    repoCommitSha: DEFAULT_REPO_SHA,
    verdictRef: "verdict_001",
    findingPacketRefs: ["finding_packet_001"],
    evidencePacketRefs: ["evidence_packet_001"],
    posture: "ready_for_review",
    summary: "Repair proposal for contract drift mismatch.",
    actions: [
      {
        schemaVersion: "repair_proposal_action.v1",
        actionId: "proposal_action_001",
        actionType: "patch",
        targetRef: "src/lib/self-healing/forgehq.ts",
        summary: "Align transport/detail contract handling.",
      },
    ],
    producedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createApprovalDecisionFixture(
  overrides: Partial<ApprovalDecisionV1> = {},
): ApprovalDecisionV1 {
  return {
    schemaVersion: "approval_decision.v1",
    decisionId: "decision_001",
    proposalId: "proposal_001",
    decision: "approved",
    decisionMode: "operator",
    reason: "Evidence and reconciliation posture support bounded repair action.",
    decidedBy: "operator_charlie",
    evidenceRefs: ["evidence_packet_001"],
    decidedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createExecutionResultFixture(
  overrides: Partial<ExecutionResultV1> = {},
): ExecutionResultV1 {
  return {
    schemaVersion: "execution_result.v1",
    executionId: "execution_001",
    proposalId: "proposal_001",
    decisionId: "decision_001",
    repoId: DEFAULT_REPO_ID,
    repoCommitShaBefore: DEFAULT_REPO_SHA,
    repoCommitShaAfter: "2222222222222222222222222222222222222222",
    outcome: "applied",
    summary: "Bounded repair action applied successfully.",
    artifactRefs: ["artifact_patch_001"],
    producedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createCloseoutRecordFixture(
  overrides: Partial<CloseoutRecordV1> = {},
): CloseoutRecordV1 {
  return {
    schemaVersion: "closeout_record.v1",
    closeoutId: "closeout_001",
    proposalId: "proposal_001",
    executionResultRef: "execution_001",
    verificationEvidenceRefs: ["evidence_packet_001"],
    posture: "verified_closed",
    summary: "Verification evidence supports closeout.",
    closedAt: DEFAULT_TIMESTAMP,
    ...overrides,
  };
}

export function createPacketFixtureSet(): PacketFixtureSetV1 {
  const evidencePacket = createEvidencePacketFixture();
  const specialistLaneResult = createSpecialistLaneResultFixture({
    evidenceRefs: evidencePacket.evidenceRefs.map((item) => item.evidenceRefId),
  });
  const findingPacket = createFindingPacketFixture({
    evidencePacketRefs: [evidencePacket.packetId],
  });
  const reconciliationVerdict = createReconciliationVerdictFixture({
    evidenceRefs: [evidencePacket.packetId],
    contributorRefs: [
      {
        schemaVersion: "reconciliation_contributor_reference.v1",
        contributorId: "contributor_lane_001",
        contributorKind: "specialist_lane_result",
        contributorRef: specialistLaneResult.packetId,
        laneType: specialistLaneResult.laneType,
        posture: specialistLaneResult.posture,
        confidence: specialistLaneResult.confidence,
        normalizedWeight: specialistLaneResult.weighting.normalizedWeight,
      },
    ],
  });
  const repairProposal = createRepairProposalFixture({
    verdictRef: reconciliationVerdict.verdictId,
    findingPacketRefs: [findingPacket.packetId],
    evidencePacketRefs: [evidencePacket.packetId],
  });
  const approvalDecision = createApprovalDecisionFixture({
    proposalId: repairProposal.proposalId,
    evidenceRefs: [evidencePacket.packetId],
  });
  const executionResult = createExecutionResultFixture({
    proposalId: repairProposal.proposalId,
    decisionId: approvalDecision.decisionId,
  });
  const closeoutRecord = createCloseoutRecordFixture({
    proposalId: repairProposal.proposalId,
    executionResultRef: executionResult.executionId,
    verificationEvidenceRefs: [evidencePacket.packetId],
  });

  return {
    specialistLaneResult,
    evidencePacket,
    findingPacket,
    reconciliationVerdict,
    repairProposal,
    approvalDecision,
    executionResult,
    closeoutRecord,
  };
}
