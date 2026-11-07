# Food Waste Fighter — Business Edition

Academic application for a fictional small cafeteria/restaurant that needs to reduce expired food, understand stock and coordinate employees. First-bimester target: one Node.js monolith with server-rendered views and its own WebSocket server.

**Current state:** Phase 1 foundation only. The original Java app and course guide were audited. Express/EJS, compiled Tailwind, configuration validation, MySQL Compose and foundation tests are present. Authentication, inventory, dashboard and chat are pending. Prisma client generation/migration/seed and full startup are **not verified** in the current managed environment: access to `binaries.prisma.sh` returns HTTP403. Do not treat this as a completed bimester delivery. See [PROGRESS.md](PROGRESS.md) for evidence, blockers and next tasks.

## Run entirely in GitHub Codespaces

No Node, MySQL, Docker or editor installation is required on your computer. Use GitHub in your browser:

1. Open this repository on GitHub → **Code → Codespaces → Create codespace** (or rebuild the container after these configuration changes).
2. The devcontainer uses the official `mcr.microsoft.com/devcontainers/javascript-node:5.2.5-24-bookworm` image, Docker-in-Docker and port3000. Its post-create hook creates a private `.env`, runs `npm ci`, generates Prisma and compiles CSS. If setup fails, read the command error and resolve it before continuing.
3. In the Codespaces terminal, use the commands below. They also allow retrying a failed post-create setup:

```sh
npm run setup:env
npm ci
npm run build
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

4. In the **Ports** panel, open port3000 in your browser. The server binds to `0.0.0.0`. `/health` checks HTTP liveness; `/ready` queries MySQL and returns 503 if it cannot connect. Startup requires a successful database query before listening. A green liveness endpoint alone is not proof that persistence works.

These are the intended startup steps; the Prisma-dependent steps remain blocked/unverified in this session. They must be rerun successfully before marking Phase 1 complete.

`npm run setup:env` generates independent random database passwords, root passwords and a session secret into ignored `.env` with mode0600. It never overwrites an existing file. `.env.example` documents configuration without real credentials. Database URLs target containers published on the **Codespaces machine**, never a database on the student's computer.

The script derives APP_ORIGIN and TRUST_PROXY from Codespaces on first creation. If you move an existing `.env` into another Codespace, set APP_ORIGIN to the port3000 forwarded HTTPS URL and TRUST_PROXY=1; direct local HTTP uses TRUST_PROXY=0. No login/session or Socket.IO behavior exists yet, so forwarded HTTPS cookies, CSRF and two-tab wss remain future acceptance checks. Keep the forwarded port private while developing.

MySQL8.4 (the MySQL8 LTS line) stores development data in the `mysql_data` volume. `docker compose stop` preserves data. Do not remove volumes or run the original Java setup SQL. Changing passwords in `.env` does not change credentials already stored in an initialized volume; preserve the original values or perform an intentional database credential rotation.

### Current environment blocker

The Prisma CLI needs an engine from `https://binaries.prisma.sh`. This managed environment denied that destination with HTTP403; the user chose to resolve access later. No TLS/checksum bypass or substitute migration was used. Once access is available, rerun `npm ci`, `npm run build`, `npm run db:validate`, `npm run db:migrate`, `npm run db:seed`, `npm run test:db`, and `npm start`, recording actual results in PROGRESS.md.

The devcontainer's multi-architecture image manifest was verified, but a full image fetch in this environment encountered a denied redirect to `westus.data.mcr.microsoft.com`. The devcontainer has not been built here; an actual Codespaces rebuild remains unverified. This is distinct from the healthy MySQL containers.

## Stack and layout

- Node.js24 LTS / JavaScript, Express5, EJS, HTML5 and locally compiled Tailwind.
- MySQL8.4 in Docker Compose, Prisma7.10.1 and matching MySQL-compatible driver adapter. Stable Prisma7 is pinned because the unqualified latest release currently resolves to an 8 release candidate.
- Zod environment validation, Helmet/CSP; Vitest and Supertest.
- Argon2id, persistent express-session, business validation/CSRF and Socket.IO are planned mandatory dependencies in their implementation phases.

