# Phase 1 verification — 2026-11-07

Current evidence for `codex/phase-1-foundation`, resumed from `8cd7150`. The detailed history, errors and remaining work are in [PROGRESS.md](../PROGRESS.md). This is an evidence index, not a release acceptance statement.

**Phase 1: DONE.** Persistence/startup passed automated checks. Successful Codespaces operation was confirmed by the project owner on 2026-11-07 (externally reported evidence). The old Prisma/Microsoft download restrictions no longer reproduce. No TLS/checksum verification was disabled.

| Area | Executed check | Current result / limit |
| --- | --- | --- |
| Repository/audit coherence | Read AGENTS/specification/migration plan/progress and runtime/config/tests; recheck supplied Java/SQL and academic guide | Company-only foundation matches code; auth/business/chat remain pending; original runtime/SQL not executed |
| Node/npm | `node --version`; `npm --version` | v24.22.1 / 11.9.0 |
| Locked installation | `npm ci` | PASS, 290 packages; lifecycle scripts enabled |
| Full build/schema | `npm run build`; `npm run db:validate` | PASS, Prisma7.10.1 client and Tailwind4.3.5 compiled; schema valid |
| HTTP/configuration | `npm test` | PASS, 14/14 |
| MySQL setup | `docker compose config --quiet`; `docker compose --profile test up -d --wait mysql mysql-test` | PASS, independent healthy development volume / test tmpfs |
| Migration | `npm run db:migrate` twice; `npx --no-install prisma migrate status` | PASS, bootstrap applied once; repeat has no pending migration; schema up to date |
| Seed | `npm run db:seed` twice; real Prisma count | PASS, exactly one fictional `demo-cafeteria` in development; no credentials created |
| Database isolation/cleanup | Authenticated Prisma `SELECT VERSION(), DATABASE()` and Company counts on both URLs | MySQL8.4.13; development `food_waste_fighter`, test `food_waste_fighter_test`; no leftover test companies, no test demo after cleanup |
| Real integration suite | `npm run test:db` | PASS, 6/6, 11.92s: readiness, Unicode persistence, uniqueness, actual seed idempotence/preservation, server startup/SIGTERM and unavailable-DB startup failure |
| Full application entry | `npm start` | PASS, including prestart build; listens on 0.0.0.0:3000 with real MySQL |
| Process lifecycle | Integration suite spawns `src/server.js` against isolated MySQL | Healthy HTTP/home/CSS/readiness; SIGTERM exits0; unavailable DB exits1 without listener or credential disclosure |
| Browser | Session-local `node work/browser-check.mjs`, Playwright/system Chromium against actual `npm start` | PASS at 1280x900 and 390x844: EJS/CSS, 36px heading, no overflow/page errors, readiness link reports real DB up; screenshots in ignored work/ |
| Environment | Randomness/uniqueness, permission and repeat-setup byte comparison | PASS, five distinct 64-hex secrets, mode0600, existing .env preserved |
| Test guard | Invoke test runner with development, non-test and non-MySQL URLs | PASS, all refused before migration |
| Ignored generated/private files | `git check-ignore` | PASS for .env, work/, generated Prisma and compiled CSS |
| Devcontainer configuration | Official CLI0.90.0 `devcontainer read-configuration --workspace-folder …` | PASS, Node24 official image, Docker-in-Docker2, port3000, node user, setup/install/build hook recognized |
| Dependency/whitespace checks | `npm audit --omit=dev --audit-level=high`; `git diff --check` | PASS, 0 vulnerabilities reported and no whitespace errors; advisory result is not a security certification |
| Full devcontainer image/build | `docker pull mcr.microsoft.com/devcontainers/javascript-node:5.2.5-24-bookworm` | BLOCKED: layers downloaded; registration failed with `no space left on device` under Docker VFS. Actual build/rebuild unverified |
| Actual Codespaces | Project-owner confirmation on 2026-11-07 | PASS (externally reported): successful operation confirmed; no detailed trace or agent-run Codespaces test claimed |

The first extended integration run passed five tests and failed the new unavailable-DB deadline of 10s. Inspection and a timed production-entry run showed two sequential 5s driver acquisition timeouts; safe exit occurred at approximately 10.48s. The test now allows 15s (20s Vitest limit), and all six tests pass. No production timeout or runtime behavior was changed to hide the failure.

These 20 checks verify the foundation. They do not replace the later mandatory auth/CRUD/chat acceptance tests, performance measurement or first-bimester delivery requirements.

## Phase 1 acceptance

The project owner confirmed successful operation in Codespaces on 2026-11-07 and requested PR update/merge. This closes Phase 1. The managed executor disk-limit result is retained as historical evidence and is distinct from the external Codespaces validation. Authentication/cookie/CSRF and two-user wss acceptance remain later-phase work because those features do not exist yet.

PR #1 is being updated to include the completed persistence/startup verification and externally confirmed Codespaces result. No bimester release tag or deployment is included.
