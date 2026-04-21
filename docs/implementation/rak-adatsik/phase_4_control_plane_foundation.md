# Rak-Adatsik Phase 4 Control-Plane Foundation

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 4 — Rak-Adatsik Control-Plane Foundation

## Objective
Create the standalone Rak-Adatsik control-plane foundation without violating the authority model.

## Added in this phase
- standalone repo scaffold
- operator intent contract
- operator queue item contract
- review task contract
- YellowJacket client boundary
- intent guardrail helpers that forbid direct execution and Hermes bypass

## Guardrails preserved
- Rak-Adatsik creates intents only
- Rak-Adatsik does not emit execution commands
- Rak-Adatsik does not bypass YellowJacket to Hermes

## Gate
Phase 4 is complete only when:
- the Rak-Adatsik repo scaffold exists
- contracts and client boundary compile
- `bash tests/phase_4_gate.sh` prints `PHASE_4_GATE_PASS`
