import 'dotenv/config';
import { createDatabase } from '../src/config/database.js';

const database = createDatabase(process.env.DATABASE_URL);
try {
  await database.company.upsert({
    where: { id: 'demo-cafeteria' },
    update: {},
    create: {
      id: 'demo-cafeteria',
      name: 'Cafetería Semilla (ficticia)',
      description: 'Datos sintéticos para verificar la base del primer bimestre.',
    },
  });
  console.log('Fictional company seed completed (idempotent; no user credentials created).');
} catch {
  console.error('Seed failed. Check database availability and applied migrations.');
  process.exitCode = 1;
} finally {
  await database.$disconnect();
}
