#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_5_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "src/proving-slice/documentation-drift-digest.ts"
require_file "src/testing/fake-fetch.ts"
require_file "tests/phase_5_proof.ts"
require_file "docs/implementation/openclaw/phase_5_first_proving_slice.md"
require_file "tests/phase_5_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p tsconfig.json --noEmit
bun tests/phase_5_proof.ts | grep -q "PHASE_5_PROOF_PASS"

echo "PHASE_5_GATE_PASS"
