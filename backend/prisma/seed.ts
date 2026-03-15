import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ── Delete existing data (order matters due to FK constraints) ──
  await prisma.analytics.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('Existing data cleared.');

  // ── Admin user ──
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.user.create({
    data: {
      email: 'admin@petgearhub.com',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created: admin@petgearhub.com');
  console.log('IMPORTANT: Change the default password immediately after first login!');

  // ── Categories ──
  const categoriesData = [
    { name: 'Dog Supplies',    slug: 'dog-supplies',      description: 'Top-rated food, toys, and gear for your canine companion.' },
    { name: 'Cat Products',    slug: 'cat-products',      description: 'Curated essentials and treats for happy, healthy cats.' },
    { name: 'Bird Supplies',   slug: 'bird-supplies',     description: 'Cages, feed, and accessories for birds of every feather.' },
    { name: 'Fish & Aquatics', slug: 'fish-and-aquatics', description: 'Tanks, filters, and supplies for thriving aquatic life.' },
    { name: 'Small Pets',      slug: 'small-pets',        description: 'Everything for rabbits, hamsters, guinea pigs, and more.' },
    { name: 'Pet Health',      slug: 'pet-health',        description: 'Supplements, grooming tools, and wellness products for all pets.' },
    { name: 'Pet Accessories', slug: 'pet-accessories',   description: 'Collars, carriers, beds, and everyday pet essentials.' },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }
  console.log(`${categoriesData.length} categories created.`);

  // ── Sample products ──
  const products = [
    {
      title: 'Blue Buffalo Life Protection Formula Adult Dog Food',
      slug: 'blue-buffalo-life-protection-adult-dog-food',
      description:
        'Premium dry dog food made with real chicken and wholesome grains. Supports healthy muscle development, immune system, and shiny coat for adult dogs of all breeds.',
      price: 54.99,
      originalPrice: 62.99,
      rating: 4.7,
      reviewCount: 18342,
      platform: 'amazon',
      images: [],
      affiliateLink: '#',
      pros: ['Great value', 'Pet-safe materials', 'Easy to clean'],
      cons: ['Assembly required'],
      status: 'PUBLISHED',
      featured: true,
      categoryId: createdCategories['dog-supplies'],
    },
    {
      title: 'Purina Pro Plan Adult Cat Food — Salmon & Rice Formula',
      slug: 'purina-pro-plan-adult-cat-food-salmon-rice',
      description:
        'Veterinarian-recommended dry cat food with real salmon as the #1 ingredient. Fortified with live probiotics for digestive and immune health, plus omega-6 fatty acids for a lustrous coat.',
      price: 49.98,
      originalPrice: 56.00,
      rating: 4.8,
      reviewCount: 22150,
      platform: 'amazon',
      images: [],
      affiliateLink: '#',
      pros: ['Great value', 'Pet-safe materials', 'Easy to clean'],
      cons: ['Assembly required'],
      status: 'PUBLISHED',
      featured: false,
      categoryId: createdCategories['cat-products'],
    },
    {
      title: 'Zesty Paws Multivitamin Chews for Dogs',
      slug: 'zesty-paws-multivitamin-chews-dogs',
      description:
        'All-in-one soft chew supplement supporting hip, joint, gut, skin, and immune health. Made with 8 functional ingredients including CoQ10, probiotics, and vitamins A, C & E. Suitable for all breeds and life stages.',
      price: 29.97,
      originalPrice: 34.99,
      rating: 4.6,
      reviewCount: 41088,
      platform: 'amazon',
      images: [],
      affiliateLink: '#',
      pros: ['Great value', 'Pet-safe materials', 'Easy to clean'],
      cons: ['Assembly required'],
      status: 'PUBLISHED',
      featured: false,
      categoryId: createdCategories['pet-health'],
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`${products.length} sample products created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
