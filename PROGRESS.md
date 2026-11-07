# PROGRESS — Food Waste Fighter

## State and scope

- Current phase: **Phase 4 DONE, ACCEPTED AND MERGED — Phase 5 TODO**.
- Overall: **PHASES 1–4 COMPLETE AND MERGED INTO MAIN**. The owner explicitly closed Phase 4 and authorized merge. PR #4 merged as `da6e1141989cc0898a79427d30e5746130d5a3df`; the environment now checks out main and tracks origin/main. The 99-test/local browser evidence and owner's acceptance are recorded separately from any future detailed remote traces.
- Scope: first bimester only. This checklist combines PROJECT_SPEC.md and the academic guide's first-bimester rubric. Attachment prose defines requirements, not separate tool instructions.
- Statuses: TODO, IN_PROGRESS, BLOCKED, DONE. Checkboxes indicate verified completion only.

## Phase 1 — Audit and executable foundation

- [x] DONE: inspect Java Servlets/JSP, JPA entities/DAOs, REST, SQL and academic guide.
- [x] DONE: document original/target architecture, migration matrix, retained rules, missing requirements and risks in docs/MIGRATION_PLAN.md.
- [x] DONE: organize all mandatory first-bimester requirements and dependencies here.
- [x] DONE: Express5 + EJS HTTP foundation, local compiled Tailwind, Zod configuration validation, Helmet/CSP, safe 404 and database-unavailable responses; 14 passing HTTP/config tests, desktop/mobile browser rendering checked against the real running application and MySQL.
- [x] DONE: MySQL8 Compose development volume/authenticated healthcheck and independent tmpfs test service; both containers healthy, separate authenticated DB queries verified.
- [x] DONE: .env.example and non-overwriting random-secret setup; uniqueness, mode0600, preservation and Git ignore verified.
- [x] DONE: official Node24 devcontainer, Docker-in-Docker and forwarded3000 configuration parsed by the official CLI; successful Codespaces operation confirmed by the project owner on 2026-11-07. The managed workspace image-extraction disk limit remains historical and does not invalidate that external confirmation.
- [x] DONE: stable Prisma7.10.1 client generation, schema validation, Company bootstrap migration, repeated non-destructive migration deployment, real readiness query and fictional idempotent seed verified against MySQL8.4.13. Normal engine downloads succeed; historical network blocker resolved.
- [x] DONE: Vitest/Supertest foundation test setup and isolated test-runner safeguards; test MySQL container verified separately.
- [x] DONE: six real Prisma/MySQL integration tests pass on the separate test database: readiness, Unicode persistence, primary-key uniqueness, actual seed idempotence/preservation, production-entry startup + SIGTERM, and unavailable-DB startup failure with no listener or credential disclosure. Test records are cleaned up.
- [x] DONE: README documents browser-only Codespaces setup, scripts, environment, current evidence, attribution and AI assistance; resolved Prisma blockers and remaining Codespaces verification are distinguished.
- [x] DONE: `npm start` completes prestart build and listens on 0.0.0.0:3000 with real MySQL; browser home/CSS/readiness checks pass. Automated production-entry startup, clean SIGTERM exit (code0), and unavailable-DB failure (code1/no HTTP listener) pass.
- [x] DONE: successful execution in actual Codespaces confirmed by the project owner on 2026-11-07. Detailed browser/network traces were not supplied. Phase 2 authentication was subsequently accepted by the owner; Phase 3 screen acceptance and Phase 4 wss checks remain later acceptance work.

## Phase 2 — Data model, authentication and security (depends on Phase 1)

- [x] DONE: complete Prisma models Company, User, Inventory, FoodItem, Category, Recipe, RecipeIngredient, ChatRoom, ChatMessage, PasswordResetToken and Session. Additive migration applied to real development/test MySQL; compound tenant FKs, uniqueness, indexes, decimal/date SQL checks and ER diagram verified.
- [x] DONE: idempotent fictional company/ADMIN/EMPLOYEE/inventory/category/food/recipe/ingredient/room/message seed. Initial passwords are random/discarded; repeated seed preserves accounts/passwords. Exact entity counts are verified.
- [x] DONE: name/email/password/client confirmation validation with HTML5/JavaScript and server Zod; normalized unique email; atomic company + ADMIN + inventory + general-room creation; same-company ADMIN-only EMPLOYEE enrollment; public role/tenant injection rejected.
- [x] DONE: Argon2id (19MiB, timeCost2, parallelism1), real MySQL login, session-ID regeneration, generic login failures and basic login/registration/recovery/enrollment IP limits.
- [x] DONE: MySQL-backed express-session store, expiry, HttpOnly/SameSite=Lax, Secure with HTTPS, trusted Codespaces proxy configuration and logout invalidation. Persistence across application instances and expired-session rejection pass; no MemoryStore fallback.
- [x] DONE: account/team and implemented Phase 3 business routes protected; role and company reloaded server-side; ADMIN/EMPLOYEE and tenant isolation verified at HTTP and FK levels. Phase 4 reuses the persistent session and revalidates socket events/recipients against MySQL.
- [x] DONE: random256-bit reset token; hash-only MySQL storage, 30-minute expiry, new-link invalidation, atomic single consumption including concurrency, private mode0600 simulated outbox and generic public response. Password changes delete sessions and increment a version to reject stale concurrent saves.
- [x] DONE: synchronizer CSRF and same-origin handling for native no-referrer forms; Helmet/CSP, escaped EJS, parametrized Prisma, safe errors and validated HTTP(S) origin/production HTTPS configuration. External scripts/fonts moved to local assets.
- [x] DONE: real automated registration/duplicate/wrong-password/protected-route/role/tenant/session/reset expiry-reuse-concurrency tests on separate MySQL; desktop/mobile native-browser register/logout/recovery/reset/login flow verified. The original landing/login/registration markup, green/gray palette, logo, Inter and CSS identity are retained in EJS.

## Phase 3 — Business functionality (depends on Phase 2)

