# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rak-Adatsik is an internal operator/control-plane repo for the rak-adatsik concept within Boswell Digital Solutions' Forge ecosystem. The current phase is Phase 4 control-plane foundation and Phase 5 first proving slice: it handles operator intents, queue and review-task contracts, and the YellowJacket client boundary only. It has no direct execution commands and no direct Hermes bypass.

## Common Commands

- Typecheck: `bunx tsc -p tsconfig.json --noEmit` (also `bun run typecheck`)
- Fixture smoke test: `bun src/testing/packet-fixtures.smoke.ts` (also `bun run fixtures:smoke`)
- Phase gates (run before promoting contract or control-plane changes): `bash tests/phase_4_gate.sh` and `bash tests/phase_5_gate.sh`
- Rebuild the compiled system reference: `bash doc/system/BUILD.sh` (runs `doc/system/validate_snapshots.sh` during assembly)

## Architecture

- `src/contracts/` — contract types for approval decisions, closeout records, evidence packets, execution results, finding packets, intents, operator queues, reconciliation verdicts, repair proposals, review tasks, and specialist-lane results.
- `src/policies/intent-guards.ts` — guards on operator intents.
- `src/services/yellowjacket-client.ts` — mediates all YellowJacket access; this is the repo's external boundary.
- `src/proving-slice/` — Phase 5 proving-slice work (e.g. `documentation-drift-digest.ts`).
- `src/testing/` — fixture and proof helpers.
- `tests/` — phase gate scripts (`phase_4_gate.sh`, `phase_5_gate.sh`) and proof scripts.
- `doc/system/` — canonical source-of-truth doc modules (truth-classed: canonical facts vs. dated snapshot facts); `doc/RAKSYSTEM.md` is the generated compiled reference — never hand-edit it, edit `doc/system/` and rebuild.
- `docs/implementation/rak-adatsik/` — implementation notes.

Operator intent is the authority boundary: this repo may shape review queues and proposals, but must not bypass governed review or execute directly.

## Notes

- `doc/RAKSYSTEM.md` is a generated artifact assembled from `doc/system/`. Hand edits to it are overwritten by the next build — edit the source modules instead.
- `todo.md` is an operator working note, not a canonical system source.
