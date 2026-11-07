# Phase 1 verification — 2026-11-07

This is an evidence index, not a release acceptance statement. The detailed log and pending work are in [PROGRESS.md](../PROGRESS.md).

| Area | Evidence | Result / limit |
| --- | --- | --- |
| Source/guide audit | Python ZIP and DOCX XML inspection; reviewed Servlets/DAO/entities/REST/JSP/SQL, first-bimester requirements and rubric | Migration matrix written; original Java runtime not exercised |
| Node | node --version / npm --version | v24.22.1 / 11.9.0 |
| Locked installation | npm ci --ignore-scripts | Passed; lifecycle/Prisma setup explicitly not verified |
| HTTP/configuration | npm test | 14 passed, 1 file; foundation only |
| CSS | npm run build:css | Passed; local Tailwind4.3.5 |
| MySQL configuration | docker compose config --quiet; up --wait for mysql and mysql-test | Passed; independent development volume and test tmpfs |
| Database connection | SELECT VERSION(), DATABASE() as each application user | MySQL8.4.13, food_waste_fighter and food_waste_fighter_test |
| Prisma | npm run build → db:generate | Failed: binaries.prisma.sh HTTP403. No migration/seed/Prisma integration result |
| Browser | Session-local Playwright/Chromium HTTP harness, desktop1280x900 and mobile390x844 | EJS/CSS visible, no overflow/page errors, readiness link works; DB intentionally unavailable |
| Environment | Random secret format/uniqueness, permission/preservation checks, git check-ignore | Passed; no secret values logged |
| Test guard | Invoke test-db runner with development and non-test URLs | Rejected before migration |
| Devcontainer | JSON checks and official5.2.5-24-bookworm image index | Image manifest exists for amd64/arm64; full fetch blocked at Microsoft blob redirect; actual build not verified |
| Dependency advisory check | npm audit --omit=dev --audit-level=high | No production dependency vulnerabilities reported; not a security certification |
| Whitespace | git diff --check | Passed |

The user's instruction is to leave the download restriction for later repair. Prisma-dependent tasks stay BLOCKED and Phase 2 has not started. Resume normal setup after access is repaired; do not disable TLS/checksum verification. Actual Codespaces HTTPS cookies/forms/Socket.IO/two-user verification remains pending until those features exist.