- [x] DONE: protected dashboard: total, soon (0–5 days), expired and low-stock counts; three earliest alerts, up to two matching recipe suggestions, working inventory/account/logout navigation. Working chat navigation was added in Phase 4.
- [x] DONE: food CRUD create/list/by-ID/update/delete with explicit confirmation; seven fields including exact decimal quantity, unit, category, received/expiry DATEs and minimum stock.
- [x] DONE: company-scoped name/category search, SQL skip/take pagination (10), stable expiry/ID ordering and existing scoped indexes; ID/category/inventory authorization with real MySQL evidence.
- [x] DONE: HTML5/client date-order + strict Zod server validation, nonnegative Decimal(12,3) bounds, valid dates/ranges/lengths; clear errors, preserved input and session-held success notices.
- [x] DONE: ADMIN category create/rename/confirmed delete (reject in-use category); scoped recipe list/detail/ingredients/preparation and SQL pagination. Existing fictional seed reused without overwriting data.
- [x] DONE: explicit expired / critical today–2 / warning3–5 / normal6+ statuses in BUSINESS_TIMEZONE; textual low-stock indicators, civil-date/DST/leap-day tests. Original bidirectional ingredient-name overlap retained; expired/empty stock excluded from suggestions.
- [x] DONE: original ZIP navbar/JSP layouts and unchanged legacy CSS reused, local Inter and original green/gray/alert palette; responsive tables/filter/pagination/empty states, labels, keyboard focus and mobile menu verified. No blanket WCAG/contrast certification is claimed; full accessibility review remains Phase 5.
- [x] DONE: 23 new independent business cases and 15 real MySQL business integration cases; CRUD/validation/CSRF, filtering/pagination, roles/tenant IDs, metrics, categories, recipe availability and stored-XSS escaping verified. Delayed-session-store/native-header regression verifies save-before-redirect; final total: **83 PASS** (41 independent + 42 integration).

## Phase 4 — Real-time communication (depends on Phases 2–3)

- [x] DONE: Socket.IO 4 shares the production Express HTTP server and exact persistent session middleware; authenticated namespace requires the session-bound token; anonymous/forged/expired sessions and inappropriate origins rejected. Browser same-origin polling and bounded trusted HTTPS proxy behavior verified.
- [x] DONE: General company room; HTTP/socket history and events scoped to current server-resolved company/user; room/cursor/identity injection and cross-company delivery rejected.
- [x] DONE: two distinct simultaneous users exchange persisted MySQL messages; 50-message cursor history with timestamp/ID ordering; distinct-user presence across tabs and disconnects. Logout/version/expiry revocation checked per event/recipient and every 15 seconds.
- [x] DONE: strict Zod 1–2000-character text/control validation; EJS escaping and textContent; safe errors; 5 sockets/user, 100/company, 60 events/minute/user across tabs, 16KiB packets. UI preserves unconfirmed input and never automatically retries a send.
- [x] DONE: persisted food create/update/delete emits company-only inventory notification; near-expiry/expired classification, live banner without reload; invalid/foreign writes do not emit. Metrics/tables remain their initial server-rendered snapshot with a link to refresh inventory.
- [x] DONE: working chat route and dashboard/shared navbar navigation; original local Inter and green/neutral style, desktop/mobile/narrow layouts verified.
- [x] DONE: 2 independent origin-policy cases + 14 real Socket.IO/MySQL integration cases, including two users, persistence, isolation, presence, polling, revocation, limits, notifications, safe failure and active shutdown. Full regression **43 independent + 56 integration = 99 PASS**. Handshake/events/transport/limits documented in docs/REALTIME.md. Native Chromium HTTP and rewritten-Origin HTTPS proxy/wss flows pass; actual remote Codespaces acceptance remains Phase 5.

## Phase 5 — Quality, academic documentation and delivery (after mandatory features)

- [ ] TODO: regression/security/accessibility and contrast review of HTTP and Socket.IO; minimum 5 meaningful automated tests, target 8+ specified business cases; separate DB and no destructive development resets. Current HTTP/business/Socket.IO suites already exceed the numeric minimum; complete Phase 5 review remains pending.
- [ ] TODO: reproducible measured performance (Lighthouse or query latency), pagination/index evidence, live updates without refresh.
- [ ] TODO: business problem, measurable general/specific objectives; prioritized user stories and guide/rubric compliance matrix (all 20 points).
- [ ] TODO: architecture and ER diagrams updated to implemented code; complete README (stack, env, setup, diagrams, members/roles, AI use).
- [ ] TODO: proposed schedule and work allocation for 4–5 people; actual names/contributions supplied by team, never invented.
- [ ] TODO: 15-minute presentation + 5-minute questions; all members speak, screens/demo script, hash/validation/authenticated-WebSocket security evidence, test results, conclusions/lessons and AI declaration.
- [ ] TODO: collect detailed Codespaces forwarded HTTPS/wss/two-user evidence for Phase 5 defense, including cookie/CSRF traces when available. Phase 4 is already accepted by the owner and merged; this evidence task is not a reopened acceptance gate. Do not claim local tests are remote traces.
- [ ] TODO: docs/second-bimester-roadmap.md (documentation only); no second-bimester implementation.
- [ ] TODO: public repository link, actual commits by all members, no credentials/PII, prepare v1.0-b1 only after validation; presentation/source link and evidence submitted by team to course platform.

## Current task

**Task:** Merge accepted Phase 4 PR #4 and synchronize the environment with remote main.
**Status:** DONE — PR #4 merged with expected-head protection; main checked out and synchronized. Phase 5 is next.
**Last verified state:** GitHub returned merged:true and merge SHA `da6e1141989cc0898a79427d30e5746130d5a3df`. Runtime/dependency/schema/test files are identical to the already verified feature head; 99-test/native-browser evidence remains applicable. The application reports ready/database up. Post-merge documentation records acceptance and completion without inventing remote test traces.

## Completed work and evidence