```text
src/app.js              Express composition without opening a listener
src/server.js           Single HTTP listener, DB startup check and shutdown
src/config/             Environment validation and Prisma construction
src/modules/system/     Initial home, liveness and readiness routes
src/middleware/         Safe errors and 404 responses
src/views/              Server-rendered EJS views (escaped values)
src/styles/             Tailwind source; generated CSS is ignored
prisma/                 Company bootstrap schema, migration and fictional seed
scripts/                Non-overwriting env setup and isolated DB test runner
tests/                  HTTP/configuration tests + pending DB integration checks
```

Business modules will follow router → controller → service → repository boundaries within this same process. Socket.IO will attach to the HTTP server in Phase 4. The planned architecture is documented in [MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md), alongside the original architecture and feature mapping. Only Company exists in the current schema; the full tenant-safe relational model/ER diagram must precede authentication.

## Verification

```sh
npm run build:css         # independent of Prisma's engine download
npm test                 # foundation HTTP/configuration tests; no DB
npm run db:validate      # requires Prisma engine
# Independent ephemeral test database, separate credentials and port3307:
docker compose --profile test up -d --wait mysql-test
npm run test:db           # migrate test DB, then real Prisma integration checks
```

The test runner refuses a non-MySQL URL, a database without `_test` suffix, or a database name shared with development. It never resets/deletes development tables. Test records have unique IDs and only those IDs are removed. The test container uses tmpfs, so its contents are disposable on container recreation; the development volume is separate. Do not expose port3306 or3307 through Codespaces.

Verified so far: 14 foundation tests, CSS build, two healthy MySQL containers/authenticated queries, and desktop/mobile browser checks of Express/EJS with a deliberately unavailable database dependency. These foundation tests **do not** satisfy the guide's business-feature testing requirement. The three real Prisma integration tests are written but have not run. Browser-only checks do not establish full server startup, session handling, database persistence or forwarded HTTPS behavior.

Scripts also include `npm run db:generate`, `npm run db:migrate:dev` (developer-generated future migrations), `npm run db:migrate` (apply reviewed migrations), `npm run db:seed`, `npm start`, and `npm run build`. Future migrations must not use destructive reset commands on development data.

## Academic context and attribution

Inputs: the user-supplied `Food_Waste_Fighter-main.zip` (Java17 Servlets/JSP/JPA/MySQL reference application) and `Guía del Proyecto AppWebAv.docx` (EPN Aplicaciones Web Avanzadas project guide). The original project's author, repository URL and reuse license were not supplied; the team must confirm attribution/permissions before redistributing original assets or recipe content. No original code/assets, plaintext accounts or SQL dump were copied into the new runtime. Only a synthetic Company bootstrap is seeded.

The first-bimester guide requires authentication/reset, protected principal screen, paginated CRUD, authenticated WebSockets/persistent history/presence/additional event, documented schema, security, at least five meaningful tests, performance evidence and a team defense. PROJECT_SPEC.md adds the restaurant-specific model, recipes, company isolation, Codespaces constraints and expanded documentation. All mandatory items are tracked in PROGRESS.md; none of the second-bimester architecture is being implemented now.

Team members and assigned roles: **pending team input** (4–5 members required). Public repository URL, evidence of each member's actual commits, presentation, performance results, final diagrams and `v1.0-b1` tag remain pending. No release tag has been created.

### Uso de IA / AI assistance

OpenAI Codex assisted with the source/guide audit, migration plan, phase checklist, foundation code and tests. Executed checks and limitations are recorded in PROGRESS.md. Team members must review, understand, test and be able to explain/modify assisted work during the defense; generated content is not evidence of a passing test or individual contribution.
