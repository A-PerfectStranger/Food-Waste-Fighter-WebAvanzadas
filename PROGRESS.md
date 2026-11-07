# PROGRESS — Food Waste Fighter

## State and scope

- Current phase: **Phase 1 — Migration and environment setup** (specification A+B).
- Overall: **PARTIALLY VERIFIED / BLOCKED** at the Phase 1 persistence gate. Baseline was documentation only; original Java app reviewed statically, not executed.
- Scope: first bimester only. This checklist combines PROJECT_SPEC.md and the academic guide's first-bimester rubric. Attachment prose defines requirements, not separate tool instructions.
- Statuses: TODO, IN_PROGRESS, BLOCKED, DONE. Checkboxes indicate verified completion only.

## Phase 1 — Audit and executable foundation

- [x] DONE: inspect Java Servlets/JSP, JPA entities/DAOs, REST, SQL and academic guide.
- [x] DONE: document original/target architecture, migration matrix, retained rules, missing requirements and risks in docs/MIGRATION_PLAN.md.
- [x] DONE: organize all mandatory first-bimester requirements and dependencies here.
- [x] DONE: Express5 + EJS HTTP foundation, local compiled Tailwind, Zod configuration validation, Helmet/CSP, safe 404 and database-unavailable responses; 14 passing HTTP/config tests, browser rendering checked.
- [x] DONE: MySQL8 Compose development volume/authenticated healthcheck and independent tmpfs test service; both containers healthy, separate authenticated DB queries verified.
- [x] DONE: .env.example and non-overwriting random-secret setup; uniqueness, mode0600, preservation and Git ignore verified.
- [ ] IN_PROGRESS: official Node24 devcontainer, Docker-in-Docker and forwarded3000 configured; JSON and real image manifest verified, actual container build/rebuild not verified (image blob redirect blocked here).
- [ ] BLOCKED: stable Prisma7.10.1 setup, Company bootstrap migration and idempotent fictional seed written; client generation blocked by denied engine download. No migration, seed or Prisma readiness query has been verified.
- [x] DONE: Vitest/Supertest foundation test setup and isolated test-runner safeguards; test MySQL container verified separately.
- [ ] BLOCKED: three real Prisma/MySQL integration tests written, not executed; generation/migration prerequisite remains blocked.
- [x] DONE: README documents browser-only Codespaces setup, scripts, environment, evidence, attribution and AI assistance, clearly identifying unverified steps.
- [ ] BLOCKED: production-entry startup/shutdown verification pending Prisma engine/client generation, migration and seed.
- [ ] TODO: actual Codespaces forwarded HTTPS verification; local HTTP/browser checks do not establish Codespaces behavior.

## Phase 2 — Data model, authentication and security (depends on Phase 1)

- [ ] TODO: full Prisma models Company, User, Inventory, FoodItem, Category, Recipe, RecipeIngredient, ChatRoom, ChatMessage, PasswordResetToken and persistent Session storage; reviewed migrations, FK/tenant constraints, uniqueness, indexes and ER diagram.
- [ ] TODO: synthetic company/user/inventory/category/recipe/chat seed; no real personal data or original passwords.
- [ ] TODO: registration name/email/password validation in client + Zod server, normalized unique email, atomic company + ADMIN + inventory + general-room onboarding; controlled EMPLOYEE enrollment.
- [ ] TODO: Argon2id salted hashes; login verified against MySQL; rotate session ID; login brute-force protection.
- [ ] TODO: persistent express-session store; HttpOnly/SameSite cookies, Secure on HTTPS, Codespaces trusted proxy configuration, logout invalidation.
- [ ] TODO: protect all business routes; ADMIN/EMPLOYEE authorization and company isolation; no client-controlled tenant/role trust.
- [ ] TODO: random reset token, hash-only storage, one use, expiry, atomic consumption, private simulated mail, generic public response and session invalidation policy.
- [ ] TODO: CSRF for mutations; Helmet/CSP, escaped EJS, parameterized Prisma, secret validation, clear safe errors.
- [ ] TODO: automated registration, duplicate email, wrong password, protected route, reset expiry/reuse, role/isolation and persistent-session checks on separate test database.

## Phase 3 — Business functionality (depends on Phase 2)

