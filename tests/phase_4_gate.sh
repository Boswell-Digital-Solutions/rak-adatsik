#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_4_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "package.json"
require_file "tsconfig.json"
require_file "src/contracts/intent.ts"
require_file "src/contracts/operator-queue.ts"
require_file "src/contracts/review-task.ts"
require_file "src/policies/intent-guards.ts"
require_file "src/services/yellowjacket-client.ts"
require_file "src/index.ts"
require_file "docs/implementation/rak-adatsik/phase_4_control_plane_foundation.md"
require_file "tests/phase_4_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p tsconfig.json --noEmit

echo "PHASE_4_GATE_PASS"
