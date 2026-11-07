import 'dotenv/config';
import { spawnSync } from 'node:child_process';

// Validate before issuing any migration command; never fall back to DATABASE_URL.
const testUrl = process.env.TEST_DATABASE_URL;
const developmentUrl = process.env.DATABASE_URL;
const test = new URL(testUrl);
const development = new URL(developmentUrl);
const databaseName = decodeURIComponent(test.pathname.slice(1));
if (test.protocol !== 'mysql:' || !databaseName.endsWith('_test') ||
    decodeURIComponent(development.pathname.slice(1)) === databaseName) {
  throw new Error('Refusing integration tests: use a separate MySQL database ending in _test.');
}
const env = { ...process.env, NODE_ENV: 'test', DATABASE_URL: testUrl, TEST_DATABASE_URL: testUrl };
for (const args of [
  ['prisma', 'migrate', 'deploy'],
  ['vitest', 'run', 'tests/database.integration.test.js', 'tests/auth.integration.test.js'],
]) {
  const result = spawnSync('npx', ['--no-install', ...args], { env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