2026-11-07: read AGENTS.md, PROJECT_SPEC.md and initial PROGRESS.md before changes; inspected archive (107 entries), Java controllers/DAOs/entities, views, REST and SQL. Extracted DOCX paragraphs including first-bimester rubric (20 points) with Python zipfile/XML. Created migration matrix and dependency gates. Source audit located plaintext password comparison, unscoped ID operations, fixed-user API and DROP TABLE statements. No original SQL executed.

## Historical verification log — initial foundation session

These results describe the previous session. Superseded network/container-state claims are retained as history; current results are recorded in the continuation below.

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

- Historical/resolved Phase 2 origin gate: FWF_FORM_ORIGIN_REJECTED, secure/proxy true, nonopaque mismatching Origin and same-origin metadata. Browser origin and fresh CLI APP_ORIGIN were confirmed equal. A proxy-rewriting reproduction passed after the bounded alternative origin check; the actual remote raw header/process startup snapshot was not captured. The owner subsequently confirmed success.
- Historical origin/retest blocker resolved by the owner's Codespaces confirmation and PR #2 merge (`bedcdc1`); retained diagnostic details below are history, not current blockers.
- Historical managed-executor image-extraction disk limit remains recorded. No local devcontainer rebuild success is claimed.
- Phases 3–4 have no known blocking local runtime/test failure. Its actual Codespaces forwarded-HTTPS acceptance and full accessibility/contrast audit remain pending; local browser results do not close those gates.

## Next action

Begin Phase 5: full security/accessibility review, reproducible query/performance
measurement and academic documentation/rubric evidence. Verify the new screens,
secure cookies and two distinct users over actual forwarded Codespaces HTTPS/wss.
PR #3 is already merged; its historical draft status is not a current blocker.
Phase 4 PR #4 is merged and main is synchronized. Proceed to Phase 5; no release tag yet.

## Historical session change log — initial foundation

- Audit task: IN_PROGRESS → DONE after source/guide review and migration/checklist cross-check.
- HTTP/Compose/env/test/README foundation tasks: IN_PROGRESS → DONE only for the specific verified evidence above.
- Prisma/integration/full-startup tasks: TODO → IN_PROGRESS → BLOCKED on engine download; user will resolve later. Phase 2 remains TODO.
- `AGENTS.md` and `docs/PROJECT_SPEC.md` were read and preserved. No sub-agents used. Both MySQL containers remain running for continuation.

## Historical Git publication task — 2026-11-07

