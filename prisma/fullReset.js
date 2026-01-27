import 'dotenv/config';
import { execSync } from 'node:child_process';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('⚡ Starting full reset workflow...');

  // 1️⃣ Reset the database (drop tables and reapply migrations)
  console.log('🔹 Resetting database...');
  try {
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    console.log('✅ Database reset complete.');
  } catch (err) {
    console.error('❌ Error resetting database:', err);
    process.exit(1);
  }

  // 2️⃣ Seed database
  console.log('🔹 Seeding database...');
  try {
    execSync('node prisma/seed.js', { stdio: 'inherit' });
    console.log('✅ Seeding complete.');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }

  // 3️⃣ Test DB connection (optional)
  try {
    const usersCount = await prisma.user.count();
    console.log(`🟢 Users in DB: ${usersCount}`);
  } catch (err) {
    console.error('❌ DB test failed:', err);
  }

  // 4️⃣ Start server
  console.log('🔹 Starting server...');
  try {
    execSync('node src/server.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
