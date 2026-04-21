import { createPacketFixtureSet } from "./packet-fixtures";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const fixtureSet = createPacketFixtureSet();

assert(
  fixtureSet.repairProposal.verdictRef === fixtureSet.reconciliationVerdict.verdictId,
  "repair proposal verdictRef does not match reconciliation verdict id",
);

assert(
  fixtureSet.approvalDecision.proposalId === fixtureSet.repairProposal.proposalId,
  "approval decision proposalId does not match repair proposal id",
);

assert(
  fixtureSet.executionResult.proposalId === fixtureSet.repairProposal.proposalId,
  "execution result proposalId does not match repair proposal id",
);

assert(
  fixtureSet.executionResult.decisionId === fixtureSet.approvalDecision.decisionId,
  "execution result decisionId does not match approval decision id",
);

assert(
  fixtureSet.closeoutRecord.proposalId === fixtureSet.repairProposal.proposalId,
  "closeout record proposalId does not match repair proposal id",
);

assert(
  fixtureSet.closeoutRecord.executionResultRef === fixtureSet.executionResult.executionId,
  "closeout record executionResultRef does not match execution result id",
);

console.log("packet fixture smoke passed");
console.log(
  JSON.stringify(
    {
      repoId: fixtureSet.repairProposal.repoId,
      proposalId: fixtureSet.repairProposal.proposalId,
      decisionId: fixtureSet.approvalDecision.decisionId,
      executionId: fixtureSet.executionResult.executionId,
      closeoutId: fixtureSet.closeoutRecord.closeoutId,
    },
    null,
    2,
  ),
);
