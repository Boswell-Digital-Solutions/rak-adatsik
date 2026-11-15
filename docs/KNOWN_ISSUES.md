# Known Issues

This document tracks active limitations and historical fixes. Blocking impact is stated per item; an old resolved entry is not a substitute for current source verification. Ids use the prefix `KI-RAK-`.

## KI-RAK-20261115-001 — every `doc/system` chapter is a stub from 2026-06-22, and the first block of most chapters renders as a code block

**Status:** OPEN. Recorded 2026-11-15. Source: BDS-ORG-ARCH-AUDIT-2026-11. Verified by a read of `doc/system/` on `master` `b21fb4a9ea`. Nothing ran.

**What is wrong.**
- The seven chapters are 246 to 473 bytes each. The total is 3,987 bytes for the chapters and the index. Each chapter has a single paragraph, from the "canonical compliance migration" of 2026-06-22. The last commit in the repository is dated 2026-11-14, so the text is nearly five months older than the code.
- The heading, the version line and the first paragraph of chapters 01, 02, 03, 04, 06 and 90 are indented by 12 spaces. Most of `_index.md` is indented by 8 spaces. A Markdown reader renders the indented block as code. The heading is not a heading.
- The index labels are generator stubs, for example "01 Overview" and "04 Dependencies". Part 5 is labelled only "Governance".
- The overview says "Phase 4 control-plane foundation and Phase 5 first proving slice". It gives no date and does not say what the Phase 5 slice is. It does not say whether the YellowJacket client is real. It names Hermes once without a role.

**Evidence.**
- Observed (doc tree): `rak-adatsik@b21fb4a9ea:doc/system/01-overview.md:L1-L7`, `02-contract-surface.md:L1-L7`, `03-runtime-boundary.md:L1-L7`, `04-dependencies.md:L1-L7`, `06-verification.md:L1-L12`, `90-appendices.md:L1-L7`. Chapter 05 has no indent.
- Observed (doc tree): `rak-adatsik@b21fb4a9ea:doc/system/_index.md:L1-L40`, and the part table at `:L26-L34`.
- Observed (source): `rak-adatsik@b21fb4a9ea:src/` holds `contracts/` (11 files), `policies/`, `proving-slice/`, `services/yellowjacket-client.ts` (97 lines) and `testing/`. The documents do not describe the policies.

**Root cause.** Not determined. The migration generated the stubs, and no one has written the chapters since.

**Fix.** None applied. Recommendation: remove the indent, write the chapters from the source, and run `bash doc/system/BUILD.sh`.

**Scope.** Open.

## KI-RAK-20261115-002 — the documents name the contracts and give no semantics

**Status:** OPEN. Recorded 2026-11-15. Source: BDS-ORG-ARCH-AUDIT-2026-11. Verified by a read of `doc/system/` and `src/contracts/` on `master` `b21fb4a9ea`. Nothing ran.

**What is wrong.** Chapter 02 lists the contract names: approval decisions, closeout records, evidence packets, execution results, finding packets, intents, operator queues, reconciliation verdicts, repair proposals, review tasks and specialist-lane results. It gives no states, no transitions, no producer, no consumer and no schema location. The lifecycle that the names suggest (intent, queue, review task, approval decision, execution result, verdict, closeout) is not written anywhere. Chapter 03 says Phase 4 scope is "operator intents only", yet chapter 02 lists execution results and repair proposals. The registry map role is `control-authority`. The documents claim only proposal and queue shaping, with no direct execution. The boundary against ForgeCommand, which owns run records and lifecycle transitions, is not defined.

**Evidence.**
- Observed (doc tree): `rak-adatsik@b21fb4a9ea:doc/system/02-contract-surface.md:L5-L7`, `03-runtime-boundary.md:L5-L7`, `05-governance.md:L5`.
- Observed (source): `rak-adatsik@b21fb4a9ea:src/contracts/approval-decision.ts:L1-L20` — for example, `ApprovalDecisionV1` has the outcomes `approved`, `rejected`, `needs_revision` and `deferred`, and the modes `operator` and `policy_gate`. None of this is in the documents.
- Documented: the workspace `CLAUDE.md` authority table gives lifecycle transitions and run records to ForgeCommand.

**Root cause.** Not determined.

**Fix.** None applied. Recommendation: for each contract, document the schema version, the states, the producer and the consumer. State the boundary against ForgeCommand and the YellowJacket client.

**Scope.** Open.