- User explicitly requested a remote push and pull request. **Status: DONE.**
- Feature branch: `codex/phase-1-foundation`; target: `main` in `A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas` (remote default branch verified).
- Publish the verified Phase 1 foundation as a draft PR because Prisma/client/migrations/full startup remain blocked. Do not merge or mark Phase 1 complete.
- Commit `fcb4725` contains the Phase 1 foundation; `git push -u origin codex/phase-1-foundation` succeeded.
- Draft PR [#1](https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas/pull/1) opened against `main`; GitHub confirmed it is open, draft and unmerged.
- Pre-push `npm test`: 14/14 passed (258ms); staged diff/secret checks passed. Existing Prisma/network and Codespaces verification limits remain unchanged.
- This documentation follow-up records the completed publication task. Development's next action remains the blocked Phase 1 persistence/startup verification described above.

## Phase 1 continuation — 2026-11-07

Chronological entries below include intermediate states; the current authoritative status is at the top of this file.

- IN_PROGRESS: fetched and checked out the user-identified `codex/phase-1-foundation` branch at `8cd7150`; initial `work` branch only contained the documentation baseline. Working tree was clean. Read AGENTS.md, PROJECT_SPEC.md, MIGRATION_PLAN.md, PROGRESS.md and implementation/test/config files before changes.
- Current managed environment is ready with enforced unrestricted network policy. Historical blocked results remain history, not evidence of the current state. No existing node_modules, .env or running MySQL containers were found here; recreate private session setup without claiming the old containers survived.
- Next: normal locked install/build, real isolated MySQL/Prisma checks, seed idempotence, production-entry startup/shutdown, and devcontainer validation where available.

- Verification update: full `npm ci`, `npm run build`, `npm run db:validate`, and `npm test` PASS (14/14); Prisma engine downloads now succeed normally. Both Compose databases healthy. Development migration and two seed executions PASS; `npm run test:db` PASS (3/3) after the isolated test migration. Runtime seed count and startup/shutdown still to verify.
- Devcontainer image pull advanced beyond the old network restriction but failed registering a layer with `no space left on device`; inspect current storage before attempting a full build. No devcontainer build/rebuild success is claimed.

### Continuation verification results

- Branch checked out: `codex/phase-1-foundation`, base `8cd7150`; initial workspace branch `work` was the documentation-only baseline. No other working changes were overwritten.
- Rechecked source/guide against migration matrix and runtime: Company is the only model; auth/business/chat are absent as recorded. Reconfirmed original plaintext password query, unscoped ID lookup, expiration thresholds and destructive SQL in ignored reference extraction; did not run legacy code/SQL.
- `npm run setup:env` → PASS; private .env created for this executor. Full `npm ci` → PASS (290 packages, lifecycle scripts enabled). `npm run build` → PASS (Prisma7.10.1 client + Tailwind4.3.5); `npm run db:validate` → PASS.
- `docker compose config --quiet` and `docker compose --profile test up -d --wait mysql mysql-test` → PASS. Both MySQL8.4.13 containers healthy. Current environment did not retain the prior session's running containers or .env; these were recreated, not presumed available.
- `npm run db:migrate` → PASS, applied `20261107000100_bootstrap`. Repeated deployment → PASS, no pending migrations. `npx --no-install prisma migrate status` → schema up to date.
- `npm run db:seed` twice → PASS. Authenticated Prisma queries confirm one `demo-cafeteria` in `food_waste_fighter`, zero in `food_waste_fighter_test` after test cleanup, and zero leftover `test-*` companies in either database. Real queries confirm independent database names and MySQL8.4.13.
- Extended `tests/database.integration.test.js` from 3 to 6 tests for reproducible seed/startup/failure/shutdown acceptance. Initial extended run: 5 PASS / 1 FAIL because the new unavailable-DB test allowed only 10s. Investigation showed adapter capability discovery and readiness each use a 5s acquisition timeout; real safe exit occurred at ~10.48s. Corrected the test allowance to 15s (20s test timeout); production behavior was already correct. Final `npm run test:db` → **6/6 PASS** (11.92s), including real MySQL and child-process exit checks. `npm test` → **14/14 PASS**. These 20 foundation/integration checks do not replace later required auth/CRUD/chat tests.
- `npm start` → PASS, including prestart generation/CSS; real server listens on 0.0.0.0:3000. `node work/browser-check.mjs` → PASS at 1280x900 and 390x844 against that server: HTTP200 home, 36px compiled heading, no horizontal overflow/page errors, readiness link reports `{status: ready, database: up}`. Screenshots remain ignored session-local evidence. Automated child-server SIGTERM → exit0; unavailable DB → exit1 with safe message and no HTTP listener.
- The first manual negative-URL probe accidentally replaced `_test` in the username rather than the database path, so it reached Prisma and failed authentication instead of exercising the guard. Corrected the probe to set URL.pathname explicitly; all three intended rejection cases then passed before any migration. No schema/data change resulted from the failed probe.
- Environment/setup runner checks → PASS: five independent 64-hex secrets, mode0600, setup rerun preserves bytes, development/non-test/non-MySQL test URLs rejected before migrations. Git ignore confirms .env, work/, generated Prisma and compiled CSS are excluded.
- `npx --yes --package @devcontainers/cli devcontainer read-configuration --workspace-folder /workspace/Food-Waste-Fighter-WebAvanzadas` → PASS (CLI0.90.0); Node24 image, Docker-in-Docker2, forwarded3000, node user and non-overwriting setup/install/build hook recognized. Image pull failed on extraction/storage as described above; no devcontainer/Codespaces success is claimed.
- No Phase 2 implementation, commit, remote push, PR change, deployment or release tag was performed in this continuation. Existing historical draft PR publication record remains history, not authorization for a new remote write.

- Final checks: `npm audit --omit=dev --audit-level=high` → 0 vulnerabilities reported; `git diff --check` → PASS. Current branch has four modified tracked files (tests and three documentation files); AGENTS.md, PROJECT_SPEC.md, migration plan, lockfile and runtime code are unchanged. Runtime verification DONE; Codespaces acceptance BLOCKED as recorded above. Development/test MySQL and the verified application remain running for inspection.

## Phase 1 acceptance and merge — 2026-11-07

- Successful operation in Codespaces was confirmed by the project owner. This closes the external acceptance gate; no additional Codespaces trace or agent-run rebuild is claimed.
- PR #1 update and merge were explicitly requested. The PR is open, draft and mergeable at head `8cd7150`; remote `main` has no conflicting changes.
- Status: IN_PROGRESS for the documentation/test follow-up commit, PR update and merge. The subsequent Phase 2 work will use a separate branch and preserve the original HTML/CSS appearance.

## Phase 2 implementation — 2026-11-07

- IN_PROGRESS: schema/migration and original-template adaptation inspected before edits. Public registration will atomically create a company, ADMIN, inventory and general room. Employees will be enrolled only by the same-company ADMIN; no public role/company assignment.
- Security design: Argon2id; MySQL-backed express-session with rotation and version-based reset revocation; synchronizer CSRF + same-origin checks; one-use hashed reset tokens with atomic consumption; private ignored development outbox; server-side role/tenant resolution on every protected request.

### Phase 2 implementation and verification results

- PR #1: impersonal Spanish title/body updated; 20 Phase 1 tests passed again; commit `2726c43` pushed; draft status removed; merge performed with expected head SHA. GitHub returned `merged: true`, merge commit `aa6d158951571a82810c090a23c6b15550b0487c`. Phase 2 branch created from that merged main. No Phase 2 merge is authorized by the Phase 1 merge request.
- Implemented schema/migration, auth validation/service/routes, PrismaSessionStore, CSRF/auth/role middleware, controlled employee enrollment, private reset mail, client validation and original-template EJS/CSS adaptation. Added DATA_MODEL.md and AUTHENTICATION.md; README rewritten in impersonal Spanish with real setup/recovery instructions and scope.
- Migration generation first used `--from-migrations` and failed because no shadow database was configured. No schema changed. Generated the additive diff from the actual bootstrap datasource instead, inspected its SQL (no drops), added explicit CHECK constraints, then applied normally to development and isolated test MySQL.
- `npm run build`, `npm run db:validate`, migration deploy and seed twice → PASS. `prisma migrate status` → up to date; `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` → no difference. Seed assertions verify two users and one inventory/category/food/recipe/ingredient/room/message, including preservation of the original company and existing password hash.
- Initial Phase 2 regression → 14 independent + 23 integration tests PASS. Added four origin/production configuration cases and the native-form regression; current suites → **18 independent + 24 integration = 42 PASS**. Integration additionally exercises stale sessions recreated after reset, decimal persistence, nonnegative stock/date checks, tenant FKs and targeted cleanup of each created session/company.
- Browser testing initially used 127.0.0.1 instead of the configured localhost origin; the harness was aligned with APP_ORIGIN. It then exposed a real HTTP403 on native registration despite a valid session/token: Chromium sends `Origin: null` under Helmet's no-referrer policy. CSRF handling now accepts that case only with same-origin Fetch Metadata and a valid constant-time token check; cross-site opaque requests remain403. A dedicated automated regression passes.
- `node work/phase2-browser.mjs` against actual `npm start` → PASS at1280x900 and390x844: original landing/forms, mobile menu, Inter loaded locally, exact original green600 RGB(22,163,74), no horizontal overflow/external network/page errors/CSP violations. Native HTML5 mismatch/match confirmation, registration, protected account/team, POST logout, private mode0600 outbox, token reset and new-password login all pass. Synthetic browser account/session/outbox records are removed after the run; screenshots remain in ignored work/.
- `npm audit --omit=dev --audit-level=high` → 0 vulnerabilities reported. Final clean-install regression passed: `npm ci` (307 packages) → build → schema validation → 18 independent and 24 integration tests, all PASS (integration duration15.38s). `git diff --check` passes. Actual authentication over forwarded Codespaces HTTPS has not been tested in this managed workspace; no such result is claimed.

- Final data check: development/test both contain zero `auth-*` and `browser-*` users. Development retains exactly two demo users; test retains zero. Session IDs created by integration agents are captured for targeted cleanup. All Phase 2 checkboxes are marked DONE based on executed verification. Separate PR publication was subsequently completed as recorded below.

- Publication check: the initial staged whitespace check detected trailing spaces retained from the source JSP markup in new EJS files. Those spaces were removed without changing markup/classes; the staged check was repeated before commit. Private .env secret values were absent from all publishable files.

### Phase 2 publication — DONE

- Commit `b669e48a18249559ea5f3195986149a1879abe14` contains the verified Phase 2 implementation, tests, template reuse and documentation. Push to `origin/codex/phase-2-authentication` succeeded.
- Draft [PR #2](https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas/pull/2) created against `main` with an impersonal Spanish description, 42-test/browser evidence and the explicit pending Codespaces authentication check. GitHub confirmed open/draft/unmerged.
- This documentation follow-up records completed publication. No further code changes or Phase 3 implementation were made; the next action is review/Codespaces verification, then tenant-safe business functionality.

## Codespaces login rejection — 2026-11-07

- IN_PROGRESS: HTTP403 reported when clicking Iniciar sesión in Chrome. The project owner confirmed a valid HTTPS forwarded origin and TRUST_PROXY=1. No secrets were requested or supplied.
- Working branch/head match origin (`9e5203f`); the tree was clean. Existing CSRF handling requires same-origin Fetch Metadata for Origin:null. A trusted-proxy HTTPS regression without that optional header will be exercised before changing behavior.

### Forwarded HTTPS rejection reproduction and correction

- Confirmed report: rejection occurs on submitting login in Chrome, with an HTTPS Codespaces APP_ORIGIN and TRUST_PROXY=1. The configured origin was not found to be malformed; no secrets or full .env were requested.
- Regression before correction: `npm run test:db` →24 PASS/1 FAIL; the new HTTPS-forwarded login test expected303 but received403. A real Chromium fixture with local HTTPS termination, HTTP upstream, Secure/HttpOnly cookie and intentionally stripped Sec-Fetch-* also reproduced loginRejected:true. No actual remote Codespaces headers were captured.
- Fix: Origin:null no longer requires optional Fetch Metadata when that header is absent. The session-bound synchronizer token remains mandatory with byte-length/constant-time verification. If metadata is present it must be same-origin for the opaque-Origin case; explicit cross-site requests and explicit foreign origins are rejected. Missing-session and invalid-token cases remain403.
- Browser after correction: real Chromium HTTPS → stripping proxy → HTTP Express → MySQL PASS for native login, session-ID rotation, protected account, Secure/HttpOnly cookies, logout and subsequent anonymous redirect. The disposable fixture uses a self-signed certificate only on loopback; no external TLS/checksum configuration was changed. Its key/certificate/harness remain ignored in work/; synthetic DB/session data are cleaned after each run.
- Final regression: `npm test` →18/18 PASS; `npm run test:db` →25/25 PASS (15.89s); proxy browser fixture →PASS; `git diff --check` →PASS. No HTML/CSS, database migration, dependency or secret changes.

- Existing PR #2 receives this focused four-file correction; no migration, dependency update or merge is required. Retest procedure: update `codex/phase-2-authentication`, restart the server, reopen `/auth/login`, and submit a fresh form. The project-owner Codespaces result remains pending until confirmed.

## Persistent form rejection — 2026-11-07

- IN_PROGRESS: the project owner reports the rejection in both login and registration. No confirmation that the actual running process includes2426631 is available yet; branch origin does contain that commit. The earlier proxy hypothesis is not treated as a confirmed remote diagnosis.
- Current generic403 message conflates origin/header rejection, absent cookies, expired/unrecognized session and mismatching form token. Rejection diagnostics will identify the gate while withholding credentials, cookie/token values and reset URLs.

- The project owner confirmed the running checkout is2426631 and the application is opened in a normal Chrome tab, not an embedded VS Code preview. No stale-version or embedded-preview explanation is assumed.
- Added safe rejection references distinguishing absent cookie, unrecognized session, origin rejection, missing token and changed token. Runtime diagnostic JSON contains only the reference, HTTPS/proxy/origin booleans and a whitelisted Fetch Metadata classification; no body/query/credentials/cookies/session IDs/tokens. Existing acceptance rules are retained.
- Regression verifies each diagnostic, secret-free error output and secret-free runtime logging, while the real HTTPS-proxy login/logout fixture continues to pass. Final suites PASS:18 independent +26 integration tests (15.43s), proxy browser fixture PASS, `git diff --check` PASS. Remote root cause remains unconfirmed until the diagnostic reference is supplied.

## Confirmed form-origin mismatch — 2026-11-07

- The project owner supplied the safe reference `FWF_FORM_ORIGIN_REJECTED` and runtime event: secureRequest:true, trustedProxyEnabled:true, forwardedHttps:true, originMatches:false, opaqueOrigin:false, fetchSite:same-origin.
- This rules out missing cookie/session and a missing/opaque Origin as the first rejecting gate. It does not prove the supplied CSRF token matches because origin diagnostics take priority; token validation remains mandatory.
- Effective APP_ORIGIN and the browser's location.origin are being compared. No credentials, cookie values or token-bearing URLs are needed. Configuration mismatch versus proxy header rewriting must be distinguished before another acceptance-rule change.

## Matching external origins / differing upstream Origin — 2026-11-07

- The project owner confirmed location.origin equals the canonical APP_ORIGIN printed by a fresh dotenv process. The runtime rejection still reports originMatches:false, opaqueOrigin:false, fetchSite:same-origin, trustedProxyEnabled:true and secureRequest:true. This indicates a differing upstream Origin or a different config snapshot in the running process; exact raw-header rewriting is not asserted as remotely captured evidence.
- IN_PROGRESS: test a trusted HTTPS proxy that rewrites Origin while preserving the browser's forbidden-to-script Sec-Fetch-Site:same-origin metadata. Acceptance will still require the session-bound CSRF token; direct untrusted requests, cross-site/same-site signals, missing cookies and invalid tokens must remain rejected.

- Before the new origin decision, the regression ran26 integration cases successfully and failed the added27th case (expected303, actual403). Real Chromium through an Origin-rewriting HTTPS proxy also produced loginRejected:true with opaqueOrigin:false and same-origin metadata, matching the observed remote flag pattern.
- Implemented a second origin-authenticity source: exact browser Sec-Fetch-Site:same-origin, only with TRUST_PROXY=1 and req.secure=true. Every mutation still requires the valid session-bound token. Negative coverage includes cross-site/same-site metadata, no forwarded HTTPS, untrusted proxy, no cookie and invalid token. Normal direct origin checks and the opaque-origin compatibility rule remain in force.
- Added a startup public-origin/proxy banner to reveal the configuration snapshot of the actual running process without logging secrets. No .env, dependency, migration, session-cookie flags, HTML layout or CSS changes were made.

- Final verification: `npm test`18/18 PASS; `npm run test:db`27/27 PASS (15.77s); rewritten-Origin HTTPS Chrome fixture PASS for login/logout/registration, protected account and Secure/HttpOnly cookie; metadata-omitted fixture also PASS for the same native flows. `git diff --check` PASS. Existing wrong-origin/direct, cross-site, CSRF, credential, tenant, persistence and reset tests remain green.
- The project-owner console Permissions-Policy notices are browser warnings, independent of the server's diagnosed403 origin gate. They were not treated as authentication failure evidence.

- Publication: commit `d31f6d7` pushed successfully to `codex/phase-2-authentication`; PR #2 description updated in impersonal Spanish with45-test/native-browser evidence, exact bounded proxy rule and pending remote retest. This follow-up records publication; runtime code is unchanged.

## Phase 2 Codespaces acceptance and merge authorization

- The project owner confirmed "ya funciona" and explicitly requested merge. The remote acceptance gate is closed; earlier pending/rejection entries remain historical evidence. Publication of this acceptance record precedes merge.

## Phase 3 — current session audit, implementation and verification (2026-11-07)

### Remote baseline and recorded progress

- The generated workspace initially checked out documentation-only `work` at
  `88044e1`. Initial local-only inspection was therefore insufficient to infer
  the project's current state. On the user's remote check request,
  `git fetch --all --prune` found **12 newer commits** on `origin/main`.
- Preserved only this session's preliminary notes in `/workspace/work/`, removed
  those superseded draft edits and fast-forwarded to `bedcdc1`. There were no
  pre-existing user edits to overwrite. Created local `codex/phase-3-business`.
  A second fresh fetch still reported HEAD/base = origin/main = `bedcdc1`.
- Read current AGENTS/specification/migration plan/progress and inspected the
  actual auth/session/schema/seed/CSS/templates/tests. Phase 2's implementation
  matched the recorded scope. Its merged status contradicted the stale
  current-task/issues/next-action text; those entries and README were corrected.
- The owner supplied the migration ZIP again. Safely extracted **107 entries**
  under ignored `work/original/`; re-read the business JSPs/controllers/navbar and
  CSS. Normalizing CRLF/LF proves legacy.css equals the supplied styles.css.
  No original Java application or destructive SQL was executed. The guide's
  previous audit remains historical evidence; this session did not re-read a DOCX.

### Implementation

- Added protected modules dashboard, inventory (validation/repository/service/
  routes), categories, recipes and civil-date expiration, reusing the existing
  tenant FKs and guards. No dependencies or database migrations added.
- Added EJS screens adapted from the actual ZIP, with original Inter/palette/
  cards/forms/table/recipe classes/navbar book icon. Required search, pagination,
  seven food fields, category administration and four counters extend those
  patterns. No invented images, nutrition or recipe metadata were introduced.
- Roles: both ADMIN/EMPLOYEE create/edit foods; ADMIN alone deletes food and
  manages categories. Read/update/delete/category filters are company-scoped.
  POST mutations require CSRF; confirmation is required before deletion.
- Added independent and real-MySQL business tests, included in `test:db` with its
  existing isolated-database guard and targeted cleanup. Updated README,
  authentication/model/migration documentation and BUSINESS_FUNCTIONALITY.md.

### Commands and observed results

- Node `v24.22.1`, npm `11.9.0`, managed Docker socket server `29.9.2` verified.
  `npm run setup:env` created a new private local .env; `npm ci` installed the
  existing lockfile (307 packages). Secret values were not printed.
- Initial baseline: `npm run build`, `npm run db:validate`, `npm test` **18/18**,
  Compose config/start/health, development migration/seed and `npm run test:db`
  **27/27** PASS. This verified the 45-test inherited baseline in this executor.
- First business integration run: 39 PASS / 2 FAIL. Both failures were test
  fixture construction: nested RecipeIngredient inherits companyId through its
  composite parent relation, so explicitly supplying it is rejected by Prisma.
  Corrected the fixtures; all 41 then-existing integration checks passed.
- Native Chromium initially passed the entire flow. Repetition exposed a real
  success-notice race: the browser follows303 headers before express-session's
  implicit MySQL save finishes. An added regression delays SessionStore.set by
  200ms and follows native HTTP headers instead of waiting for the whole response.
  Before correction: **41 PASS / 1 FAIL**, notice undefined at redirect time.
  Explicit session save-before-redirect and save-before-rendering the consumed
  notice fix the order without changing cookie/CSRF/auth policies.
- **Final `npm run test:db`: 42/42 PASS**, 3 files, 18.09s. Includes the delayed
  store regression plus all inherited auth/database/production startup/shutdown
  checks. **Final `npm test`: 41/41 PASS**, 2 files, 597ms. **Total: 83 PASS**.
  `npm run db:validate` PASS; prestart `npm run build` PASS (Prisma7.10.1 + local
  Tailwind4.3.5). No new migrations; deploy reports no pending migrations.
- `npm start` PASS on0.0.0.0:3000 with real MySQL. The final
  `node work/phase3-browser.mjs` PASS: native registration, category creation,
  rejected reversed dates with no write, exact2.125→1.375 quantity persistence,
  recipe ingredients/preparation, dashboard, filters, in-use category409,
  required deletion checkbox, deletion and logout. It waits for the original
  fade-in animation before screenshots; no appearance claim is based on a
  screenshot taken during the animation.
- Chromium at **1280×900, 390×844, 320×740**: seven business screens, working mobile
  menu, Inter loaded locally, exact original green600 RGB(22,163,74), critical
  background RGB(254,242,242), no page horizontal overflow (wide table scrolls
  within its region), page errors, CSP violations or external requests. Inspected
  desktop dashboard, mobile inventory and final320px recipe screenshots.
  Harness/traces/screenshots stay ignored under work/, not published artifacts.
- `npm audit --omit=dev --audit-level=high`: **0 vulnerabilities reported** at
  check time; not a blanket security assertion. `git diff --check` and explicit
  new-file trailing-whitespace/final-newline checks PASS.
- Final targeted queries: **0 temporary auth/business/browser users**, **0 test-*
  companies**, **0 sessions** in both databases; demo company count development1,
  test0. Both MySQL containers running/healthy. The verified app remains running
  for inspection. Development was not reset or replaced by the test database.

### Completion and remaining gates

- Phase 3: **IN_PROGRESS → DONE (local implementation/verification)**. All
  required business features above are real persisted behavior, not mock screens.
- Actual forwarded Codespaces HTTPS acceptance of the new screens is pending;
  inherited owner acceptance of Phases 1–2 does not assert acceptance of Phase 3.
  Complete contrast/accessibility review, performance and academic delivery stay
  Phase 5. Chat/navigation/live notifications and socket tests stay Phase 4.
- No sub-agents, remote writes, commits, PRs, merge, deployment or release tag
  were performed in this session. Changes remain local for review/publication.
- Next pending task: authenticated Socket.IO handshake and tenant-scoped general
  chat on the same HTTP server, then persisted history/presence/notifications.

## Phase 3 publication — 2026-11-07

- Explicit owner request: push the Phase 3 branch and create a PR. **DONE**.
- Repository: `A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas`; remote default
  branch verified as `main`. Fresh fetch: local base and origin/main both
  `bedcdc1`; no existing PR found for `codex/phase-3-business`.
- Pre-publication regression: `npm test` **41/41 PASS** (796ms),
  `npm run test:db` **42/42 PASS** (18.58s); test migrations already up to date.
- Staged review: 36 application/test/documentation files; whitespace check PASS;
  no private .env values, source attachments, work/ harness/screenshots, generated
  Prisma or compiled CSS included. Existing legacy CSS remains unchanged.
- Publish as draft against main because actual Codespaces HTTPS acceptance of
  Phase 3 remains pending. No merge is requested by the publication instruction.
- Implementation commit `dea63e1d34c40697fcdcc7b4588ba0d26451eb2c` created;
  `git push -u origin codex/phase-3-business` succeeded. `git ls-remote` matched
  the full local commit SHA, confirming the remote branch received the code.
- Draft [PR #3](https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas/pull/3)
  created against `main` with an impersonal Spanish description, original-style
  preservation, 83-test/native-browser evidence and the pending Codespaces check.
  GitHub confirmed open, draft and unmerged with the expected implementation head.
- This documentation follow-up records the verified publication outcome; no runtime,
  dependency, schema or test changes follow the successful pre-push regression.
- The implementation push succeeded, but the CLI later stopped obtaining GitHub
  credentials (`could not read Username`) while sending this documentation-only
  follow-up. The publication record is completed through the connected GitHub API;
  no credentials were requested from the owner or printed.

## Phase 4 — current continuation (2026-11-07)

- Remote reconciliation DONE: clean local `work` at `bedcdc1` was behind freshly fetched `origin/main` by the Phase 3 implementation/publication/merge commits. Fast-forwarded to `2d49858` (merged PR #3). Corrected the stale top-level claim that PR #3 was still draft/unmerged; historical entries retain their original context. Read AGENTS/specification/migration plan and inspected relevant source/tests before edits.
- Runtime restored without assuming historical containers/secrets: private setup, locked dependency installation, build/schema validation, independent tests **41/41 PASS**, isolated real MySQL integration **42/42 PASS**. Existing Phase 3 functionality matches the completed checklist and owner's statement.
- IN_PROGRESS: added Socket.IO server/client dependencies, shared persistent session middleware, authenticated General room/history/presence, strict event validation, connection/event limits, session revocation rechecks, company inventory notifications and EJS/client UI/navigation.
- First Phase 4 automated regression: **43 independent + 55 integration = 98 PASS**. Browser then exposed a missing-Origin polling handshake: Chromium omits Origin on same-origin polling GETs. Corrected only this case using browser `Sec-Fetch-Site:same-origin` plus transport=polling; token/session checks remain mandatory and foreign/opaque origins remain rejected. Added regressions and active-transport shutdown coverage; browser and final suites pending rerun.


### Phase 4 completion and final evidence

- **IN_PROGRESS → DONE (local implementation and verification).** No database migration required: existing tenant FKs and chat-history index reused. Added Socket.IO 4.8.4 runtime and socket.io-client 4.8.4 test dependencies with lockfile; no SPA, external messaging provider or second process.
- Final clean installation: `npm ci` **329 packages**, `npm run build` **PASS** (Prisma 7.10.1 + local Tailwind 4.3.5), `npm run db:validate` **PASS**. `npm test` **43/43 PASS** (990ms); `npm run test:db` **56/56 PASS** (20.94s), four integration files. Existing startup/SIGTERM/unavailable-database, auth and business regressions remain green. Test migration deployment reports no pending migrations.
- New integration coverage: actual clients use the real HTTP server and persistent signed sessions, not simulated sockets. Anonymous/cookie/token/origin rejection, room/cursor/company/identity isolation, two-user live exchange, persistence/reconnect, 105-row stable history, XSS/length/control validation, presence/tabs, polling with browser-like missing Origin, per-user limits, logout/expiry/version revocation, CRUD notifications, simulated persistence failure without disclosure or broadcast, and active socket/server shutdown all pass.
- Final `node work/phase4-browser.mjs` **PASS** against the production entry and real development MySQL: two same-company people plus a third company, native login, live messages, HTML rendered as inert text, persisted history after reload, live near-expiry notice without reload, company isolation and logout/presence. Viewports **1280×900, 390×844 and 320×740**, local Inter, no horizontal overflow, page errors, CSP violations or external HTTP requests. Desktop/narrow screenshots visually inspected; legacy CSS unchanged.
- Final `node work/phase4-https-browser.mjs` **PASS** with real Chromium → loopback HTTPS proxy rewriting Origin → HTTP Express/Socket.IO → isolated test MySQL. Same three-user flow passes; **Secure/HttpOnly cookies and wss upgrade observed**, no CSP/page/external-request errors. The disposable self-signed certificate is trusted only by the local test browser context; no global TLS verification was disabled. Harnesses/certificates/screenshots remain ignored in work/. This is local proxy evidence, not a remote Codespaces result.
- `npm audit --omit=dev --audit-level=high`: **0 vulnerabilities reported** at check time; not a blanket security guarantee. `git diff --check` passes. README and auth/data-model/business/migration docs updated; REALTIME.md explains protocol, origin handling, revocation, history, limits, shutdown and demonstration steps.
- Final targeted DB checks: development/test contain **0 temporary users/companies and 0 sessions**; development retains **1 demo company**, test **0**. An anonymous redirect session missed by the first new regression was identified by that run's narrow expiry interval and removed; the fixture now explicitly tracks it. No development reset or original SQL executed. Both Compose MySQL containers are healthy.
- Final fresh fetch confirms committed HEAD = origin/main = `2d49858` with ahead/behind **0/0**. All new code/tests/docs remain local and uncommitted. No push, PR creation, merge, deployment or release tag performed. Actual forwarded Codespaces HTTPS/wss acceptance, performance, complete accessibility/security review and academic delivery remain Phase 5.


## Phase 4 publication — 2026-11-07

- Explicit owner request: push Phase 4 and open a PR against the remote. **DONE**.
- Fresh fetch confirms `origin/main` at `2d49858`, the verified implementation base. Local branch `codex/phase-4-realtime` created; no existing remote branch or open PR with that head found. Repository default branch is main.
- The 99-test/build/schema/browser evidence immediately above belongs to this session and unchanged runtime source. Publication changes documentation only; no repeated test result is invented.
- Commit `8430ecf6bbc252c85bcce427738e9b1e4b0e7552` created with 23 implementation/test/documentation files. Staged whitespace and private-environment-value/artifact checks PASS; no .env, work/ fixtures/certificates/screenshots, generated assets or dependencies included.
- `git push -u origin codex/phase-4-realtime` succeeded; `git ls-remote` returned the exact full implementation SHA. The local branch tracks origin/codex/phase-4-realtime.
- Draft [PR #4](https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas/pull/4) created against main, titled “Implementar fase 4: chat autenticado y avisos de inventario”. GitHub confirmed open/draft/unmerged with the expected head and base. The description records 99-test/native-browser evidence, actual local proxy/wss scope and the pending remote Codespaces acceptance.
- This documentation-only follow-up records the successful publication; runtime/dependencies/tests remain unchanged after the verified implementation commit. No merge, deployment or release tag performed. Phase 5 remains next.


## Phase 4 owner acceptance and merge authorization — 2026-11-07

- The owner explicitly stated “doy por finalizada la fase 4” and requested immediate merge and an updated environment. This closes the Phase 4 acceptance gate; no further confirmation is required.
- Before changes: clean local feature branch and remote PR head both `d6b9c07426fe69c39d43c005bd53fe08e4174095`; remote main `2d49858`. PR #4 open/draft and mergeable, no conflicts. No remote statuses or workflow runs were reported. The existing 99-test/browser result remains valid for unchanged runtime code.
- The checkout's fetch configuration tracks main only; explicitly fetched the Phase 4 branch to verify its head. Application `/ready` returns ready/database up. Acceptance documentation is published before removing draft status and merging with an expected-head check.
- Owner acceptance is recorded as acceptance, not an invented agent-run capture of remote Codespaces traffic. Detailed remote traces may still be collected for Phase 5 defense evidence; they no longer block Phase 4 or this authorized merge.


### Phase 4 merge and environment synchronization — DONE

- Acceptance commit `8a29be677e1424f7f837f10d83c3c69b5aa1e685` pushed to the feature branch; PR description updated with the owner's closure. Draft status removed. Merge executed with that exact expected head, preserving protection against concurrent changes.
- GitHub confirmed **merged:true**, merge commit **`da6e1141989cc0898a79427d30e5746130d5a3df`** for [PR #4](https://github.com/A-PerfectStranger/Food-Waste-Fighter-WebAvanzadas/pull/4).
- Fetched new origin/main and created local main tracking it; the working tree was clean. Comparison of src, package/lockfile, Prisma, scripts and tests against the accepted feature head is empty. The environment already contains the verified dependencies/generated assets and running Phase 4 code, so no unnecessary reinstall/restart or repeat of unchanged tests is claimed.
- Updated README, protocol/migration notes and this current-state record to reflect acceptance/merge. The owner's acceptance closes the Phase 4 gate; any detailed remote evidence collected later belongs to the Phase 5 defense. No remote trace is invented, no data reset, deployment or release tag performed.

- Final environment checks: `npm ls --omit=dev --depth=0` PASS; development/test MySQL containers both healthy; `/ready` returns `{status:ready,database:up}`. Post-merge documentation whitespace check PASS.
