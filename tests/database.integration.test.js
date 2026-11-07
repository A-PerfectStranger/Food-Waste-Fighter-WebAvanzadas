import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
import { createDatabase, checkDatabase } from '../src/config/database.js';
import { parseEnv } from '../src/config/env.js';
import { createApp } from '../src/app.js';

// Defense in depth: direct vitest invocation must also fail closed.
const url = new URL(process.env.DATABASE_URL);
if (process.env.NODE_ENV !== 'test' ||
    process.env.DATABASE_URL !== process.env.TEST_DATABASE_URL ||
    !decodeURIComponent(url.pathname).endsWith('_test')) {
  throw new Error('Run npm run test:db with an isolated *_test database.');
}
const database = createDatabase(url.href);
const createdIds = [];
afterAll(async () => {
  try {
    if (createdIds.length) await database.company.deleteMany({ where: { id: { in: createdIds } } });
  } finally {
    await database.$disconnect();
  }
});

describe('real MySQL/Prisma Phase 1 bootstrap', () => {
  it('checks MySQL through the HTTP readiness endpoint', async () => {
    const config = parseEnv(process.env);
    const app = createApp({ config, checkDatabase: () => checkDatabase(database) });
    const response = await request(app).get('/ready');
    expect(response.status).toBe(200);
    expect(response.body.database).toBe('up');
  });
  it('persists and reads a fictional company, including unicode', async () => {
    const id = `test-${randomUUID().slice(0, 20)}`;
    createdIds.push(id);
    await database.company.create({ data: { id, name: 'Cafetería de prueba 🌱' } });
    const stored = await database.company.findUnique({ where: { id } });
    expect(stored.name).toBe('Cafetería de prueba 🌱');
    expect(stored.createdAt).toBeInstanceOf(Date);
  });
  it('enforces primary-key uniqueness in MySQL', async () => {
    const id = `test-${randomUUID().slice(0, 20)}`;
    createdIds.push(id);
    await database.company.create({ data: { id, name: 'Primera' } });
    await expect(database.company.create({ data: { id, name: 'Duplicada' } })).rejects.toMatchObject({ code: 'P2002' });
  });
});
