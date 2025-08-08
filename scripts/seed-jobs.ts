import { prisma } from '@/src/lib/prisma';

async function main() {
  await prisma.job.createMany({
    data: [
      {
        company: 'Freelance',
        title: 'SEO Content Specialist',
        location: 'Bengaluru',
        startDate: new Date('2023-01-01'),
        description: 'Wrote SEO articles, built keyword frameworks, leveraged AI-assisted outlines.'
      }
    ]
  });
  console.log('Seeded jobs');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
