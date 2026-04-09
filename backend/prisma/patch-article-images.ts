import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Assign a real candidate image to each article
const imageMap: Record<string, string> = {
  'ultimate-guide-to-puppy-nutrition':       '/_candidates/06_photo-1450778869180-41d0601e046e.jpg',
  'indoor-cat-enrichment-ideas':             '/_candidates/094_photo-1537151608828-ea2b11777ee8.jpg',
  'best-dog-harnesses-2026':                 '/_candidates/25_photo-1530281700549-e82e7bf110d6.jpg',
  'best-aquarium-filters-beginners':         '/_candidates/68_photo-1560809451-9e77c2e8214a.jpg',
  'royal-canin-vs-hills-science-plan':       '/_candidates/02_photo-1509205477838-a534e43a849f.jpg',
  'paper-bedding-vs-wood-shavings-small-pets': '/_candidates/40_photo-1504579264001-833438f93df2.jpg',
  'uk-pet-food-regulations-2026-update':     '/_candidates/10_photo-1573435567032-ff5982925350.jpg',
  'smart-pet-tech-trends-2026':              '/_candidates/09_photo-1592194996308-7b43878e84a6.jpg',
};

async function main() {
  console.log('Patching article hero images...');

  for (const [slug, heroImage] of Object.entries(imageMap)) {
    const result = await prisma.article.updateMany({
      where: { slug },
      data: { heroImage },
    });
    console.log(`  ${slug}: ${result.count === 1 ? 'updated' : 'not found'}`);
  }

  console.log('Done.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
