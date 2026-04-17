# OpenClaw Phase 4 Control-Plane Foundation

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 4 — OpenClaw Control-Plane Foundation

## Objective
Create the standalone OpenClaw control-plane foundation without violating the authority model.

## Added in this phase
- standalone repo scaffold
- operator intent contract
- operator queue item contract
- review task contract
- YellowJacket client boundary
- intent guardrail helpers that forbid direct execution and Hermes bypass

## Guardrails preserved
- OpenClaw creates intents only
- OpenClaw does not emit execution commands
- OpenClaw does not bypass YellowJacket to Hermes

## Gate
Phase 4 is complete only when:
- the OpenClaw repo scaffold exists
- contracts and client boundary compile
- `bash tests/phase_4_gate.sh` prints `PHASE_4_GATE_PASS`