- [ ] TODO: protected dashboard: food total, soon, expired and low stock metrics; relevant alerts, CRUD/chat/logout navigation.
- [ ] TODO: food CRUD create/list/by-ID/update/delete with explicit confirmation; >5 fields including decimal quantity, unit, category, received/expiry dates, minimum stock.
- [ ] TODO: company-scoped name/category search, real database pagination/stable ordering and search indexes; ID/category/inventory authorization.
- [ ] TODO: HTML5 client + Zod server validation (required/type/format/ranges/length/date rules), clear success/error messages and preserved form input.
- [ ] TODO: categories; recipes list/detail/ingredients and useful preparation steps; fictional data only.
- [ ] TODO: expiration classes and accessible visual alerts, expired/low-stock indicators; date boundary tests, useful original matching behavior where affordable.
- [ ] TODO: coherent responsive green/neutral navigation, dashboard cards, labels, keyboard navigation, contrast, tables/filter/pagination/empty states.
- [ ] TODO: CRUD validation, search/pagination, tenant permissions, recipe and expiration tests; verify real persistence.

## Phase 4 — Real-time communication (depends on Phases 2–3)

- [ ] TODO: Socket.IO shares Express HTTP server; reuse persistent session at handshake, reject anonymous connections and inappropriate origins.
- [ ] TODO: company general room; authorize room/history/events, prevent cross-company access and client-controlled identity.
- [ ] TODO: real-time messages between two simultaneous users, persisted MySQL history and connected-users indicator.
- [ ] TODO: server validation of content/length/format, escaping/textContent, XSS protection, safe errors, appropriate connection limits.
- [ ] TODO: additional inventory change/near-expiry notification without reload, isolated per company.
- [ ] TODO: tests: anonymous socket rejected, cross-company denied, persistent history and two-client live exchange; document handshake/events/transport fallback.

## Phase 5 — Quality, academic documentation and delivery (after mandatory features)

- [ ] TODO: regression/security review of HTTP and Socket.IO; minimum 5 meaningful automated tests, target 8+ specified business cases; separate DB and no destructive development resets.
- [ ] TODO: reproducible measured performance (Lighthouse or query latency), pagination/index evidence, live updates without refresh.
- [ ] TODO: business problem, measurable general/specific objectives; prioritized user stories and guide/rubric compliance matrix (all 20 points).
- [ ] TODO: architecture and ER diagrams updated to implemented code; complete README (stack, env, setup, diagrams, members/roles, AI use).
- [ ] TODO: proposed schedule and work allocation for 4–5 people; actual names/contributions supplied by team, never invented.
- [ ] TODO: 15-minute presentation + 5-minute questions; all members speak, screens/demo script, hash/validation/authenticated-WebSocket security evidence, test results, conclusions/lessons and AI declaration.
- [ ] TODO: actual Codespaces forwarded HTTPS verification: login, cookies, CSRF forms, Socket.IO wss and two tabs/users; record evidence without claiming local tests prove it.
- [ ] TODO: docs/second-bimester-roadmap.md (documentation only); no second-bimester implementation.
- [ ] TODO: public repository link, actual commits by all members, no credentials/PII, prepare v1.0-b1 only after validation; presentation/source link and evidence submitted by team to course platform.

## Current task

**Task:** Complete the Phase 1 persistence/startup gate after the environment download restriction is resolved.
**Status:** BLOCKED. User explicitly said to leave the restriction and that they will fix it later; do not pursue workarounds or advance into Phase 2.
**Files:** `prisma/`, `src/config/database.js`, `src/server.js`, `tests/database.integration.test.js`, `.devcontainer/devcontainer.json`, README.
**Last verified state:** 14 passing independent HTTP/configuration tests; real MySQL development/test containers healthy; browser-only EJS/CSS checked. Full application has not started successfully.

## Completed work and evidence

2026-11-07: read AGENTS.md, PROJECT_SPEC.md and initial PROGRESS.md before changes; inspected archive (107 entries), Java controllers/DAOs/entities, views, REST and SQL. Extracted DOCX paragraphs including first-bimester rubric (20 points) with Python zipfile/XML. Created migration matrix and dependency gates. Source audit located plaintext password comparison, unscoped ID operations, fixed-user API and DROP TABLE statements. No original SQL executed.

## Verification log

