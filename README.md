# Food Waste Fighter — Business Edition

Academic application for a fictional small cafeteria/restaurant that needs to reduce expired food, understand stock and coordinate employees. First-bimester target: one Node.js monolith with server-rendered views and its own WebSocket server.

**Current state:** Phase 1 complete. Full locked install/build, Prisma schema/migration, idempotent seed, 14 HTTP/configuration + 6 real MySQL integration tests, production startup/shutdown and desktop/mobile browser checks passed. Successful operation in GitHub Codespaces was confirmed by the project owner on 2026-11-07. Authentication, inventory, dashboard and chat remain pending. See [PROGRESS.md](PROGRESS.md) and [verification evidence](docs/PHASE1_VERIFICATION.md). This is not a completed bimester delivery.

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

These startup commands passed in the managed Cloud workspace. Successful operation in actual Codespaces was subsequently confirmed by the project owner; detailed Codespaces traces were not supplied.

`npm run setup:env` generates independent random database passwords, root passwords and a session secret into ignored `.env` with mode0600. It never overwrites an existing file. `.env.example` documents configuration without real credentials. Database URLs target containers published on the **Codespaces machine**, never a database on the student's computer.

The script derives APP_ORIGIN and TRUST_PROXY from Codespaces on first creation. If you move an existing `.env` into another Codespace, set APP_ORIGIN to the port3000 forwarded HTTPS URL and TRUST_PROXY=1; direct local HTTP uses TRUST_PROXY=0. No login/session or Socket.IO behavior exists yet, so forwarded HTTPS cookies, CSRF and two-tab wss remain future acceptance checks. Keep the forwarded port private while developing.

MySQL8.4 (the MySQL8 LTS line) stores development data in the `mysql_data` volume. `docker compose stop` preserves data. Do not remove volumes or run the original Java setup SQL. Changing passwords in `.env` does not change credentials already stored in an initialized volume; preserve the original values or perform an intentional database credential rotation.

### Verification provenance

Prisma generation, migrations, seed and startup passed with normal TLS/checksum verification. The official devcontainer CLI parsed the configuration. Image extraction in the managed executor encountered a disk-capacity limit; successful operation was subsequently confirmed separately in GitHub Codespaces by the project owner on 2026-11-07. No agent-run Codespaces rebuild is claimed. Session/CSRF/Socket.IO acceptance will follow implementation of those features.

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
tests/                  HTTP/configuration + real DB/seed/startup integration checks
```

Business modules will follow router → controller → service → repository boundaries within this same process. Socket.IO will attach to the HTTP server in Phase 4. The planned architecture is documented in [MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md), alongside the original architecture and feature mapping. Only Company exists in the current schema; the full tenant-safe relational model/ER diagram must precede authentication.

## Verification

```sh
npm run build:css         # independent of Prisma's engine download
npm test                 # foundation HTTP/configuration tests; no DB
npm run db:validate      # validates the Prisma schema
# Independent ephemeral test database, separate credentials and port3307:
docker compose --profile test up -d --wait mysql-test
npm run test:db           # migrate test DB; persistence, seed, startup/shutdown checks
```

The test runner refuses a non-MySQL URL, a database without `_test` suffix, or a database name shared with development. It never resets/deletes development tables. Test records have unique IDs and only those IDs are removed. The test container uses tmpfs, so its contents are disposable on container recreation; the development volume is separate. Do not expose port3306 or3307 through Codespaces.

Verified: 14 HTTP/configuration tests and 6 isolated real-MySQL tests, schema/migration/seed (twice with exactly one development demo company), clean test-data removal, full `npm start`, desktop/mobile rendering with real database readiness, clean SIGTERM exit and safe unavailable-DB startup failure without a listener. Run `npm run build` before integration checks so generated Prisma and CSS exist. An unavailable-DB startup can take about 10 seconds because adapter discovery and the readiness query each have a 5-second acquisition timeout. These foundation checks **do not** satisfy the guide's later auth/CRUD/chat testing requirements or establish actual Codespaces HTTPS behavior.

Scripts also include `npm run db:generate`, `npm run db:migrate:dev` (developer-generated future migrations), `npm run db:migrate` (apply reviewed migrations), `npm run db:seed`, `npm start`, and `npm run build`. Future migrations must not use destructive reset commands on development data.

## Academic context and attribution

Inputs: the user-supplied `Food_Waste_Fighter-main.zip` (Java17 Servlets/JSP/JPA/MySQL reference application) and `Guía del Proyecto AppWebAv.docx` (EPN Aplicaciones Web Avanzadas project guide). The original project's author, repository URL and reuse license were not supplied; the team must confirm attribution/permissions before redistributing original assets or recipe content. No original code/assets, plaintext accounts or SQL dump were copied into the new runtime. Only a synthetic Company bootstrap is seeded.

The first-bimester guide requires authentication/reset, protected principal screen, paginated CRUD, authenticated WebSockets/persistent history/presence/additional event, documented schema, security, at least five meaningful tests, performance evidence and a team defense. PROJECT_SPEC.md adds the restaurant-specific model, recipes, company isolation, Codespaces constraints and expanded documentation. All mandatory items are tracked in PROGRESS.md; none of the second-bimester architecture is being implemented now.

Team members and assigned roles: **pending team input** (4–5 members required). Public repository URL, evidence of each member's actual commits, presentation, performance results, final diagrams and `v1.0-b1` tag remain pending. No release tag has been created.

### Uso de IA / AI assistance

OpenAI Codex assisted with the source/guide audit, migration plan, phase checklist, foundation code and tests. Executed checks and limitations are recorded in PROGRESS.md. Team members must review, understand, test and be able to explain/modify assisted work during the defense; generated content is not evidence of a passing test or individual contribution.
