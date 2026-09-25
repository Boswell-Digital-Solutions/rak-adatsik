        # Rak-Adatsik - Compiled System Reference

        **Designation:** RAK
        **Document role:** Canonical compiled technical reference for the Rak-Adatsik operator control-plane repo
        **Source:** `doc/system/`
        **Build command:** `bash doc/system/BUILD.sh`
        **Document version:** 2.0 (2026-06-22) - canonical compliance migration
        **Protocol:** BDS Documentation Protocol v2.0; BDS Repo Documentation System Canonical Compliance Standard

        > **Generated artifact warning:** `doc/RAKSYSTEM.md` is assembled output. Edit
        > the source modules under `doc/system/` and rebuild. Hand edits to the
        > compiled artifact are overwritten by the next build.

        Assembly contract:

        - Command: `bash doc/system/BUILD.sh`
        - Validation: `bash doc/system/validate_snapshots.sh` runs during assembly
        - Primary output: `doc/RAKSYSTEM.md`

        This `doc/system/` tree is the canonical source of truth for Rak-Adatsik. It uses
        explicit **truth classes**: canonical facts define repo role, authority
        boundaries, contract behavior, runtime behavior, and verification doctrine;
        snapshot facts are dated, audit-derived counts and current implementation
        inventory that may drift between audits.

        | Part | File | Contents |
        | --- | --- | --- |
        | §1 | `01-overview.md` | 01 Overview |
| §2 | `02-contract-surface.md` | 02 Contract Surface |
| §3 | `03-runtime-boundary.md` | 03 Runtime Boundary |
| §4 | `04-dependencies.md` | 04 Dependencies |
| §5 | `05-governance.md` | Governance |
| §6 | `06-verification.md` | 06 Verification |
| §7 | `90-appendices.md` | 90 Appendices |

        ## Quick Assembly

        ```bash
        bash doc/system/BUILD.sh
        ```

---

            # Overview

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Rak-Adatsik is an internal operator/control-plane repo for the rak-adatsik concept.

The current phase is Phase 4 control-plane foundation and Phase 5 first proving slice.

---

            # Contract Surface

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Contract source files live under `src/contracts/` and cover approval decisions, closeout records, evidence packets, execution results, finding packets, intents, operator queues, reconciliation verdicts, repair proposals, review tasks, and specialist-lane results.

YellowJacket access is mediated through `src/services/yellowjacket-client.ts`.

---

            # Runtime Boundary

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Phase 4 scope is operator intents only, queue and review-task contracts, and the YellowJacket client boundary.

The repo has no direct execution commands and no direct Hermes bypass.

---

            # Dependencies

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Rak-Adatsik is a TypeScript package. Dependency truth is owned by `package.json`, `bun.lock`, and `tsconfig.json`.

Test and proof helpers live under `tests/` and `src/testing/`.

---

# Governance

**Document version:** 2.0 (2026-06-22) - canonical compliance migration

Operator intent remains the authority boundary. Rak-Adatsik may shape review queues and proposals, but it must not bypass governed review or execute directly.

---

            # Verification

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Verification surfaces include:

```bash
tests/phase_4_gate.sh
tests/phase_5_gate.sh
```

Run the relevant phase gate before promoting contract or control-plane changes.

---

            # Appendices

            **Document version:** 2.0 (2026-06-22) - canonical compliance migration

            Implementation notes live under `docs/implementation/rak-adatsik/`.

`todo.md` remains an operator working note, not a canonical system source.