- 2026-11-07: node --version => v24.22.1; npm --version => 11.9.0.
- Managed local Docker socket info => server 29.9.2; docker compose version => v2.40.3.
- npm view prisma@7.10.1 version engines => stable 7.10.1, Node >=24 supported. Latest unqualified Prisma was a release candidate; stable version explicitly selected.
- `npm install` completed; package-lock.json generated. `npm ci --ignore-scripts` subsequently completed against that lock (290 packages); this validates package installation only, explicitly skips lifecycle scripts, and is not a full Codespaces bootstrap result.
- `npm run build:css` => PASS, Tailwind4.3.5, compiled local CSS. `npm test` => PASS, 1 file / **14 tests**, final duration254ms. Tests cover EJS rendering, liveness versus readiness, 503/no secret disclosure, safe404, headers/HTTPS configuration and invalid environment rejection. These are foundation tests, not guide-required auth/CRUD acceptance tests.
- `npm run build` => FAIL at `db:generate`: Prisma engine checksum download from binaries.prisma.sh returned HTTP403. The chained schema validation and tests did not run in that invocation; HTTP tests were subsequently run independently and passed. `db:generate --no-engine` also failed on the same prerequisite. No bypass was applied. No migration, seed, integration test, full app startup or shutdown result is claimed.
- `docker compose config --quiet` => PASS. `docker compose up -d --wait mysql` and `docker compose --profile test up -d --wait mysql-test` => PASS, both healthy. Authenticated SELECT VERSION(), DATABASE() via each container's MySQL client => `8.4.13 / food_waste_fighter` and `8.4.13 / food_waste_fighter_test`. No original SQL or manual substitute migration executed.
- Devcontainer JSON checks => PASS (Node24 official image, Docker-in-Docker feature, port3000). Initial guessed image tags1/2 did not exist and were corrected. Official source manifest identifies image5.2.5; `docker buildx imagetools inspect --raw mcr.microsoft.com/devcontainers/javascript-node:5.2.5-24-bookworm` => PASS, linux/amd64 + arm64. Full manifest/config fetch hit blocked westus.data.mcr.microsoft.com redirect, so no devcontainer build is claimed.
- Environment setup checks => PASS: five distinct random64-hex secrets, .env mode0600, rerun preserves bytes, different development/test DB names. Values were not printed. Integration runner rejects development and non-test URLs before any migration. `git check-ignore` confirms .env, extracted attachments and generated CSS are excluded.
- Browser verification: `node work/browser-check.mjs` (session-local harness using installed Playwright and /usr/bin/chromium) => PASS at1280x900 and390x844; visible EJS heading, compiled36px heading, no horizontal overflow, no page errors, working readiness link reporting unavailable. Screenshots in ignored work/. Database dependency deliberately throws in this harness; this is not production startup or Prisma verification. Browser check repeated after the clean dependency install with same result.
- `npm audit --omit=dev --audit-level=high` => 0 production dependency vulnerabilities reported at check time; does not establish overall application security.
- `git diff --check` => PASS. At the end of the initial implementation turn, no commits, publication, release tag, original application execution, performance metric, actual Codespaces HTTPS/session/WebSocket check or academic submission was claimed.

## Issues and blockers

- **Active blocker:** managed network policy returns HTTP403 for `binaries.prisma.sh`. User was informed and replied: "leave it, i'll fix it later". Stop dependent verification here. Once allowed, refresh environment readiness and retry normal TLS-verified setup; do not ignore checksums or fabricate results.
- **Devcontainer verification limit:** westus.data.mcr.microsoft.com image-blob redirect denied here; image manifest exists, but actual Codespaces rebuild remains unverified.
- Actual GitHub Codespaces forwarded HTTPS browser access is not available merely by running in this managed cloud workspace; record that gate truthfully.
- Original application is reference input only; unsafe SQL/accounts/configuration must not be imported.
- All authentication, tenant enforcement, business UI, chat and release requirements remain pending.

## Next action

After the user resolves access, resume at the missing dependency: `npm ci` → `npm run build` → `npm run db:validate` → `npm run db:up` → `npm run db:migrate` → `npm run db:seed` (repeat and confirm no duplicate seed) → start isolated test DB → `npm run test:db` → `npm start`, real HTTP /ready and graceful shutdown checks. Verify the devcontainer in actual Codespaces, resolve any errors, and record evidence before marking Phase 1 DONE. Then design the full tenant-safe Prisma model before authentication. Do not skip the blocked persistence/startup gate.

## Session change log

- Audit task: IN_PROGRESS → DONE after source/guide review and migration/checklist cross-check.
- HTTP/Compose/env/test/README foundation tasks: IN_PROGRESS → DONE only for the specific verified evidence above.
- Prisma/integration/full-startup tasks: TODO → IN_PROGRESS → BLOCKED on engine download; user will resolve later. Phase 2 remains TODO.
- `AGENTS.md` and `docs/PROJECT_SPEC.md` were read and preserved. No sub-agents used. Both MySQL containers remain running for continuation.

## Git publication task — 2026-11-07

- User explicitly requested a remote push and pull request. **Status: IN_PROGRESS.**
- Feature branch: `codex/phase-1-foundation`; target: `main` in `A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas` (remote default branch verified).
- Publish the verified Phase 1 foundation as a draft PR because Prisma/client/migrations/full startup remain blocked. Do not merge or mark Phase 1 complete.
