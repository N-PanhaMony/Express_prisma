import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

// Create the same adapter as your prisma.js
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // 1️⃣ Create Users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // In real apps, hash passwords!
      role: 'ADMIN',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'bot1',
      email: 'bot1@example.com',
      password: 'bot123',
    },
  });

  // 2️⃣ Create Tags
  const tag1 = await prisma.tag.create({ data: { name: 'JavaScript' } });
  // 3️⃣ Create Posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Introduction to Node.js',
      slug: 'introduction-to-nodejs',
      content: 'Node.js is a runtime environment for JavaScript...',
      published: true,
      authorId: user1.id,
      tags: {
        create: [
          { tagId: tag1.id },
          { tagId: tag2.id },
        ],
      },
    },
  });


  // 4️⃣ Create Comments
  await prisma.comment.create({
    data: {
      content: 'Great article!',
      postId: post1.id,
      userId: user2.id,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
