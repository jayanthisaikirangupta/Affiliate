import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

function placeholderImg(text: string, w = 800, h = 800): string {
  const encoded = encodeURIComponent(text);
  return `https://placehold.co/${w}x${h}/FAF8F5/1B2B3A?text=${encoded}`;
}

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── Candidate product images ────────────────────────────────────────────────
const candidateImages = [
  '00_photo-1563460716037-460a3ad24ba9.jpg',
  '01_photo-1662261728536-910777a82ce4.jpg',
  '02_photo-1509205477838-a534e43a849f.jpg',
  '03_photo-1655306963086-a34411c0915b.jpg',
  '04_photo-1623387641168-d9803ddd3f35.jpg',
  '05_photo-1517105274840-437212774105.jpg',
  '06_photo-1450778869180-41d0601e046e.jpg',
  '07_photo-1546377791-2e01b4449bf0.jpg',
  '08_photo-1602979677071-1781b7f40023.jpg',
  '091_photo-1663762995548-f58dc4d3b2d2.jpg',
  '092_photo-1670752826047-5689584dfa93.jpg',
  '093_photo-1548546738-8509cb246ed3.jpg',
  '094_photo-1537151608828-ea2b11777ee8.jpg',
  '095_photo-1655210913074-e5c7f651bc46.jpg',
  '096_photo-1601758228006-964e41e5e8eb.jpg',
  '097_photo-1591324535489-9c78376631dc.jpg',
  '098_photo-1740237789430-dd6070442d98.jpg',
  '099_photo-1719920073266-692aee483819.jpg',
  '09_photo-1592194996308-7b43878e84a6.jpg',
  '100_photo-1716657905439-1402ee3b2c7b.jpg',
  '101_photo-1705056464396-ab8b09f1be93.jpg',
  '102_photo-1719985814093-87e49f975403.jpg',
  '103_photo-1648160563445-86981b598049.jpg',
  '104_photo-1699907769321-c7b69b2087b5.jpg',
  '105_photo-1707717578873-d495ff1ca7ea.jpg',
  '106_photo-1681490443131-1e9e559d90bb.jpg',
  '107_photo-1646361950082-1d8025cd61e5.jpg',
  '108_photo-1652631901064-68cead77e8c9.jpg',
  '109_photo-1722553777990-2a2563215ca9.jpg',
  '10_photo-1573435567032-ff5982925350.jpg',
  '110_photo-1721902121173-7e166d7c74e8.jpg',
  '111_photo-1688335447736-b63946d97158.jpg',
  '112_photo-1623332965002-654cf9046901.jpg',
  '113_photo-1688124436850-fe6f20004d18.jpg',
  '114_photo-1643294267625-ed93811edccf.jpg',
  '115_photo-1734322901968-6b92338f3864.jpg',
  '116_photo-1716275665845-766cf3998303.jpg',
  '117_photo-1709362982682-f51be543b533.jpg',
  '118_photo-1713787878288-02884e63b46a.jpg',
  '119_photo-1635405694438-5e99213e2db0.jpg',
  '11_photo-1504595403659-9088ce801e29.jpg',
  '120_photo-1710193939823-bfc065f5dca8.jpg',
  '121_photo-1652964307477-ffff2d16e529.jpg',
  '122_photo-1701155381873-a755839ede69.jpg',
  '123_photo-1695780956718-bb5c4c44dfe2.jpg',
  '124_photo-1706582356299-0f83416949f5.jpg',
  '125_photo-1615477100336-fae5eff7653e.jpg',
  '126_photo-1716632285460-9300aada93b9.jpg',
  '127_photo-1721902187342-ab4e59f36d9b.jpg',
  '128_photo-1494913148647-353ae514b35e.jpg',
  '129_photo-1507682520764-93440a60e9b5.jpg',
  '12_photo-1755612143839-0bed6167376e.jpg',
  '130_photo-1762389706423-8d5058fd8167.jpg',
  '131_photo-1548199973-03cce0bbc87b.jpg',
  '132_photo-1700408273757-b3e190a2dfa2.jpg',
  '133_photo-1558618047-f4b511aae74d.jpg',
  '134_photo-1529472119196-cb724127a98e.jpg',
  '135_photo-1759704897042-dd4ef18695f1.jpg',
  '136_photo-1542715234-4bafcfc68bd9.jpg',
  '137_photo-1643786260462-8acc5e4fb89c.jpg',
  '138_photo-1655970579239-65336a3529af.jpg',
  '139_photo-1655970570600-5416b8abaf94.jpg',
  '13_photo-1591946614720-90a587da4a36.jpg',
  '140_photo-1726581262012-c29b3dbb6278.jpg',
  '141_photo-1728230293543-3d6097917f75.jpg',
  '14_photo-1558041042-c80ca522a949.jpg',
  '15_photo-1665603287514-ec5189300054.jpg',
  '16_photo-1615959417429-2140a2df2b7d.jpg',
  '17_photo-1623496996842-f97fa2567f9b.jpg',
  '18_photo-1609074405294-355851aead3e.jpg',
  '19_photo-1560114928-40f1f1eb26a0.jpg',
  '20_photo-1519134991647-f069322dfe22.jpg',
  '21_photo-1718488978779-df2a39884775.jpg',
  '22_photo-1756661056921-e94416aeb968.jpg',
  '23_photo-1570117267998-63272030c1c3.jpg',
  '24_photo-1636669761941-2c2df722fc4e.jpg',
  '25_photo-1530281700549-e82e7bf110d6.jpg',
  '26_photo-1658450976114-84f8e7b3779e.jpg',
  '27_photo-1685398254606-14f977901ba1.jpg',
  '28_photo-1708931565847-b5533c424f92.jpg',
  '29_photo-1743506444918-ac7fb9fdcfa2.jpg',
  '30_photo-1674976006468-dec601ce3383.jpg',
  '31_photo-1686308346757-5c86f02fbb61.jpg',
  '32_photo-1499995909106-2d6741de64ec.jpg',
  '33_photo-1544923408-75c5cef46f14.jpg',
  '34_photo-1751906380892-8b95090cc797.jpg',
  '35_photo-1710646434776-777e5fc59e64.jpg',
  '36_photo-1616902509409-a624c4f31a56.jpg',
  '37_photo-1612024782955-49fae79e42bb.jpg',
  '38_photo-1695575722899-5a70bdf2b5a3.jpg',
  '39_photo-1633349071750-994ca3cef3b8.jpg',
  '40_photo-1504579264001-833438f93df2.jpg',
  '41_photo-1730274632098-ce29a66509c2.jpg',
  '42_photo-1728464483083-7ead32efc024.jpg',
  '43_photo-1601422931998-d14d7f0236df.jpg',
  '44_photo-1512819432727-dbcb57a06f13.jpg',
  '45_photo-1511823991948-4d877be80581.jpg',
  '46_photo-1632650227998-b08b6077056b.jpg',
  '47_photo-1671767055556-019ec44fee79.jpg',
  '48_photo-1604826010917-65cf53d6249b.jpg',
  '49_photo-1555169062-013468b47731.jpg',
  '50_photo-1592089416462-2b0cb7da8379.jpg',
  '51_photo-1738464883261-c79b0aca975e.jpg',
  '52_photo-1745248135017-2335dfd2d6cf.jpg',
  '53_photo-1743228729856-ea10bc957b53.jpg',
  '54_photo-1757162302334-2fcb385411b2.jpg',
  '55_photo-1763838022516-a07ebebbf9e6.jpg',
  '56_photo-1527158794612-2e1d08ce8c92.jpg',
  '57_photo-1574068468668-a05a11f871da.jpg',
  '58_photo-1566650554919-44ec6bbe2518.jpg',
  '59_photo-1602491453631-e2a5ad90a131.jpg',
  '60_photo-1638593760531-9d94cf92234e.jpg',
  '61_photo-1674848134512-f3cbf3f8c9bb.jpg',
  '62_photo-1452570053594-1b985d6ea890.jpg',
  '63_photo-1699488169253-3e6dfa960947.jpg',
  '64_photo-1607274134639-043342705e6f.jpg',
  '65_photo-1726589229426-f0574e4987ab.jpg',
  '66_photo-1611083616600-d3fdc4198aa6.jpg',
  '67_photo-1726401579919-3cdd11d3555b.jpg',
  '68_photo-1560809451-9e77c2e8214a.jpg',
  '69_photo-1604165094771-7af34f7fd4cd.jpg',
  '70_photo-1534759846116-5799c33ce22a.jpg',
  '71_photo-1544985361-b420d7a77043.jpg',
  '72_photo-1594592237655-9f7e51330b93.jpg',
  '73_photo-1558788353-f76d92427f16.jpg',
  '74_photo-1638649601665-ba54b44fed4c.jpg',
  '75_photo-1647963687902-288080f94eed.jpg',
  '76_photo-1736351131671-151b588b4015.jpg',
  '77_photo-1725035390180-13b1d2cca4b4.jpg',
  '78_photo-1599407987759-5a166f1b60ae.jpg',
  '79_photo-1729615585935-9bc21bfb4a54.jpg',
  '80_photo-1601701696919-7ab959201abb.jpg',
  '81_photo-1738776932385-fddeaea36233.jpg',
  '82_photo-1600047598132-4883734192cf.jpg',
  '83_photo-1589924774770-052457510b14.jpg',
  '84_photo-1736103234554-7852481bfcfa.jpg',
  '85_photo-1656910210278-37697901ccdb.jpg',
  '86_photo-1533743983669-94fa5c4338ec.jpg',
  '87_photo-1735596139866-50b074860c54.jpg',
  '88_photo-1546977682-2ef6aee8e5fa.jpg',
  '89_photo-1589933767411-38a58367efd7.jpg',
  '90_photo-1654895716780-b4664497420d.jpg',
];
let imageIdx = 0;
function nextCandidateImage(): string {
  return `/_candidates/${candidateImages[imageIdx++ % candidateImages.length]}`;
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─── User Data ──────────────────────────────────────────────────────────────

interface UserSeed {
  email: string;
  password: string;
  role: string;
}

const usersData: UserSeed[] = [
  { email: 'admin@petgearhub.com', password: 'Admin!Secure2026', role: 'ADMIN' },
  { email: 'sarah.editor@petgearhub.com', password: 'Editor!Pass2026', role: 'EDITOR' },
  { email: 'james.editor@petgearhub.com', password: 'Editor!Pass2026', role: 'EDITOR' },
];

// ─── Category Data ──────────────────────────────────────────────────────────

const categoriesData = [
  {
    name: 'Dog Supplies',
    slug: 'dog-supplies',
    description: 'Top-rated food, toys, and gear for your canine companion.',
    image: placeholderImg('Dog+Supplies', 1200, 600),
  },
  {
    name: 'Cat Products',
    slug: 'cat-products',
    description: 'Curated essentials and treats for happy, healthy cats.',
    image: placeholderImg('Cat+Products', 1200, 600),
  },
  {
    name: 'Bird Supplies',
    slug: 'bird-supplies',
    description: 'Cages, feed, and accessories for birds of every feather.',
    image: placeholderImg('Bird+Supplies', 1200, 600),
  },
  {
    name: 'Fish & Aquatics',
    slug: 'fish-and-aquatics',
    description: 'Tanks, filters, and supplies for thriving aquatic life.',
    image: placeholderImg('Fish+Aquatics', 1200, 600),
  },
  {
    name: 'Small Pets',
    slug: 'small-pets',
    description: 'Everything for rabbits, hamsters, guinea pigs, and more.',
    image: placeholderImg('Small+Pets', 1200, 600),
  },
  {
    name: 'Pet Health',
    slug: 'pet-health',
    description: 'Supplements, grooming tools, and wellness products for all pets.',
    image: placeholderImg('Pet+Health', 1200, 600),
  },
  {
    name: 'Pet Accessories',
    slug: 'pet-accessories',
    description: 'Collars, carriers, beds, and everyday pet essentials.',
    image: placeholderImg('Pet+Accessories', 1200, 600),
  },
];

// ─── Product Data ───────────────────────────────────────────────────────────

interface ProductSeed {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  platform: string;
  pros: string[];
  cons: string[];
  brand: string;
  petType: string;
  subCategory: string;
  tags: string[];
  featured?: boolean;
  isStaffPick?: boolean;
  isDeal?: boolean;
  dealExpiry?: Date;
  aiSummary: string;
  specs: Record<string, string>;
}

// --- Dog Supplies ---
const dogProducts: ProductSeed[] = [
  {
    title: 'Royal Canin Medium Adult Dry Dog Food 15kg',
    description: 'Tailored nutrition for medium-sized dogs aged 1-7 years. Contains an exclusive blend of nutrients to support natural defences and maintain a healthy digestive system.',
    price: 52.99, originalPrice: 59.99, rating: 4.8, reviewCount: 24530, platform: 'amazon',
    pros: ['Breed-specific nutrition', 'Excellent for digestion', 'High-quality protein sources', 'Veterinarian recommended'],
    cons: ['Premium price point', 'Only available in large bags'],
    brand: 'Royal Canin', petType: 'dog', subCategory: 'Dry Food', tags: ['dog-food', 'dry-food', 'medium-breed', 'adult'],
    featured: true, isStaffPick: true,
    aiSummary: 'A veterinarian-recommended dry food tailored for medium-breed adult dogs with excellent digestive support.',
    specs: { Weight: '15kg', 'Life Stage': 'Adult (1-7 years)', 'Breed Size': 'Medium (11-25kg)', 'Key Ingredient': 'Dehydrated Poultry Protein', 'Calories': '3,780 kcal/kg' },
  },
  {
    title: 'Purina Pro Plan Adult Dog Food Chicken & Rice',
    description: 'High-protein formula with real chicken as the first ingredient. Fortified with live probiotics for digestive and immune health, plus guaranteed levels of vitamin A and linoleic acid.',
    price: 44.99, originalPrice: 49.99, rating: 4.7, reviewCount: 18920, platform: 'amazon',
    pros: ['Live probiotics included', 'High protein content', 'Great taste dogs love', 'Supports immune health'],
    cons: ['Contains grains', 'Not suitable for puppies'],
    brand: 'Purina', petType: 'dog', subCategory: 'Dry Food', tags: ['dog-food', 'dry-food', 'chicken', 'probiotics'],
    aiSummary: 'A probiotic-enriched chicken and rice formula delivering high protein and immune system support for adult dogs.',
    specs: { Weight: '12kg', 'Protein Content': '26%', 'Key Feature': 'Live Probiotics', 'Life Stage': 'Adult', 'Flavour': 'Chicken & Rice' },
  },
  {
    title: 'KONG Classic Dog Toy Large',
    description: 'The gold standard of durable dog toys, made from unique natural rubber formula. Perfect for stuffing with treats to keep dogs mentally stimulated and satisfy their instinctual needs.',
    price: 11.99, originalPrice: 14.99, rating: 4.8, reviewCount: 48200, platform: 'amazon',
    pros: ['Extremely durable', 'Can be stuffed with treats', 'Dishwasher safe', 'Veterinarian recommended'],
    cons: ['Power chewers may destroy it quickly'],
    brand: 'KONG', petType: 'dog', subCategory: 'Toys', tags: ['dog-toy', 'chew-toy', 'interactive', 'durable'],
    featured: true, isStaffPick: true,
    aiSummary: 'The iconic KONG Classic is an ultra-durable rubber toy that can be stuffed with treats for hours of enrichment.',
    specs: { Size: 'Large (fits dogs 13-30kg)', Material: 'Natural Rubber', 'Dishwasher Safe': 'Yes', Colour: 'Red', 'Recommended For': 'Average Chewers' },
  },
  {
    title: "Nylabone DuraChew Textured Ring Flavoured Chew Toy",
    description: 'Designed for powerful chewers, this ring-shaped nylon toy features a textured surface that helps clean teeth and control plaque and tartar build-up. Flavoured throughout for long-lasting appeal.',
    price: 8.49, originalPrice: 10.99, rating: 4.3, reviewCount: 12400, platform: 'amazon',
    pros: ['Great for aggressive chewers', 'Helps clean teeth', 'Long-lasting flavour'],
    cons: ['Not edible if pieces break off', 'May be too hard for puppies'],
    brand: 'Nylabone', petType: 'dog', subCategory: 'Toys', tags: ['dog-toy', 'chew-toy', 'dental', 'durable'],
    aiSummary: 'A tough nylon chew toy with dental benefits, designed specifically for powerful chewing dogs.',
    specs: { Size: 'Large', Material: 'Nylon', Flavour: 'Chicken', 'Dental Benefit': 'Plaque & Tartar Control', 'Recommended For': 'Power Chewers' },
  },
  {
    title: 'Vet Bed Premium Non-Slip Fleece Dog Bed',
    description: 'Professional-grade veterinary bedding used by breeders, kennels, and vet practices across the UK. Warm, hygienic, and machine washable with a non-slip rubber backing to keep it securely in place.',
    price: 34.99, originalPrice: 42.99, rating: 4.6, reviewCount: 8950, platform: 'amazon',
    pros: ['Machine washable at 40C', 'Non-slip rubber backing', 'Used by veterinary professionals', 'Quick drying'],
    cons: ['No raised edges for dogs who like to nest', 'Attracts hair'],
    brand: 'Vet Bed', petType: 'dog', subCategory: 'Beds', tags: ['dog-bed', 'fleece', 'washable', 'non-slip'],
    isDeal: true, dealExpiry: daysAgo(-14),
    aiSummary: 'Professional-grade fleece bedding trusted by vets and breeders, offering warmth, hygiene, and easy washing.',
    specs: { Size: '100cm x 75cm', Material: 'Polyester Fleece', Backing: 'Non-Slip Rubber', 'Washing': 'Machine Washable 40C', Thickness: '28mm' },
  },
  {
    title: 'Ruffwear Front Range Everyday Dog Harness',
    description: 'A padded, easy-to-fit everyday harness with two lead attachment points. The front clip discourages pulling while the back clip is great for casual walks. Four points of adjustment for a customised fit.',
    price: 39.95, originalPrice: 44.95, rating: 4.7, reviewCount: 15600, platform: 'amazon',
    pros: ['Two lead attachment points', 'Padded chest and belly panel', 'Reflective trim for visibility', 'ID pocket included'],
    cons: ['Sizing can be tricky between ranges', 'Premium price for a harness'],
    brand: 'Ruffwear', petType: 'dog', subCategory: 'Harnesses & Leads', tags: ['harness', 'walking', 'no-pull', 'reflective'],
    isStaffPick: true,
    aiSummary: 'A premium padded harness with dual attachment points and reflective trim, ideal for everyday adventures.',
    specs: { 'Size Range': 'S-XL (56-81cm girth)', 'Lead Points': '2 (Front & Back)', Material: 'Bluesign-Approved Fabric', 'Reflective': 'Yes', Weight: '227g' },
  },
  {
    title: 'Halti Optifit Headcollar',
    description: 'Ergonomically designed head collar that provides gentle and effective control for dogs that pull on the lead. Features a unique OptiLock adjustment system for a perfect fit every time.',
    price: 14.99, originalPrice: 17.99, rating: 4.2, reviewCount: 6700, platform: 'amazon',
    pros: ['Stops pulling immediately', 'Padded noseband for comfort', 'Safety link included'],
    cons: ['Dogs need adjustment period', 'Not suitable for brachycephalic breeds'],
    brand: 'Halti', petType: 'dog', subCategory: 'Harnesses & Leads', tags: ['headcollar', 'walking', 'training', 'no-pull'],
    aiSummary: 'A gentle head collar with padded noseband that provides immediate control for dogs that pull.',
    specs: { 'Size Range': 'Size 1-5', 'Adjustment': 'OptiLock System', 'Padded': 'Yes - Noseband & Cheek Straps', 'Safety Link': 'Included', Material: 'Nylon Webbing' },
  },
  {
    title: 'Slow Feeder Dog Bowl Maze Design',
    description: 'Non-slip interactive puzzle bowl that slows down fast eaters by up to 10x. The maze-like ridges encourage natural foraging behaviour and help prevent bloat, regurgitation, and obesity.',
    price: 9.99, originalPrice: 12.99, rating: 4.5, reviewCount: 22100, platform: 'amazon',
    pros: ['Dramatically slows eating', 'Non-slip base', 'Dishwasher safe', 'BPA-free material'],
    cons: ['Difficult to clean in the grooves', 'Very small dogs may struggle'],
    brand: 'Outward Hound', petType: 'dog', subCategory: 'Bowls & Feeders', tags: ['slow-feeder', 'bowl', 'puzzle', 'anti-bloat'],
    isDeal: true, dealExpiry: daysAgo(-7),
    aiSummary: 'An innovative maze-design slow feeder bowl that reduces eating speed by up to 10x to prevent bloat and aid digestion.',
    specs: { Capacity: '500ml', Material: 'BPA-Free ABS Plastic', 'Dishwasher Safe': 'Yes', 'Non-Slip': 'Yes', Dimensions: '25cm diameter' },
  },
  {
    title: 'Greenies Original Large Dental Dog Treats 340g',
    description: 'Clinically proven dental treats that clean teeth, freshen breath, and fight plaque and tartar build-up. Accepted by the Veterinary Oral Health Council with a unique chewy texture dogs love.',
    price: 14.99, originalPrice: 16.99, rating: 4.6, reviewCount: 31200, platform: 'amazon',
    pros: ['VOHC accepted', 'Freshens breath effectively', 'Natural ingredients', 'Dogs love the taste'],
    cons: ['Can be high in calories', 'Not suitable for dogs under 11kg'],
    brand: 'Greenies', petType: 'dog', subCategory: 'Treats', tags: ['dental-treats', 'treats', 'oral-health', 'natural'],
    featured: true,
    aiSummary: 'VOHC-accepted dental treats that effectively fight plaque and tartar while freshening breath with a taste dogs love.',
    specs: { Weight: '340g', 'Pack Count': '12 treats', 'Dog Size': 'Large (22-45kg)', 'VOHC Accepted': 'Yes', 'Key Ingredients': 'Wheat Flour, Glycerin, Gelatin' },
  },
  {
    title: 'Lily\'s Kitchen Proper Dog Food Chicken & Duck Grain Free',
    description: 'Natural grain-free complete wet dog food made with 60% freshly prepared chicken and duck. Gently cooked in its own broth with sweet potato, peas, and a blend of botanical herbs.',
    price: 29.99, originalPrice: 34.99, rating: 4.7, reviewCount: 9800, platform: 'amazon',
    pros: ['60% real meat content', 'Grain-free recipe', 'No artificial preservatives', 'Ethically sourced ingredients'],
    cons: ['Expensive compared to dry food', 'Short shelf life once opened'],
    brand: "Lily's Kitchen", petType: 'dog', subCategory: 'Wet Food', tags: ['wet-food', 'grain-free', 'natural', 'premium'],
    aiSummary: 'A premium grain-free wet food with 60% freshly prepared chicken and duck, gently cooked with herbs and vegetables.',
    specs: { Weight: '6 x 400g tins', 'Meat Content': '60%', 'Grain Free': 'Yes', 'Life Stage': 'Adult', 'Key Ingredients': 'Chicken, Duck, Sweet Potato' },
  },
  {
    title: 'Furminator Deshedding Tool for Large Dogs',
    description: 'The original deshedding tool that reduces loose hair from shedding up to 90%. Features a stainless steel deShedding edge that reaches through the topcoat to safely remove loose undercoat hair.',
    price: 24.99, originalPrice: 31.99, rating: 4.5, reviewCount: 19400, platform: 'amazon',
    pros: ['Reduces shedding up to 90%', 'Ergonomic handle', 'FURejector button for easy cleaning', 'Stainless steel edge'],
    cons: ['Not for breeds without undercoat', 'Can irritate skin if overused'],
    brand: 'Furminator', petType: 'dog', subCategory: 'Grooming', tags: ['grooming', 'deshedding', 'brush', 'coat-care'],
    isStaffPick: true,
    aiSummary: 'The industry-leading deshedding tool that removes up to 90% of loose undercoat hair with a stainless steel edge.',
    specs: { 'Dog Size': 'Large (over 23kg)', 'Coat Type': 'Long Hair (over 5cm)', 'Edge Width': '10cm', Material: 'Stainless Steel', 'FURejector': 'Yes' },
  },
  {
    title: 'Adaptil Calm Home Diffuser Starter Kit',
    description: 'Clinically proven pheromone diffuser that helps dogs feel calm and comfortable at home. Releases a synthetic copy of the dog-appeasing pheromone that mother dogs produce to reassure their puppies.',
    price: 22.99, originalPrice: 27.99, rating: 4.3, reviewCount: 14300, platform: 'amazon',
    pros: ['Clinically proven effectiveness', 'Covers up to 70m2', 'Odourless to humans', 'Continuous 30-day release'],
    cons: ['Refills needed monthly', 'May not work for all dogs'],
    brand: 'Adaptil', petType: 'dog', subCategory: 'Calming & Behaviour', tags: ['calming', 'anxiety', 'pheromone', 'behaviour'],
    aiSummary: 'A clinically proven pheromone diffuser that reduces anxiety and helps dogs feel calm at home for up to 30 days.',
    specs: { Coverage: 'Up to 70m2', 'Duration': '30 days', 'Includes': 'Diffuser + 48ml Refill', 'Clinically Proven': 'Yes', Type: 'Plug-In Diffuser' },
  },
  {
    title: 'PetSafe Easy Walk No-Pull Dog Lead 1.8m',
    description: 'A classic fixed-length walking lead made from durable nylon webbing with a comfortable padded handle. The nickel-plated swivel clip prevents tangling during walks.',
    price: 12.99, originalPrice: 15.99, rating: 4.4, reviewCount: 7800, platform: 'amazon',
    pros: ['Padded handle for comfort', 'Anti-tangle swivel clip', 'Weather resistant nylon'],
    cons: ['Only available in one length', 'Basic design'],
    brand: 'PetSafe', petType: 'dog', subCategory: 'Harnesses & Leads', tags: ['lead', 'walking', 'nylon', 'padded-handle'],
    aiSummary: 'A durable nylon walking lead with padded handle and swivel clip, designed for comfortable everyday walks.',
    specs: { Length: '1.8m', Width: '2.5cm', Material: 'Nylon Webbing', Clip: 'Nickel-Plated Swivel', Handle: 'Padded Neoprene' },
  },
  {
    title: 'Ancol Muddy Paws Stormguard Dog Coat',
    description: 'A waterproof and windproof dog coat with a warm fleece lining for cold, wet British weather. Features an adjustable chest strap, belly strap, and reflective piping for safety during dark winter walks.',
    price: 19.99, originalPrice: 24.99, rating: 4.4, reviewCount: 5600, platform: 'amazon',
    pros: ['Fully waterproof', 'Warm fleece lining', 'Reflective piping', 'Easy to put on and remove'],
    cons: ['Sizing runs small', 'Not suitable for very deep-chested breeds'],
    brand: 'Ancol', petType: 'dog', subCategory: 'Clothing & Coats', tags: ['coat', 'waterproof', 'winter', 'reflective'],
    isDeal: true, dealExpiry: daysAgo(-10),
    aiSummary: 'A fully waterproof fleece-lined dog coat with reflective piping, ideal for cold and wet British weather.',
    specs: { Sizes: 'XS to XXL', 'Waterproof': 'Yes', 'Lining': 'Fleece', 'Reflective': 'Yes', 'Closure': 'Adjustable Velcro Straps' },
  },
  {
    title: 'PetSafe Clik-R Dog Training Clicker',
    description: 'A comfortable ergonomic clicker for positive reinforcement training. The finger band keeps it always ready to use while the loud, consistent click sound provides clear communication with your dog.',
    price: 4.99, originalPrice: 6.99, rating: 4.6, reviewCount: 11200, platform: 'amazon',
    pros: ['Ergonomic design', 'Consistent click sound', 'Finger band for easy use', 'Great value'],
    cons: ['Click may startle nervous dogs initially'],
    brand: 'PetSafe', petType: 'dog', subCategory: 'Training', tags: ['training', 'clicker', 'positive-reinforcement', 'obedience'],
    aiSummary: 'An ergonomic training clicker with consistent sound and finger band, perfect for positive reinforcement sessions.',
    specs: { Type: 'Button Clicker', 'Finger Band': 'Yes', Material: 'Plastic', 'Sound': 'Consistent Click', Colour: 'Blue' },
  },
  {
    title: 'Snuffle Mat Interactive Dog Feeding Mat',
    description: 'Handmade fleece snuffle mat that encourages natural foraging instincts and provides mental stimulation during mealtimes. Helps reduce boredom and anxiety while slowing down fast eaters.',
    price: 16.99, originalPrice: 21.99, rating: 4.4, reviewCount: 8900, platform: 'amazon',
    pros: ['Great mental stimulation', 'Machine washable', 'Non-slip backing', 'Reduces mealtime speed'],
    cons: ['Needs supervision for heavy chewers', 'Can be messy with wet food'],
    brand: 'Injoya', petType: 'dog', subCategory: 'Enrichment', tags: ['enrichment', 'snuffle-mat', 'puzzle', 'mental-stimulation'],
    aiSummary: 'A handmade fleece foraging mat that provides mental stimulation, reduces boredom, and slows down fast eating dogs.',
    specs: { Size: '45cm x 45cm', Material: 'Polyester Fleece', 'Machine Washable': 'Yes', 'Non-Slip': 'Yes', 'Suitable For': 'All Breeds' },
  },
  {
    title: 'JW Pet Gripsoft Double Row Undercoat Rake',
    description: 'Professional-grade undercoat rake with rounded pins that penetrate deep into thick coats without scratching the skin. The non-slip ergonomic handle provides comfort during grooming sessions.',
    price: 7.99, originalPrice: 9.99, rating: 4.3, reviewCount: 4200, platform: 'amazon',
    pros: ['Rounded pins for safety', 'Effective on thick undercoats', 'Comfortable grip'],
    cons: ['Not suitable for short-haired breeds', 'Pins may bend over time'],
    brand: 'JW Pet', petType: 'dog', subCategory: 'Grooming', tags: ['grooming', 'undercoat-rake', 'brush', 'deshedding'],
    aiSummary: 'A professional undercoat rake with rounded safety pins, ideal for maintaining thick double coats.',
    specs: { 'Pin Type': 'Rounded Double Row', Handle: 'Non-Slip Rubber', 'Best For': 'Double-Coated Breeds', Material: 'Stainless Steel Pins', Length: '20cm' },
  },
];

// --- Cat Products ---
const catProducts: ProductSeed[] = [
  {
    title: 'Whiskas 1+ Cat Pouches Poultry Selection in Jelly 84 Pack',
    description: 'Complete wet cat food pouches with a variety of poultry flavours in tasty jelly. Provides 100% of the daily nutrients your adult cat needs with added vitamins and minerals.',
    price: 26.99, originalPrice: 31.99, rating: 4.5, reviewCount: 35200, platform: 'amazon',
    pros: ['Great value bulk pack', 'Variety of flavours', '100% complete nutrition', 'Cats love the jelly'],
    cons: ['Lots of packaging waste', 'Some cats are fussy about certain flavours'],
    brand: 'Whiskas', petType: 'cat', subCategory: 'Wet Food', tags: ['cat-food', 'wet-food', 'poultry', 'bulk'],
    featured: true,
    aiSummary: 'An excellent-value 84-pack of poultry wet food pouches delivering complete daily nutrition in tasty jelly.',
    specs: { 'Pack Size': '84 x 85g pouches', 'Flavours': 'Chicken, Turkey, Duck, Poultry', 'Life Stage': 'Adult 1+', 'Complete Food': 'Yes', 'Format': 'Jelly' },
  },
  {
    title: 'Royal Canin Indoor Cat Dry Food 10kg',
    description: 'Specially formulated for indoor cats with reduced calorie content to maintain a healthy weight. Contains a highly digestible blend of proteins and fibres to reduce stool odour and volume.',
    price: 56.99, originalPrice: 64.99, rating: 4.7, reviewCount: 14800, platform: 'amazon',
    pros: ['Reduced calorie formula', 'Controls hairballs', 'Reduces stool odour', 'High-quality proteins'],
    cons: ['Expensive', 'Strong smell from the bag'],
    brand: 'Royal Canin', petType: 'cat', subCategory: 'Dry Food', tags: ['cat-food', 'dry-food', 'indoor', 'weight-management'],
    isStaffPick: true,
    aiSummary: 'A premium dry food formulated for indoor cats with reduced calories, hairball control, and stool odour reduction.',
    specs: { Weight: '10kg', 'Calories': '3,464 kcal/kg', 'Life Stage': 'Adult', 'Special': 'Indoor Formula', 'Key Benefit': 'Weight & Hairball Control' },
  },
  {
    title: 'Catit Flower Water Fountain 3L',
    description: 'An attractive flower-top drinking fountain that encourages cats to drink more water. Features three water flow settings and a triple-action filter that softens water, removes odours, and retains debris.',
    price: 24.99, originalPrice: 29.99, rating: 4.5, reviewCount: 21600, platform: 'amazon',
    pros: ['Three flow settings', 'Triple-action filter', 'Quiet operation', 'Encourages hydration'],
    cons: ['Filter replacement needed monthly', 'Requires regular cleaning'],
    brand: 'Catit', petType: 'cat', subCategory: 'Water Fountains', tags: ['water-fountain', 'hydration', 'filter', 'quiet'],
    featured: true, isStaffPick: true,
    aiSummary: 'A triple-flow drinking fountain with advanced filtration that encourages cats to drink more water throughout the day.',
    specs: { Capacity: '3 litres', 'Flow Settings': '3 (Gentle, Bubbling, Calm)', Filter: 'Triple-Action Carbon', 'Pump': 'Low-voltage, silent', Material: 'BPA-Free Plastic' },
  },
  {
    title: 'PetSafe ScoopFree Ultra Self-Cleaning Litter Box',
    description: 'Automatic self-cleaning litter box that rakes waste into a covered trap 20 minutes after your cat uses it. Uses crystal litter trays that absorb urine and dehydrate solid waste, providing weeks of fresh, clean litter.',
    price: 149.99, originalPrice: 179.99, rating: 4.3, reviewCount: 8900, platform: 'amazon',
    pros: ['Fully automatic cleaning', 'Crystal litter controls odour', 'Privacy hood included', 'Health counter tracks usage'],
    cons: ['Crystal tray refills are expensive', 'Loud raking noise may startle some cats'],
    brand: 'PetSafe', petType: 'cat', subCategory: 'Litter Boxes', tags: ['litter-box', 'self-cleaning', 'automatic', 'odour-control'],
    isDeal: true, dealExpiry: daysAgo(-21),
    aiSummary: 'A fully automatic self-cleaning litter box using crystal trays for weeks of hands-free, odour-controlled freshness.',
    specs: { Type: 'Automatic Self-Cleaning', 'Litter Type': 'Crystal Tray', 'Clean Cycle': '20 minutes after use', 'Tray Life': '20-30 days (1 cat)', 'Privacy Hood': 'Included' },
  },
  {
    title: 'Feliway Classic Diffuser Starter Kit',
    description: 'Clinically proven synthetic feline facial pheromone diffuser that helps reduce stress-related behaviours such as scratching, spraying, and hiding. Provides constant comfort for up to 30 days.',
    price: 21.49, originalPrice: 25.99, rating: 4.2, reviewCount: 17800, platform: 'amazon',
    pros: ['Clinically proven', 'Covers up to 70m2', 'Odourless and silent', '30-day duration'],
    cons: ['Results may take 7 days to appear', 'Not effective for all cats'],
    brand: 'Feliway', petType: 'cat', subCategory: 'Calming', tags: ['calming', 'pheromone', 'anxiety', 'stress-relief'],
    aiSummary: 'A clinically proven pheromone diffuser that reduces scratching, spraying, and hiding behaviour in stressed cats.',
    specs: { Coverage: 'Up to 70m2', Duration: '30 days', 'Includes': 'Diffuser + 48ml Refill', 'Pheromone Type': 'Feline Facial Pheromone', 'Proven': 'Clinically Tested' },
  },
  {
    title: 'Go Pet Club 72-Inch Cat Tree',
    description: 'A massive multi-level cat tree featuring multiple platforms, condos, hammocks, and sisal scratching posts. Provides endless climbing, scratching, and napping opportunities for multi-cat households.',
    price: 89.99, originalPrice: 109.99, rating: 4.4, reviewCount: 13500, platform: 'amazon',
    pros: ['Huge structure for multi-cat homes', 'Multiple sisal scratching posts', 'Several hideaways and platforms', 'Plush faux-fur covering'],
    cons: ['Very large footprint', 'Assembly takes 60+ minutes'],
    brand: 'Go Pet Club', petType: 'cat', subCategory: 'Cat Trees', tags: ['cat-tree', 'scratching-post', 'climbing', 'multi-cat'],
    isDeal: true, dealExpiry: daysAgo(-5),
    aiSummary: 'A towering 72-inch cat tree with condos, hammocks, and sisal posts, perfect for multi-cat households.',
    specs: { Height: '183cm (72")', 'Scratching Posts': '8 Sisal-Wrapped', 'Condos': '3', Platforms: '5', 'Base Dimensions': '61cm x 48cm' },
  },
  {
    title: 'Trixie 5-in-1 Activity Fun Board',
    description: 'Interactive puzzle feeder with five different challenge modules that stimulate your cat mentally and physically during mealtimes. Helps prevent boredom eating and slows down food consumption.',
    price: 13.99, originalPrice: 17.99, rating: 4.5, reviewCount: 9200, platform: 'amazon',
    pros: ['Five different challenges', 'Slows eating speed', 'Dishwasher safe', 'Great mental stimulation'],
    cons: ['Some cats give up quickly', 'Small kibble falls through easily'],
    brand: 'Trixie', petType: 'cat', subCategory: 'Enrichment', tags: ['puzzle-feeder', 'enrichment', 'interactive', 'slow-feeder'],
    aiSummary: 'A five-module puzzle feeder that challenges cats mentally and physically while slowing down fast eaters.',
    specs: { Modules: '5 Different Challenges', Material: 'Plastic', 'Dishwasher Safe': 'Yes', Dimensions: '30cm x 40cm', 'Suitable For': 'All Ages' },
  },
  {
    title: 'Dreamies Cat Treats Mix Mega Tub 350g',
    description: 'Irresistible cat treats with a crunchy outside and a soft, flavourful centre. This mega tub contains a mix of chicken, salmon, and cheese flavours that cats go absolutely wild for.',
    price: 8.99, originalPrice: 10.99, rating: 4.8, reviewCount: 28400, platform: 'amazon',
    pros: ['Cats absolutely love them', 'Great variety of flavours', 'Resealable tub', 'Excellent value'],
    cons: ['Very addictive for cats', 'High calorie treats'],
    brand: 'Dreamies', petType: 'cat', subCategory: 'Treats', tags: ['treats', 'snacks', 'variety-pack', 'crunchy'],
    featured: true,
    aiSummary: 'An irresistible mega tub of crunchy-outside, soft-centre treats in chicken, salmon, and cheese flavours.',
    specs: { Weight: '350g', Flavours: 'Chicken, Salmon, Cheese', 'Calories': '3.5 kcal per treat', Format: 'Resealable Tub', 'Suitable For': 'Adult Cats' },
  },
  {
    title: 'SureFlap Microchip Cat Flap',
    description: 'A smart cat flap that reads your cat\'s existing microchip to allow entry, keeping unwanted neighbourhood cats out. Compatible with all common microchip formats and can store up to 32 cat identities.',
    price: 69.99, originalPrice: 79.99, rating: 4.6, reviewCount: 18900, platform: 'amazon',
    pros: ['Reads existing microchip', 'Keeps strays out', 'Stores up to 32 cats', 'Battery powered (lasts 12 months)'],
    cons: ['Installation requires cutting a hole', 'Batteries not rechargeable'],
    brand: 'SureFlap', petType: 'cat', subCategory: 'Cat Flaps', tags: ['cat-flap', 'microchip', 'security', 'smart'],
    isStaffPick: true,
    aiSummary: 'A microchip-activated cat flap that uses your cat\'s existing chip to provide secure, selective access.',
    specs: { 'Microchip Compatible': '9, 10, 15-digit & FDXA', 'Memory': '32 cats', 'Battery Life': '12 months (4x AA)', 'Cut-Out Size': '171mm x 165mm', 'Flap Opening': '142mm x 120mm' },
  },
  {
    title: 'Catit Senses 2.0 Super Circuit Interactive Cat Toy',
    description: 'A modular ball-track toy that can be configured in over 100 different layouts to keep your cat entertained. Features a wave-shaped speed circuit with peek-a-boo holes that trigger natural hunting instincts.',
    price: 14.99, originalPrice: 18.99, rating: 4.3, reviewCount: 7600, platform: 'amazon',
    pros: ['Over 100 configurations', 'Stimulates hunting instinct', 'Can connect multiple sets', 'Durable construction'],
    cons: ['Ball can get stuck in tight turns', 'Needs space to set up larger configurations'],
    brand: 'Catit', petType: 'cat', subCategory: 'Toys', tags: ['cat-toy', 'interactive', 'ball-track', 'modular'],
    aiSummary: 'A modular ball-track circuit with over 100 configurations and peek-a-boo holes to engage natural hunting instincts.',
    specs: { 'Track Pieces': '8 Sections', 'Configurations': '100+', 'Ball Included': 'Yes - Illuminated', Material: 'BPA-Free Plastic', 'Expandable': 'Yes' },
  },
  {
    title: 'World\'s Best Cat Litter Original Unscented 6.35kg',
    description: 'A natural clumping litter made from whole-kernel corn that offers outstanding odour control and easy scooping. Flushable and septic-safe, this eco-friendly litter is 99% dust-free and lightweight.',
    price: 18.99, originalPrice: 22.99, rating: 4.5, reviewCount: 12100, platform: 'amazon',
    pros: ['Natural corn-based formula', 'Flushable and septic safe', '99% dust free', 'Excellent clumping'],
    cons: ['Tracking can be an issue', 'Some cats dislike the texture'],
    brand: "World's Best", petType: 'cat', subCategory: 'Litter', tags: ['cat-litter', 'natural', 'clumping', 'flushable'],
    aiSummary: 'An eco-friendly corn-based clumping litter that is flushable, 99% dust-free, and provides exceptional odour control.',
    specs: { Weight: '6.35kg', Material: 'Whole-Kernel Corn', 'Clumping': 'Yes', 'Flushable': 'Yes', 'Dust Free': '99%' },
  },
  {
    title: 'Pecute Cat Grooming Brush Self-Cleaning Slicker',
    description: 'A gentle self-cleaning slicker brush with fine bent wire bristles that effectively remove loose fur, tangles, and mats. The one-click self-cleaning button retracts the bristles to release collected hair instantly.',
    price: 9.99, originalPrice: 13.99, rating: 4.4, reviewCount: 15800, platform: 'amazon',
    pros: ['One-click self-cleaning', 'Gentle on skin', 'Removes tangles effectively', 'Comfortable ergonomic handle'],
    cons: ['Wire bristles may snag on long coats', 'Retraction mechanism can wear out'],
    brand: 'Pecute', petType: 'cat', subCategory: 'Grooming', tags: ['grooming', 'brush', 'self-cleaning', 'deshedding'],
    aiSummary: 'A self-cleaning slicker brush with gentle bent-wire bristles and a one-click hair release button for easy grooming.',
    specs: { 'Bristle Type': 'Fine Bent Wire', 'Self-Cleaning': 'One-Click Button', Handle: 'Ergonomic Anti-Slip', 'Suitable For': 'All Coat Types', Dimensions: '19cm x 10cm' },
  },
  {
    title: 'Catit Pixi Smart Mouse Camera',
    description: 'An interactive mouse-shaped camera that lets you watch, talk to, and play with your cat remotely via the Catit PIXI app. Features laser play mode, treat dispenser, and night vision for 24/7 monitoring.',
    price: 89.99, originalPrice: 99.99, rating: 4.1, reviewCount: 3200, platform: 'amazon',
    pros: ['Remote laser play', 'Built-in treat dispenser', 'Night vision camera', 'Two-way audio'],
    cons: ['Requires stable Wi-Fi', 'App can be slow to connect'],
    brand: 'Catit', petType: 'cat', subCategory: 'Smart Devices', tags: ['pet-camera', 'smart', 'interactive', 'treat-dispenser'],
    aiSummary: 'A smart mouse-shaped pet camera with remote laser play, treat dispensing, and night vision for cat monitoring.',
    specs: { Camera: '1080p HD with Night Vision', 'App Control': 'Catit PIXI App (iOS/Android)', 'Features': 'Laser, Treats, 2-Way Audio', 'Wi-Fi': '2.4GHz Required', 'Storage': 'Cloud or SD Card' },
  },
  {
    title: 'Rogz Catz Reflective Breakaway Cat Collar',
    description: 'A lightweight safety collar with a breakaway buckle that releases under pressure to prevent choking. Features reflective stitching for night visibility and an integrated bell to protect wildlife.',
    price: 5.99, originalPrice: 7.99, rating: 4.3, reviewCount: 6100, platform: 'amazon',
    pros: ['Safety breakaway buckle', 'Reflective stitching', 'Lightweight and comfortable', 'Adjustable size'],
    cons: ['Bell cannot be removed', 'Breakaway can trigger too easily for some cats'],
    brand: 'Rogz', petType: 'cat', subCategory: 'Collars', tags: ['collar', 'safety', 'reflective', 'breakaway'],
    aiSummary: 'A lightweight safety collar with breakaway buckle, reflective stitching, and bell for cat safety and wildlife protection.',
    specs: { 'Size': 'Adjustable 20-31cm', 'Breakaway': 'Yes - Safety Buckle', 'Reflective': 'Yes', 'Bell': 'Integrated', Width: '11mm' },
  },
  {
    title: 'Hills Science Plan Adult Cat Food Chicken 10kg',
    description: 'Precisely balanced nutrition developed by veterinarians and nutritionists for adult cats. Made with high-quality chicken protein and clinically proven antioxidants to support a healthy immune system.',
    price: 49.99, originalPrice: 57.99, rating: 4.6, reviewCount: 11200, platform: 'amazon',
    pros: ['Vet developed formula', 'Supports immune health', 'High-quality protein', 'No artificial colours or flavours'],
    cons: ['Some cats dislike the kibble shape', 'Premium pricing'],
    brand: "Hill's", petType: 'cat', subCategory: 'Dry Food', tags: ['cat-food', 'dry-food', 'vet-recommended', 'chicken'],
    aiSummary: 'A vet-developed dry cat food with high-quality chicken protein and clinically proven immune system support.',
    specs: { Weight: '10kg', 'Life Stage': 'Adult 1-6', 'Protein': 'Chicken', 'Key Benefit': 'Immune Support', 'Artificial Additives': 'None' },
  },
];

// --- Bird Supplies ---
const birdProducts: ProductSeed[] = [
  {
    title: 'Vision Bird Cage Model M02 Medium',
    description: 'A spacious medium bird cage with a unique deep base that keeps seed debris inside the cage. Features terracotta-coloured perches and food/water dishes, plus multiple door openings for easy access.',
    price: 74.99, originalPrice: 89.99, rating: 4.5, reviewCount: 5600, platform: 'amazon',
    pros: ['Deep base reduces mess', 'Easy to assemble', 'Multiple access doors', 'Good ventilation'],
    cons: ['Perches are smooth plastic', 'Bar spacing may not suit very small birds'],
    brand: 'Vision', petType: 'bird', subCategory: 'Cages', tags: ['bird-cage', 'medium', 'easy-clean', 'budgie'],
    featured: true,
    aiSummary: 'A well-designed medium cage with a deep mess-reducing base and multiple access points for easy maintenance.',
    specs: { Dimensions: '62.5cm x 39.5cm x 87cm', 'Bar Spacing': '12mm', 'Doors': '4', Base: 'Deep Debris Guard', 'Suitable For': 'Budgies, Canaries, Finches' },
  },
  {
    title: 'Kaytee Fiesta Parrot Food 1.13kg',
    description: 'A gourmet blend of seeds, fruits, nuts, and vegetables specifically formulated for parrots and conures. Fortified with DHA omega-3 for heart, brain, and visual health support.',
    price: 14.99, originalPrice: 17.99, rating: 4.3, reviewCount: 3800, platform: 'amazon',
    pros: ['Wide variety of ingredients', 'DHA fortified', 'Parrots love it', 'Nutritionally complete'],
    cons: ['Some birds pick out favourites and waste the rest', 'Contains sunflower seeds which are high fat'],
    brand: 'Kaytee', petType: 'bird', subCategory: 'Bird Food', tags: ['bird-food', 'parrot', 'seed-mix', 'fortified'],
    aiSummary: 'A DHA-fortified gourmet seed mix with fruits, nuts, and vegetables formulated for parrots and conures.',
    specs: { Weight: '1.13kg', 'Suitable For': 'Parrots & Conures', 'Fortified': 'DHA Omega-3', 'Format': 'Seed & Fruit Mix', 'Key Ingredients': 'Sunflower, Peanuts, Papaya, Pineapple' },
  },
  {
    title: 'Harrison\'s Adult Lifetime Fine Organic Bird Food 454g',
    description: 'Certified organic pelleted bird food recommended by avian veterinarians worldwide. Provides complete balanced nutrition without the selective eating problems of seed mixes.',
    price: 18.99, originalPrice: 21.99, rating: 4.7, reviewCount: 2900, platform: 'amazon',
    pros: ['Certified organic', 'Avian vet recommended', 'Complete nutrition in every pellet', 'No artificial preservatives'],
    cons: ['Transition from seeds can be difficult', 'Premium price per kg'],
    brand: "Harrison's", petType: 'bird', subCategory: 'Bird Food', tags: ['bird-food', 'organic', 'pellets', 'vet-recommended'],
    isStaffPick: true,
    aiSummary: 'A certified organic pelleted diet recommended by avian vets, providing complete nutrition in every bite.',
    specs: { Weight: '454g', Format: 'Fine Pellets', 'Certification': 'USDA Organic', 'Suitable For': 'Small to Medium Birds', 'Preservatives': 'None' },
  },
  {
    title: 'JW Pet InSight Swing Multi-Colour Bird Toy',
    description: 'A colourful wooden swing with comfortable grip perch that provides exercise and entertainment. The natural wood and bright colours stimulate birds mentally while the swinging motion builds coordination.',
    price: 5.99, originalPrice: 7.99, rating: 4.4, reviewCount: 4100, platform: 'amazon',
    pros: ['Bright stimulating colours', 'Comfortable grip perch', 'Easy to install', 'Suitable for small birds'],
    cons: ['Too small for large parrots', 'Paint may chip over time'],
    brand: 'JW Pet', petType: 'bird', subCategory: 'Toys', tags: ['bird-toy', 'swing', 'perch', 'colourful'],
    aiSummary: 'A colourful wooden swing with grip perch that provides exercise, entertainment, and coordination building.',
    specs: { Dimensions: '13cm x 15cm', Material: 'Natural Wood & Plastic', 'Suitable For': 'Budgies, Canaries, Finches', Installation: 'Hook Attachment', Colours: 'Multi-Colour' },
  },
  {
    title: 'Vitakraft Kracker Budgie Sticks Triple Pack',
    description: 'Triple-baked treat sticks in three delicious flavours that clip to the cage for hours of pecking enjoyment. Made with wholesome seeds and honey, providing both nutrition and enrichment.',
    price: 3.49, originalPrice: 4.49, rating: 4.3, reviewCount: 7200, platform: 'amazon',
    pros: ['Three different flavours', 'Clips to cage easily', 'Provides beak exercise', 'Good value'],
    cons: ['Can be messy', 'High in seeds'],
    brand: 'Vitakraft', petType: 'bird', subCategory: 'Treats', tags: ['bird-treats', 'stick', 'budgie', 'enrichment'],
    aiSummary: 'Triple-baked treat sticks in three flavours that clip to the cage for enrichment and beak exercise.',
    specs: { 'Pack Size': '3 Sticks', Flavours: 'Honey, Egg & Grass Seeds, Sesame & Banana', 'Suitable For': 'Budgies', Format: 'Clip-On Stick', Baking: 'Triple-Baked' },
  },
  {
    title: 'Prevue Hendryx Wrought Iron Flight Cage',
    description: 'A spacious wrought iron flight cage with horizontal side bars for climbing and a removable bottom grate for easy cleaning. Includes four wooden perches, four feeding cups, and a cage stand with shelf.',
    price: 129.99, originalPrice: 149.99, rating: 4.5, reviewCount: 4300, platform: 'amazon',
    pros: ['Very spacious', 'Horizontal bars for climbing', 'Includes stand', 'Easy clean pull-out tray'],
    cons: ['Heavy and difficult to move', 'Assembly is time-consuming'],
    brand: 'Prevue Hendryx', petType: 'bird', subCategory: 'Cages', tags: ['bird-cage', 'flight-cage', 'wrought-iron', 'large'],
    isDeal: true, dealExpiry: daysAgo(-18),
    aiSummary: 'A spacious wrought iron flight cage with horizontal climbing bars, multiple perches, and an included stand.',
    specs: { Dimensions: '79cm x 51cm x 158cm (with stand)', 'Bar Spacing': '12mm', 'Bar Direction': 'Horizontal (sides)', 'Perches': '4 Wooden', 'Feed Cups': '4 Stainless Steel' },
  },
  {
    title: 'Living World Deluxe Seed Guard',
    description: 'A universal seed guard that fits around any bird cage to catch falling seeds, husks, and feathers. Made from clear, easy-to-clean nylon mesh that allows light in while keeping mess contained.',
    price: 11.99, originalPrice: 14.99, rating: 4.1, reviewCount: 3500, platform: 'amazon',
    pros: ['Dramatically reduces mess', 'Universal cage fit', 'Easy to install and remove', 'Machine washable'],
    cons: ['Can restrict cage access', 'Elastic may stretch over time'],
    brand: 'Living World', petType: 'bird', subCategory: 'Cage Accessories', tags: ['seed-guard', 'cage-accessory', 'mess-control', 'universal'],
    aiSummary: 'A universal nylon mesh seed guard that dramatically reduces cage mess while allowing light and airflow.',
    specs: { 'Fits Cages': 'Up to 66cm circumference', Material: 'Nylon Mesh', 'Machine Washable': 'Yes', Attachment: 'Elastic Band', Colour: 'White/Clear' },
  },
  {
    title: 'Supreme Petfoods Science Selective Cockatiel Food 350g',
    description: 'A scientifically formulated extruded nugget food that prevents selective feeding. High in fibre with added vitamins and minerals, this complete diet supports overall cockatiel health and wellbeing.',
    price: 6.49, originalPrice: 7.99, rating: 4.5, reviewCount: 2100, platform: 'amazon',
    pros: ['Prevents selective feeding', 'High fibre content', 'No added sugars', 'Complete nutrition'],
    cons: ['Birds used to seeds may resist', 'Small bag size'],
    brand: 'Supreme Petfoods', petType: 'bird', subCategory: 'Bird Food', tags: ['bird-food', 'cockatiel', 'pellets', 'complete-diet'],
    aiSummary: 'A scientifically formulated extruded nugget food preventing selective feeding and providing complete cockatiel nutrition.',
    specs: { Weight: '350g', Format: 'Extruded Nuggets', 'Suitable For': 'Cockatiels', 'Fibre': 'High', 'Added Sugar': 'None' },
  },
  {
    title: 'Penn-Plax Bird Life Natural Wood Playground',
    description: 'A free-standing natural wood play gym with ladders, swings, and perches for out-of-cage exercise and enrichment. Made from bird-safe natural wood with a removable waste tray for easy cleaning.',
    price: 29.99, originalPrice: 36.99, rating: 4.2, reviewCount: 1800, platform: 'amazon',
    pros: ['Natural wood construction', 'Free-standing design', 'Multiple play areas', 'Removable waste tray'],
    cons: ['Needs to be placed on a flat surface', 'Wood may be chewed through by large birds'],
    brand: 'Penn-Plax', petType: 'bird', subCategory: 'Play Gyms', tags: ['play-gym', 'perch', 'exercise', 'natural-wood'],
    aiSummary: 'A free-standing natural wood play gym with ladders, swings, and perches for stimulating out-of-cage time.',
    specs: { Dimensions: '38cm x 23cm x 40cm', Material: 'Natural Kiln-Dried Wood', 'Waste Tray': 'Removable Plastic', 'Features': 'Ladders, Swing, Perches', 'Suitable For': 'Small to Medium Birds' },
  },
  {
    title: 'Johnsons Cage Bird Mite & Lice Spray 150ml',
    description: 'A veterinary-approved insecticidal spray for the treatment and prevention of mites, lice, and other parasites in cage birds. Safe for use directly on birds and their environment.',
    price: 4.99, originalPrice: 6.49, rating: 4.2, reviewCount: 3900, platform: 'amazon',
    pros: ['Kills mites and lice effectively', 'Safe for direct bird use', 'Easy spray application', 'Veterinary approved'],
    cons: ['Strong chemical smell', 'May need multiple applications'],
    brand: "Johnson's", petType: 'bird', subCategory: 'Health', tags: ['mite-spray', 'parasite', 'health', 'cage-treatment'],
    aiSummary: 'A vet-approved insecticidal spray safe for direct use on cage birds to eliminate mites, lice, and parasites.',
    specs: { Volume: '150ml', 'Active Ingredient': 'Permethrin', 'Safe For': 'All Cage Birds', Application: 'Spray', 'Treatment Area': 'Bird & Environment' },
  },
  {
    title: 'Versele-Laga Prestige Premium Canary Seed Mix 2.5kg',
    description: 'A premium seed mixture enriched with VAM pellets containing vitamins, amino acids, and minerals. Formulated specifically for canaries with high-quality canary seed and a balanced nutritional profile.',
    price: 9.99, originalPrice: 12.49, rating: 4.6, reviewCount: 3400, platform: 'amazon',
    pros: ['Enriched with VAM pellets', 'High-quality seeds', 'Canary-specific formulation', 'Good value for quantity'],
    cons: ['Some canaries ignore the VAM pellets', 'Dusty at the bottom of the bag'],
    brand: 'Versele-Laga', petType: 'bird', subCategory: 'Bird Food', tags: ['bird-food', 'canary', 'seed-mix', 'fortified'],
    aiSummary: 'A premium canary seed mix enriched with vitamin, amino acid, and mineral pellets for optimal nutrition.',
    specs: { Weight: '2.5kg', 'Suitable For': 'Canaries', 'Enrichment': 'VAM Pellets', 'Key Seeds': 'Canary Seed, Rapeseed, Niger', Format: 'Seed Mix' },
  },
  {
    title: 'K&H Pet Products Snuggle Up Bird Warmer Medium',
    description: 'A thermostatically controlled heated bird perch that provides gentle warmth to birds during cold months. The hidden heating element automatically maintains a safe temperature up to 39C.',
    price: 19.99, originalPrice: 24.99, rating: 4.3, reviewCount: 2400, platform: 'amazon',
    pros: ['Thermostatically controlled', 'Safe hidden heating element', 'Mounts inside cage easily', 'Energy efficient'],
    cons: ['Cord may attract chewing', 'Only warms a small area'],
    brand: 'K&H Pet Products', petType: 'bird', subCategory: 'Heating', tags: ['bird-warmer', 'heated-perch', 'winter', 'thermostat'],
    aiSummary: 'A thermostatically controlled bird warmer with hidden heating element for safe, gentle warmth during cold months.',
    specs: { 'Temperature': 'Up to 39C', 'Power': '15W', 'Size': 'Medium (fits standard cages)', 'Thermostat': 'Automatic', 'Mounting': 'Cage Clip' },
  },
  {
    title: 'Hagen Living World Wooden Bird Ladder 12 Step',
    description: 'A 12-step natural wooden ladder that provides exercise and enrichment for cage birds. Made from bird-safe untreated wood with smooth edges to protect delicate feet.',
    price: 4.49, originalPrice: 5.99, rating: 4.4, reviewCount: 5800, platform: 'amazon',
    pros: ['Natural untreated wood', 'Good exercise accessory', 'Easy to install', 'Budget-friendly'],
    cons: ['May need replacing if chewed', 'Only suitable for small birds'],
    brand: 'Hagen', petType: 'bird', subCategory: 'Toys', tags: ['bird-toy', 'ladder', 'exercise', 'wooden'],
    aiSummary: 'A 12-step natural wood ladder providing safe exercise and enrichment for small cage birds.',
    specs: { Steps: '12', Material: 'Untreated Natural Wood', Length: '38cm', Width: '7cm', 'Suitable For': 'Budgies, Finches, Canaries' },
  },
  {
    title: 'Beaphar Anti-Parasite Spot On for Cage Birds',
    description: 'An easy-to-apply spot-on treatment for cage birds that protects against feather mites, red mites, and other external parasites. One application provides protection for up to 8 weeks.',
    price: 6.99, originalPrice: 8.99, rating: 4.1, reviewCount: 2800, platform: 'amazon',
    pros: ['Easy spot-on application', '8 weeks protection', 'Effective against multiple parasites'],
    cons: ['Must be applied carefully', 'Can stain feathers temporarily'],
    brand: 'Beaphar', petType: 'bird', subCategory: 'Health', tags: ['parasite-treatment', 'spot-on', 'mite-protection', 'health'],
    aiSummary: 'An easy spot-on parasite treatment providing 8 weeks of protection against feather mites and external parasites.',
    specs: { 'Pack Size': '2 Pipettes', 'Protection': '8 Weeks per Application', 'Parasites': 'Feather Mites, Red Mites', Application: 'Spot-On (neck)', 'Suitable For': 'All Cage Birds' },
  },
  {
    title: 'Witte Molen Pure Cuttlebone Large 2 Pack',
    description: 'Natural cuttlebone sourced from the Mediterranean Sea, providing essential calcium and minerals for cage birds. Helps keep beaks trim and healthy while satisfying natural gnawing instincts.',
    price: 3.99, originalPrice: 4.99, rating: 4.5, reviewCount: 6200, platform: 'amazon',
    pros: ['Natural calcium source', 'Keeps beaks trimmed', 'Long-lasting', 'Essential minerals'],
    cons: ['Can be messy when gnawed', 'Quality varies between pieces'],
    brand: 'Witte Molen', petType: 'bird', subCategory: 'Supplements', tags: ['cuttlebone', 'calcium', 'beak-care', 'supplement'],
    aiSummary: 'Natural Mediterranean cuttlebone providing essential calcium, minerals, and beak maintenance for cage birds.',
    specs: { 'Pack Size': '2 Pieces', 'Size': 'Large (16-18cm)', Source: 'Mediterranean Sea', 'Key Mineral': 'Calcium', 'Suitable For': 'All Cage Birds' },
  },
];

// --- Fish & Aquatics ---
const fishProducts: ProductSeed[] = [
  {
    title: 'Fluval Flex 57L Aquarium Kit Black',
    description: 'A stylish curved-front aquarium with a concealed rear filtration compartment. Comes complete with a powerful 3-stage filtration system, multi-colour LED lighting, and remote control for easy operation.',
    price: 149.99, originalPrice: 179.99, rating: 4.6, reviewCount: 4800, platform: 'amazon',
    pros: ['Stunning curved glass design', 'Hidden rear filtration', 'Multi-colour remote LED', 'Complete starter kit'],
    cons: ['Filter media replacements are pricey', 'Limited customisation of filtration'],
    brand: 'Fluval', petType: 'fish', subCategory: 'Aquariums', tags: ['aquarium', 'starter-kit', 'LED', 'curved-glass'],
    featured: true, isStaffPick: true,
    aiSummary: 'A stunning curved-front 57L aquarium with hidden 3-stage filtration and multi-colour remote-controlled LED lighting.',
    specs: { Capacity: '57 litres', Dimensions: '41cm x 39cm x 39cm', Filtration: '3-Stage Hidden Rear', Lighting: 'Multi-Colour LED with Remote', 'Glass': 'Curved Front Panel' },
  },
  {
    title: 'Tetra Complete Substrate 5kg',
    description: 'A nutrient-rich substrate concentrate that provides essential minerals and trace elements for healthy aquatic plant growth. Creates the ideal root zone for aquarium plants to thrive long-term.',
    price: 14.99, originalPrice: 17.99, rating: 4.4, reviewCount: 6200, platform: 'amazon',
    pros: ['Rich in iron and minerals', 'Promotes strong root growth', 'Long-lasting nutrient supply', 'Ready to use'],
    cons: ['Must be covered with gravel', 'Can cloud water if disturbed'],
    brand: 'Tetra', petType: 'fish', subCategory: 'Substrate', tags: ['substrate', 'planted-tank', 'nutrients', 'aquascaping'],
    aiSummary: 'A nutrient-rich substrate concentrate providing long-lasting minerals and trace elements for thriving aquatic plants.',
    specs: { Weight: '5kg', 'Covers': 'Up to 100L tank base', 'Key Nutrients': 'Iron, Manganese, Zinc', 'Duration': 'Long-term Release', Application: 'Base Layer Under Gravel' },
  },
  {
    title: 'JBL CristalProfi e1502 Greenline External Filter',
    description: 'A premium energy-efficient external canister filter for aquariums up to 700 litres. Features a pre-filter for extended maintenance intervals and delivers a flow rate of 1,400 litres per hour.',
    price: 159.99, originalPrice: 189.99, rating: 4.7, reviewCount: 3100, platform: 'amazon',
    pros: ['Extremely quiet operation', 'Energy efficient (20W)', 'Pre-filter extends maintenance', 'Powerful 1400L/h flow'],
    cons: ['Large and needs cabinet space', 'Initial priming can be tricky'],
    brand: 'JBL', petType: 'fish', subCategory: 'Filters', tags: ['filter', 'external', 'canister', 'large-tank'],
    isStaffPick: true,
    aiSummary: 'A premium ultra-quiet external canister filter delivering 1,400L/h flow rate for tanks up to 700 litres at only 20W.',
    specs: { 'Tank Size': 'Up to 700L', 'Flow Rate': '1,400 L/h', 'Power': '20W', 'Filter Volume': '12L', 'Pre-Filter': 'Yes - Greenline' },
  },
  {
    title: 'API Freshwater Master Test Kit',
    description: 'The most comprehensive freshwater aquarium test kit available, testing for pH, high-range pH, ammonia, nitrite, and nitrate. Includes over 800 tests with easy-to-read colour charts and clear instructions.',
    price: 24.99, originalPrice: 29.99, rating: 4.8, reviewCount: 28400, platform: 'amazon',
    pros: ['Over 800 tests per kit', 'Accurate liquid tests', 'Tests all key parameters', 'Great value per test'],
    cons: ['Colour matching can be subjective', 'Some reagents stain surfaces'],
    brand: 'API', petType: 'fish', subCategory: 'Test Kits', tags: ['water-test', 'freshwater', 'ammonia', 'essential'],
    featured: true,
    aiSummary: 'The gold standard freshwater test kit with over 800 liquid tests for pH, ammonia, nitrite, and nitrate levels.',
    specs: { 'Tests Included': 'pH, High pH, Ammonia, Nitrite, Nitrate', 'Total Tests': '800+', Type: 'Liquid Reagent', 'Freshwater': 'Yes', 'Chart': 'Laminated Colour Cards' },
  },
  {
    title: 'Fluval Plant 3.0 LED Aquarium Light 91-122cm',
    description: 'A high-performance programmable LED light designed for planted aquariums. Features a customisable light spectrum via Bluetooth app control, with pre-set habitat configurations and sunrise/sunset simulation.',
    price: 149.99, originalPrice: 169.99, rating: 4.7, reviewCount: 5200, platform: 'amazon',
    pros: ['Full spectrum LED', 'Bluetooth app control', 'Sunrise/sunset simulation', 'Energy efficient'],
    cons: ['App can be buggy', 'Mounting brackets are flimsy'],
    brand: 'Fluval', petType: 'fish', subCategory: 'Lighting', tags: ['LED-light', 'planted-tank', 'programmable', 'bluetooth'],
    aiSummary: 'A programmable full-spectrum LED light with Bluetooth app control and sunrise/sunset simulation for planted tanks.',
    specs: { 'Tank Length': '91-122cm', 'LED Output': '59W / 4,450 Lumens', 'Spectrum': 'Full (6500K + RGB)', 'Control': 'Bluetooth App', 'Simulation': 'Sunrise, Sunset, Moonlight' },
  },
  {
    title: 'Eheim Jager TruTemp 200W Aquarium Heater',
    description: 'A precision-calibrated fully submersible aquarium heater with TruTemp dial for accurate temperature control. Features a thermal safety shut-off and shatter-resistant glass construction for maximum safety.',
    price: 29.99, originalPrice: 36.99, rating: 4.6, reviewCount: 8700, platform: 'amazon',
    pros: ['Precise temperature control', 'Thermal safety shut-off', 'Shatter-resistant glass', 'Fully submersible'],
    cons: ['Suction cups may lose grip over time', 'Temperature dial is small and hard to read'],
    brand: 'Eheim', petType: 'fish', subCategory: 'Heaters', tags: ['heater', 'temperature', 'thermostat', 'submersible'],
    aiSummary: 'A precision thermostat heater with TruTemp dial and thermal shut-off in shatter-resistant glass for safe heating.',
    specs: { Power: '200W', 'Tank Size': '250-400L', 'Temp Range': '18-34C', 'Safety': 'Thermal Shut-Off', Construction: 'Shatter-Resistant Borosilicate Glass' },
  },
  {
    title: 'Seachem Prime Water Conditioner 500ml',
    description: 'The most concentrated water conditioner on the market, treating up to 20,000 litres per 500ml bottle. Removes chlorine and chloramine, detoxifies ammonia, nitrite, and nitrate, and is safe for all aquatic life.',
    price: 12.99, originalPrice: 15.99, rating: 4.9, reviewCount: 42100, platform: 'amazon',
    pros: ['Incredibly concentrated formula', 'Detoxifies ammonia and nitrite', 'Safe for all aquatic life', 'Unbeatable value per litre treated'],
    cons: ['Has a strong sulphur smell', 'Dosing cap is imprecise for small tanks'],
    brand: 'Seachem', petType: 'fish', subCategory: 'Water Treatment', tags: ['water-conditioner', 'dechlorinator', 'essential', 'concentrated'],
    isStaffPick: true, featured: true,
    aiSummary: 'The most concentrated water conditioner available, treating 20,000L per bottle while detoxifying ammonia and nitrite.',
    specs: { Volume: '500ml', 'Treats': 'Up to 20,000L', 'Removes': 'Chlorine, Chloramine', 'Detoxifies': 'Ammonia, Nitrite, Nitrate', 'Dosage': '5ml per 200L' },
  },
  {
    title: 'Tetra Goldfish Flakes Complete Food 200g',
    description: 'A nutritionally complete staple flake food for all goldfish varieties. The ProCare formula supports immune health and vitality, while the Clean & Clear Water formula reduces waste and maintains water clarity.',
    price: 8.99, originalPrice: 10.99, rating: 4.4, reviewCount: 15600, platform: 'amazon',
    pros: ['Complete nutrition', 'Reduces water pollution', 'Highly palatable', 'Budget-friendly'],
    cons: ['Flakes can cloud water if overfed', 'Not suitable for tropical fish'],
    brand: 'Tetra', petType: 'fish', subCategory: 'Fish Food', tags: ['fish-food', 'goldfish', 'flakes', 'complete-diet'],
    aiSummary: 'A complete flake food for goldfish with ProCare immune support and a Clean & Clear formula for water quality.',
    specs: { Weight: '200g', 'Fish Type': 'Goldfish (all varieties)', Format: 'Flakes', 'Key Feature': 'ProCare + Clean Water Formula', 'Nutrition': 'Complete' },
  },
  {
    title: 'Tropica Premium Fertiliser 300ml',
    description: 'A professional-grade liquid fertiliser containing essential micronutrients including iron, manganese, and other trace elements for healthy aquatic plant growth. Designed for tanks with a moderate fish load.',
    price: 11.99, originalPrice: 14.99, rating: 4.5, reviewCount: 4800, platform: 'amazon',
    pros: ['Professional quality', 'Contains all micronutrients', 'Easy pump dosing', 'Visible results within weeks'],
    cons: ['Does not contain nitrogen or phosphorus', 'Can promote algae if overdosed'],
    brand: 'Tropica', petType: 'fish', subCategory: 'Plant Care', tags: ['fertiliser', 'planted-tank', 'micronutrients', 'aquascaping'],
    aiSummary: 'A professional liquid fertiliser with essential micronutrients and iron for healthy aquatic plant growth.',
    specs: { Volume: '300ml', 'Treats': 'Up to 3,000L', 'Dosage': '1 pump per 50L weekly', 'Nutrients': 'Fe, Mn, Cu, Zn, B, Mo', 'N/P': 'Not Included' },
  },
  {
    title: 'Marina 3-in-1 Fish Net Set',
    description: 'A set of three different-sized fish nets with soft mesh that is gentle on fish scales and slime coat. Features comfortable long handles and reinforced rims for durability.',
    price: 6.99, originalPrice: 8.99, rating: 4.3, reviewCount: 7200, platform: 'amazon',
    pros: ['Three useful sizes', 'Gentle fine mesh', 'Long comfortable handles', 'Good value set'],
    cons: ['Handles flex under heavy use', 'Fine mesh clogs quickly'],
    brand: 'Marina', petType: 'fish', subCategory: 'Maintenance', tags: ['fish-net', 'maintenance', 'essential', 'gentle'],
    aiSummary: 'A three-piece fish net set with fine gentle mesh and long handles for safe and comfortable fish handling.',
    specs: { 'Net Sizes': '7.5cm, 10cm, 15cm', Material: 'Fine Nylon Mesh', 'Handle Length': '25cm', 'Rim': 'Reinforced Wire', 'Fish Safe': 'Soft Mesh' },
  },
  {
    title: 'Fluval Bug Bites Tropical Fish Food 45g',
    description: 'An innovative fish food made with black soldier fly larvae as the main ingredient, closely mimicking the natural diet of tropical fish. Enriched with essential vitamins and minerals for optimal health.',
    price: 5.99, originalPrice: 7.49, rating: 4.6, reviewCount: 9800, platform: 'amazon',
    pros: ['Insect-based protein', 'Mimics natural diet', 'Fish go crazy for it', 'Sustainable ingredient sourcing'],
    cons: ['Small granule size not suitable for large fish', 'Pricier than traditional flakes'],
    brand: 'Fluval', petType: 'fish', subCategory: 'Fish Food', tags: ['fish-food', 'tropical', 'insect-based', 'natural'],
    aiSummary: 'An innovative insect-based fish food using black soldier fly larvae for natural nutrition tropical fish love.',
    specs: { Weight: '45g', 'Main Ingredient': 'Black Soldier Fly Larvae', 'Fish Type': 'Tropical Community', Format: 'Micro Granules', 'Protein': '40%' },
  },
  {
    title: 'Oase BioMaster Thermo 350 External Filter/Heater',
    description: 'A combined external filter and heater unit that saves space and simplifies aquarium maintenance. Features HeatUp technology integrated into the filter, pre-filter system, and easy-maintenance filter baskets.',
    price: 199.99, originalPrice: 239.99, rating: 4.5, reviewCount: 2600, platform: 'amazon',
    pros: ['Combined filter and heater', 'Space-saving design', 'Easy-maintenance baskets', 'Very quiet operation'],
    cons: ['Expensive initial investment', 'Proprietary replacement parts'],
    brand: 'Oase', petType: 'fish', subCategory: 'Filters', tags: ['filter', 'heater', 'external', 'combined-unit'],
    isDeal: true, dealExpiry: daysAgo(-12),
    aiSummary: 'A space-saving combined external filter and heater with integrated HeatUp technology and easy-clean filter baskets.',
    specs: { 'Tank Size': 'Up to 350L', 'Flow Rate': '1,100 L/h', 'Heater': '200W Integrated', 'Filter Volume': '6.5L', 'Pre-Filter': 'Yes' },
  },
  {
    title: 'AquaEl Leddy Slim 80-100cm LED Aquarium Light',
    description: 'A slim, energy-efficient LED light bar for freshwater aquariums. Provides bright 6500K daylight spectrum illumination with a sleek, modern design that extends to fit tanks from 80 to 100cm.',
    price: 39.99, originalPrice: 47.99, rating: 4.3, reviewCount: 3400, platform: 'amazon',
    pros: ['Slim modern design', 'Energy efficient', 'Extends to fit different tank sizes', 'Good colour temperature'],
    cons: ['Not bright enough for demanding plants', 'No dimming function'],
    brand: 'AquaEl', petType: 'fish', subCategory: 'Lighting', tags: ['LED-light', 'freshwater', 'slim', 'energy-efficient'],
    aiSummary: 'A slim energy-efficient LED light bar with 6500K daylight spectrum, extendable to fit 80-100cm tanks.',
    specs: { 'Tank Length': '80-100cm', 'Power': '16W', 'Spectrum': '6500K Daylight', 'LED Type': 'SMD', Design: 'Slim Aluminium Profile' },
  },
  {
    title: 'Dennerle Scaper\'s Tank 55L Complete Kit',
    description: 'A premium rimless all-glass aquascaping tank with crystal-clear optiwhite glass for stunning plant displays. Includes Scaper\'s Light, CO2 system, substrate, and all necessary accessories.',
    price: 219.99, originalPrice: 259.99, rating: 4.7, reviewCount: 1800, platform: 'amazon',
    pros: ['Crystal clear optiwhite glass', 'Complete aquascaping kit', 'Rimless design', 'Premium build quality'],
    cons: ['Premium price point', 'CO2 refills are ongoing cost'],
    brand: 'Dennerle', petType: 'fish', subCategory: 'Aquariums', tags: ['aquarium', 'aquascaping', 'rimless', 'planted-tank'],
    aiSummary: 'A premium rimless optiwhite glass aquascaping tank with complete CO2 system, lighting, and substrate included.',
    specs: { Capacity: '55L', Glass: 'Optiwhite Float Glass', 'CO2 System': 'Bio CO2 Included', 'Light': "Scaper's Light", 'Substrate': 'Scaper\'s Soil Included' },
  },
  {
    title: 'Hikari Algae Wafers 82g',
    description: 'Specially formulated sinking wafers for herbivorous bottom-feeding fish like plecos and other algae eaters. Made with pure cultured spirulina algae and designed to maintain their shape without clouding water.',
    price: 7.99, originalPrice: 9.49, rating: 4.6, reviewCount: 11200, platform: 'amazon',
    pros: ['Made with spirulina algae', 'Sinks quickly for bottom feeders', 'Keeps shape in water', 'Fish love them'],
    cons: ['Can attract snails', 'Expensive for the quantity'],
    brand: 'Hikari', petType: 'fish', subCategory: 'Fish Food', tags: ['fish-food', 'algae-wafers', 'bottom-feeder', 'pleco'],
    aiSummary: 'Spirulina-based sinking wafers formulated for plecos and bottom-feeding herbivores that keep their shape in water.',
    specs: { Weight: '82g', 'Main Ingredient': 'Spirulina Algae', 'Fish Type': 'Bottom Feeders, Plecos', Format: 'Sinking Wafers', 'Water Clouding': 'No' },
  },
];

// --- Small Pets ---
const smallPetProducts: ProductSeed[] = [
  {
    title: 'Burgess Excel Indoor Rabbit Food 4kg',
    description: 'A high-fibre nugget food designed specifically for indoor rabbits with lower energy needs. Prevents selective feeding with a single-component nugget format and added beneficial fibres for digestive health.',
    price: 14.99, originalPrice: 17.99, rating: 4.7, reviewCount: 8400, platform: 'amazon',
    pros: ['Prevents selective feeding', 'High fibre for digestive health', 'Specifically for indoor rabbits', 'Vet recommended'],
    cons: ['Some rabbits are slow to transition', 'Only one flavour'],
    brand: 'Burgess', petType: 'small-pet', subCategory: 'Rabbit Food', tags: ['rabbit-food', 'indoor', 'high-fibre', 'nuggets'],
    featured: true, isStaffPick: true,
    aiSummary: 'A vet-recommended high-fibre nugget food designed for indoor rabbits that prevents selective feeding.',
    specs: { Weight: '4kg', Format: 'Extruded Nuggets', 'Fibre Content': '36%', 'Suitable For': 'Indoor Rabbits', 'Selective Feeding': 'Prevented' },
  },
  {
    title: 'Kaytee Timothy Hay 2.7kg',
    description: 'Premium hand-selected Timothy hay that is essential for the digestive health of rabbits, guinea pigs, and chinchillas. Sun-dried to preserve natural colour, fragrance, and nutritional value.',
    price: 16.99, originalPrice: 19.99, rating: 4.5, reviewCount: 14200, platform: 'amazon',
    pros: ['Premium quality hay', 'Sun-dried for freshness', 'Essential for digestive health', 'Large bag size'],
    cons: ['Can be dusty', 'Hay quality varies between batches'],
    brand: 'Kaytee', petType: 'small-pet', subCategory: 'Hay', tags: ['timothy-hay', 'rabbit', 'guinea-pig', 'essential'],
    aiSummary: 'Premium sun-dried Timothy hay essential for the digestive health of rabbits, guinea pigs, and chinchillas.',
    specs: { Weight: '2.7kg', Type: 'Timothy Hay (2nd Cutting)', 'Sun-Dried': 'Yes', 'Suitable For': 'Rabbits, Guinea Pigs, Chinchillas', 'Fibre': 'High' },
  },
  {
    title: 'Little Friends Mayfair Gerbilarium Large',
    description: 'A spacious two-tier gerbilarium with a deep glass base for burrowing and a wire-top section with platforms and accessories. The deep base allows gerbils to create natural tunnel systems.',
    price: 49.99, originalPrice: 59.99, rating: 4.3, reviewCount: 3600, platform: 'amazon',
    pros: ['Deep glass base for burrowing', 'Two-tier design', 'Includes accessories', 'Good ventilation'],
    cons: ['Glass base is heavy', 'Wire spacing could be smaller'],
    brand: 'Little Friends', petType: 'small-pet', subCategory: 'Cages & Enclosures', tags: ['gerbilarium', 'cage', 'glass-base', 'burrowing'],
    aiSummary: 'A two-tier gerbilarium with deep glass burrowing base and wire-top section with platforms and accessories.',
    specs: { Dimensions: '77cm x 47cm x 43cm', 'Base': '20cm Deep Glass', 'Top': 'Wire Mesh with Platforms', 'Accessories': 'Wheel, Platform, Water Bottle', 'Suitable For': 'Gerbils (pair)' },
  },
  {
    title: 'Supreme Petfoods Science Selective Guinea Pig Food 1.5kg',
    description: 'A scientifically formulated complete food fortified with vitamin C, which guinea pigs cannot produce themselves. High in fibre with Timothy hay as the main ingredient.',
    price: 7.99, originalPrice: 9.49, rating: 4.6, reviewCount: 5100, platform: 'amazon',
    pros: ['Added vitamin C', 'High fibre Timothy hay base', 'Prevents selective feeding', 'No added sugars'],
    cons: ['Some guinea pigs are fussy', 'Not always easy to find in shops'],
    brand: 'Supreme Petfoods', petType: 'small-pet', subCategory: 'Guinea Pig Food', tags: ['guinea-pig-food', 'vitamin-c', 'timothy-hay', 'complete'],
    aiSummary: 'A vitamin C-fortified Timothy hay-based food that prevents selective feeding and supports guinea pig health.',
    specs: { Weight: '1.5kg', 'Key Nutrient': 'Added Vitamin C', 'Fibre Source': 'Timothy Hay', 'Added Sugar': 'None', Format: 'Extruded Nuggets' },
  },
  {
    title: 'Savic Hamster Heaven Metro Cage',
    description: 'The ultimate hamster habitat with multiple levels, tubes, and accessories providing endless exploration opportunities. Features a large exercise wheel, water bottle, food dish, and multiple tunnel connections.',
    price: 59.99, originalPrice: 69.99, rating: 4.4, reviewCount: 7800, platform: 'amazon',
    pros: ['Huge amount of included accessories', 'Multiple levels and tubes', 'Large exercise wheel', 'Good value for size'],
    cons: ['Difficult to clean tubes', 'Ventilation could be better'],
    brand: 'Savic', petType: 'small-pet', subCategory: 'Cages & Enclosures', tags: ['hamster-cage', 'tubes', 'multi-level', 'accessories'],
    featured: true,
    aiSummary: 'A feature-packed multi-level hamster cage with extensive tube systems, exercise wheel, and all essential accessories.',
    specs: { Dimensions: '80cm x 50cm x 50cm', 'Levels': '3', 'Wheel': '20cm Diameter', 'Tubes': '5 Connecting Sections', 'Included': 'Wheel, Bottle, Dish, House' },
  },
  {
    title: 'Rosewood Naturals Trio of Fun Hanging Toys',
    description: 'A set of three natural hanging toys made from corn leaf, seagrass, and rattan. Provides essential chewing, foraging, and playing enrichment for rabbits, guinea pigs, and other small animals.',
    price: 6.99, originalPrice: 8.99, rating: 4.4, reviewCount: 4500, platform: 'amazon',
    pros: ['100% natural materials', 'Safe to chew', 'Good variety in set', 'Helps with dental health'],
    cons: ['Small pets destroy them quickly', 'Not suitable for very large rabbits'],
    brand: 'Rosewood', petType: 'small-pet', subCategory: 'Toys', tags: ['toys', 'natural', 'chew-toy', 'enrichment'],
    aiSummary: 'A trio of natural hanging toys in corn leaf, seagrass, and rattan for safe chewing and foraging enrichment.',
    specs: { 'Pack Contents': '3 Hanging Toys', Materials: 'Corn Leaf, Seagrass, Rattan', 'Safe to Chew': 'Yes', 'Suitable For': 'Rabbits, Guinea Pigs, Hamsters', 'Dental Benefit': 'Yes' },
  },
  {
    title: 'Carefresh Natural Paper Small Pet Bedding 60L',
    description: 'Ultra-absorbent natural paper bedding made from reclaimed natural fibre. Absorbs up to 3x its weight in liquid, provides superior odour control for up to 10 days, and is 99% dust-free.',
    price: 19.99, originalPrice: 24.99, rating: 4.6, reviewCount: 16800, platform: 'amazon',
    pros: ['3x absorbency', '10-day odour control', '99% dust free', 'Biodegradable and compostable'],
    cons: ['Needs regular spot cleaning', 'Can stick to cage bars'],
    brand: 'Carefresh', petType: 'small-pet', subCategory: 'Bedding', tags: ['bedding', 'paper', 'odour-control', 'dust-free'],
    isDeal: true, dealExpiry: daysAgo(-8),
    aiSummary: 'Ultra-absorbent natural paper bedding offering 10-day odour control and 99% dust-free comfort for small pets.',
    specs: { Volume: '60 litres', 'Absorbency': '3x Weight', 'Odour Control': '10 Days', 'Dust Free': '99%', Material: 'Reclaimed Natural Fibre' },
  },
  {
    title: 'Trixie Natural Living Wooden Castle for Small Animals',
    description: 'A multi-chamber wooden castle hideout made from untreated, pet-safe wood. Features multiple entrances, lookout platforms, and a flat roof that doubles as a resting platform.',
    price: 14.99, originalPrice: 18.99, rating: 4.3, reviewCount: 5200, platform: 'amazon',
    pros: ['Untreated safe wood', 'Multiple chambers', 'Roof doubles as platform', 'Sturdy construction'],
    cons: ['May be chewed through', 'Can be difficult to clean inside'],
    brand: 'Trixie', petType: 'small-pet', subCategory: 'Hideouts', tags: ['hideout', 'wooden', 'castle', 'enrichment'],
    aiSummary: 'A multi-chamber untreated wooden castle hideout with lookout platforms and multiple entrances for small pets.',
    specs: { Dimensions: '31cm x 28cm x 16cm', Material: 'Untreated Pine Wood', 'Entrances': '4', 'Chambers': '2', 'Suitable For': 'Guinea Pigs, Rabbits, Rats' },
  },
  {
    title: 'Oxbow Simple Rewards Baked Treats with Cranberry 85g',
    description: 'Wholesome baked treats made with Timothy hay and real cranberries. Hand-crafted in small batches with no artificial colours, flavours, or preservatives for healthy, guilt-free treating.',
    price: 5.99, originalPrice: 7.49, rating: 4.5, reviewCount: 3800, platform: 'amazon',
    pros: ['Timothy hay based', 'Real cranberries', 'No artificial additives', 'Small batch hand-crafted'],
    cons: ['Small bag for the price', 'Very hard texture'],
    brand: 'Oxbow', petType: 'small-pet', subCategory: 'Treats', tags: ['treats', 'baked', 'timothy-hay', 'natural'],
    aiSummary: 'Hand-crafted Timothy hay and cranberry baked treats with no artificial additives for healthy small pet treating.',
    specs: { Weight: '85g', 'Key Ingredients': 'Timothy Hay, Cranberries, Oats', 'Artificial Additives': 'None', 'Suitable For': 'Rabbits, Guinea Pigs, Chinchillas', 'Format': 'Baked Biscuit' },
  },
  {
    title: 'Niteangel Silent Spinner Hamster Wheel 25cm',
    description: 'A virtually silent exercise wheel with a dual ball-bearing system that eliminates squeaking. The solid running surface is safe for small feet and the adjustable stand allows both free-standing and cage-mount use.',
    price: 18.99, originalPrice: 22.99, rating: 4.7, reviewCount: 9600, platform: 'amazon',
    pros: ['Virtually silent', 'Solid safe running surface', 'Dual ball bearings', 'Free-standing or cage mount'],
    cons: ['Large footprint for smaller cages', 'Can wobble at high speeds'],
    brand: 'Niteangel', petType: 'small-pet', subCategory: 'Exercise', tags: ['exercise-wheel', 'silent', 'hamster', 'ball-bearing'],
    isStaffPick: true,
    aiSummary: 'A virtually silent hamster wheel with dual ball bearings and solid running surface for safe, quiet exercise.',
    specs: { Diameter: '25cm', 'Noise Level': 'Near Silent', 'Bearings': 'Dual Ball Bearing', 'Surface': 'Solid (no gaps)', 'Mounting': 'Free-Standing or Cage Clip' },
  },
  {
    title: 'Vitakraft Vita Special All Ages Rat Food 600g',
    description: 'A premium complete food specifically formulated for pet rats with lower sugar content for better health. Contains a balanced blend of grains, seeds, and vegetables with added vitamins and minerals.',
    price: 5.49, originalPrice: 6.99, rating: 4.4, reviewCount: 2600, platform: 'amazon',
    pros: ['Low sugar formula', 'Rat-specific nutrition', 'Balanced ingredient blend', 'Added vitamins'],
    cons: ['Small bag size', 'Some rats pick out favourites'],
    brand: 'Vitakraft', petType: 'small-pet', subCategory: 'Rat Food', tags: ['rat-food', 'low-sugar', 'complete', 'fortified'],
    aiSummary: 'A low-sugar complete food specifically formulated for pet rats with balanced grains, seeds, and added vitamins.',
    specs: { Weight: '600g', 'Sugar': 'Reduced', 'Suitable For': 'Rats (all ages)', 'Key Ingredients': 'Cereals, Seeds, Vegetables', 'Vitamins': 'A, D3, E, C' },
  },
  {
    title: 'Rosewood Boredom Breaker Activity Assault Course',
    description: 'A versatile activity course featuring a seesaw, hurdle, and bridge that can be used inside or outside the cage. Made from pet-safe, chew-resistant materials and encourages physical activity.',
    price: 12.99, originalPrice: 15.99, rating: 4.2, reviewCount: 3100, platform: 'amazon',
    pros: ['Three different activities', 'Indoor/outdoor use', 'Encourages exercise', 'Sturdy construction'],
    cons: ['Larger rabbits may outgrow it', 'Some animals ignore it completely'],
    brand: 'Rosewood', petType: 'small-pet', subCategory: 'Enrichment', tags: ['activity-course', 'exercise', 'enrichment', 'agility'],
    aiSummary: 'A three-piece activity assault course with seesaw, hurdle, and bridge for indoor/outdoor small pet exercise.',
    specs: { 'Components': 'Seesaw, Hurdle, Bridge', Material: 'Pet-Safe Plastic & Wood', 'Indoor/Outdoor': 'Both', 'Suitable For': 'Rabbits, Guinea Pigs', 'Assembly': 'Tool-Free' },
  },
  {
    title: 'Supreme Petfoods Tiny Friends Farm Charlie Chinchilla Food 907g',
    description: 'A specially formulated complete food for chinchillas with high fibre and low fat to match their unique dietary requirements. Contains no added sugars and is rich in natural ingredients.',
    price: 6.99, originalPrice: 8.49, rating: 4.5, reviewCount: 2200, platform: 'amazon',
    pros: ['Chinchilla-specific formula', 'High fibre low fat', 'No added sugars', 'Fortified with vitamins'],
    cons: ['Small bag size', 'Limited availability'],
    brand: 'Supreme Petfoods', petType: 'small-pet', subCategory: 'Chinchilla Food', tags: ['chinchilla-food', 'high-fibre', 'low-fat', 'complete'],
    aiSummary: 'A high-fibre, low-fat chinchilla food with no added sugars, formulated to match their unique dietary needs.',
    specs: { Weight: '907g', 'Fibre': 'High (18%)', 'Fat': 'Low (3%)', 'Added Sugar': 'None', 'Suitable For': 'Chinchillas' },
  },
  {
    title: 'Haypigs Piggy Wheek Sling Guinea Pig Carrier',
    description: 'A cosy fleece-lined guinea pig carrier with breathable mesh panels and adjustable shoulder strap. Designed specifically for transporting guinea pigs safely and comfortably to vet visits.',
    price: 24.99, originalPrice: 29.99, rating: 4.6, reviewCount: 1900, platform: 'amazon',
    pros: ['Fleece-lined comfort', 'Breathable mesh', 'Designed specifically for guinea pigs', 'Machine washable'],
    cons: ['Only fits 1-2 guinea pigs', 'Pigs may chew the fleece'],
    brand: 'Haypigs', petType: 'small-pet', subCategory: 'Carriers', tags: ['carrier', 'guinea-pig', 'fleece', 'transport'],
    aiSummary: 'A fleece-lined breathable carrier designed specifically for comfortable and safe guinea pig transport.',
    specs: { Dimensions: '30cm x 20cm x 18cm', Material: 'Fleece Lining, Mesh Panels', 'Capacity': '1-2 Guinea Pigs', 'Washable': 'Machine Washable', 'Strap': 'Adjustable Shoulder' },
  },
  {
    title: 'Chipsi Classic Wood Shavings Bedding 60L',
    description: 'Natural softwood shavings bedding that is heat-treated and dust-extracted for a safe, hygienic environment. Highly absorbent with natural odour-binding properties for a fresh-smelling cage.',
    price: 9.99, originalPrice: 12.49, rating: 4.3, reviewCount: 8900, platform: 'amazon',
    pros: ['Heat-treated for hygiene', 'Dust-extracted', 'Natural odour binding', 'Biodegradable'],
    cons: ['Can get kicked out of cage', 'Not suitable for rats or mice (cedar/pine concerns)'],
    brand: 'Chipsi', petType: 'small-pet', subCategory: 'Bedding', tags: ['bedding', 'wood-shavings', 'natural', 'absorbent'],
    aiSummary: 'Heat-treated, dust-extracted softwood shavings with natural odour-binding properties for hygienic small pet bedding.',
    specs: { Volume: '60 litres', Material: 'Softwood Shavings', 'Heat Treated': 'Yes', 'Dust Extracted': 'Yes', 'Biodegradable': 'Yes' },
  },
];

// --- Pet Health ---
const healthProducts: ProductSeed[] = [
  {
    title: 'Zesty Paws Multivitamin Chews for Dogs',
    description: 'All-in-one soft chew supplement supporting hip, joint, gut, skin, and immune health. Made with 8 functional ingredients including CoQ10, probiotics, and vitamins A, C, and E for comprehensive daily wellness.',
    price: 29.97, originalPrice: 34.99, rating: 4.6, reviewCount: 41088, platform: 'amazon',
    pros: ['All-in-one formula', 'Soft chew format dogs love', '8 functional ingredients', 'Suitable for all breeds'],
    cons: ['Large chews for small dogs', 'Contains soy'],
    brand: 'Zesty Paws', petType: 'all', subCategory: 'Supplements', tags: ['vitamins', 'supplement', 'multivitamin', 'joint-support'],
    featured: true, isStaffPick: true,
    aiSummary: 'A comprehensive all-in-one soft chew multivitamin with CoQ10, probiotics, and essential vitamins for daily dog wellness.',
    specs: { 'Chew Count': '90', 'Key Ingredients': 'CoQ10, Probiotics, Vitamins A/C/E', Format: 'Soft Chew', 'Suitable For': 'All Breeds & Ages', 'Functions': 'Joint, Gut, Skin, Immune' },
  },
  {
    title: 'YuMOVE Joint Supplement for Senior Dogs 120 Tablets',
    description: 'The UK\'s number one veterinary joint supplement, specifically formulated for older dogs with stiff and aging joints. Contains ActivEase Green Lipped Mussel for a unique source of omega-3 and glucosamine.',
    price: 32.99, originalPrice: 39.99, rating: 4.5, reviewCount: 26400, platform: 'amazon',
    pros: ['UK number one vet joint supplement', 'Visible results in 6 weeks', 'Unique ActivEase ingredient', 'Easy to administer'],
    cons: ['Must be given daily', 'Results take several weeks'],
    brand: 'YuMOVE', petType: 'dog', subCategory: 'Joint Care', tags: ['joint-supplement', 'senior-dog', 'glucosamine', 'mobility'],
    featured: true,
    aiSummary: 'The UK\'s top vet joint supplement with ActivEase Green Lipped Mussel for visible mobility improvement in 6 weeks.',
    specs: { 'Tablet Count': '120', 'Key Ingredient': 'ActivEase Green Lipped Mussel', 'Also Contains': 'Glucosamine, Hyaluronic Acid', 'Suitable For': 'Senior Dogs', 'Results': '6 Weeks' },
  },
  {
    title: 'Frontline Plus Flea & Tick Treatment for Cats 6 Pipettes',
    description: 'Veterinary-strength spot-on flea and tick treatment that kills fleas, ticks, and biting lice. Provides long-lasting protection by killing newly arrived fleas within 24 hours and ticks within 48 hours.',
    price: 22.99, originalPrice: 27.99, rating: 4.4, reviewCount: 19600, platform: 'amazon',
    pros: ['Kills fleas within 24 hours', '6 months supply', 'Waterproof once dry', 'Trusted veterinary brand'],
    cons: ['Application can be messy', 'Some cats dislike the sensation'],
    brand: 'Frontline', petType: 'cat', subCategory: 'Flea & Tick', tags: ['flea-treatment', 'tick', 'spot-on', 'cat'],
    aiSummary: 'A trusted vet-strength spot-on treatment providing 6 months of flea, tick, and lice protection for cats.',
    specs: { 'Pack Size': '6 Pipettes (6 months)', 'Kills Fleas': 'Within 24 Hours', 'Kills Ticks': 'Within 48 Hours', 'Waterproof': 'Yes (once dry)', 'Suitable For': 'Cats & Kittens (8 weeks+)' },
  },
  {
    title: 'Seresto Flea & Tick Collar for Dogs',
    description: 'An innovative polymer matrix collar that provides 8 months of continuous flea and tick protection without monthly treatments. The active ingredients are released in low concentrations over time.',
    price: 34.99, originalPrice: 39.99, rating: 4.5, reviewCount: 22800, platform: 'amazon',
    pros: ['8 months protection from one collar', 'No monthly applications', 'Water-resistant', 'Odourless'],
    cons: ['Higher upfront cost', 'Some dogs react to the collar material'],
    brand: 'Seresto', petType: 'dog', subCategory: 'Flea & Tick', tags: ['flea-collar', 'tick', 'long-lasting', 'dog'],
    isStaffPick: true,
    aiSummary: 'An innovative 8-month flea and tick protection collar that eliminates the need for monthly spot-on treatments.',
    specs: { 'Protection': '8 Months', 'Active Ingredients': 'Imidacloprid, Flumethrin', 'Water Resistant': 'Yes', 'Odourless': 'Yes', 'Dog Size': 'Over 8kg' },
  },
  {
    title: 'Vet\'s Best Enzymatic Dog Toothpaste and Toothbrush Kit',
    description: 'A complete dental care kit with enzymatic toothpaste and triple-headed toothbrush designed to clean all tooth surfaces simultaneously. The natural formula uses aloe, neem oil, and baking soda.',
    price: 8.99, originalPrice: 11.99, rating: 4.3, reviewCount: 15200, platform: 'amazon',
    pros: ['Triple-headed brush design', 'Natural enzyme formula', 'No harsh chemicals', 'Dogs like the taste'],
    cons: ['Brush may be large for small dogs', 'Toothpaste tube is small'],
    brand: "Vet's Best", petType: 'dog', subCategory: 'Dental Care', tags: ['dental-care', 'toothbrush', 'toothpaste', 'oral-health'],
    aiSummary: 'A complete dental kit with enzymatic natural toothpaste and triple-headed brush for thorough canine tooth cleaning.',
    specs: { 'Kit Contains': 'Toothbrush + 99g Toothpaste', 'Brush Type': 'Triple-Headed', 'Toothpaste': 'Enzymatic Natural Formula', 'Key Ingredients': 'Aloe, Neem Oil, Baking Soda', 'Safe If Swallowed': 'Yes' },
  },
  {
    title: 'Lintbells YuDERM Itching Dog Supplement 500ml',
    description: 'A unique blend of essential omega-3 and omega-6 oils that soothes itchy, flaky skin and promotes a glossy coat. Contains a precise ratio of evening primrose oil and fish oil for maximum effectiveness.',
    price: 19.99, originalPrice: 24.99, rating: 4.4, reviewCount: 8900, platform: 'amazon',
    pros: ['Visible coat improvement in 3-6 weeks', 'Easy liquid dosing', 'Precise omega ratio', 'Palatable for dogs'],
    cons: ['Fishy smell', 'Daily dosing required'],
    brand: 'Lintbells', petType: 'dog', subCategory: 'Skin & Coat', tags: ['skin-supplement', 'omega-oils', 'itchy-skin', 'coat-health'],
    isDeal: true, dealExpiry: daysAgo(-15),
    aiSummary: 'A precise omega-3/6 oil blend that soothes itchy skin and produces a noticeably glossy coat within 3-6 weeks.',
    specs: { Volume: '500ml', 'Key Oils': 'Evening Primrose, Fish Oil', 'Omega Ratio': 'Optimised 3:6', 'Results': '3-6 Weeks', 'Dosage': 'Based on Weight' },
  },
  {
    title: 'Drontal Dog Worming Tablets',
    description: 'A broad-spectrum worming tablet that treats all types of intestinal worms commonly found in UK dogs including roundworm, tapeworm, hookworm, and whipworm. Flavoured for easy administration.',
    price: 9.99, originalPrice: 12.99, rating: 4.5, reviewCount: 17600, platform: 'amazon',
    pros: ['Treats all common worms', 'Flavoured tablet', 'Single dose treatment', 'Vet recommended'],
    cons: ['Some dogs spit it out', 'Must be dosed by weight'],
    brand: 'Drontal', petType: 'dog', subCategory: 'Worming', tags: ['worming', 'dewormer', 'tablet', 'broad-spectrum'],
    aiSummary: 'A broad-spectrum flavoured worming tablet treating all common UK dog intestinal worms in a single dose.',
    specs: { 'Pack Size': '2 Tablets', 'Worms Treated': 'Round, Tape, Hook, Whip', 'Dog Size': 'Up to 10kg per tablet', 'Dosing': 'Single Dose', 'Flavoured': 'Yes' },
  },
  {
    title: 'Pet Head Life\'s An Itch Skin Soothing Shampoo 475ml',
    description: 'A gentle, soap-free shampoo formulated to soothe dry, itchy, and irritated skin. Made with oatmeal, aloe vera, and tea tree oil to calm inflammation while leaving the coat clean and fresh-smelling.',
    price: 7.99, originalPrice: 9.99, rating: 4.3, reviewCount: 6400, platform: 'amazon',
    pros: ['Soothes itchy skin', 'Soap-free formula', 'Pleasant scent', 'pH balanced for pets'],
    cons: ['May not lather much', 'Tea tree oil controversial for some pets'],
    brand: 'Pet Head', petType: 'all', subCategory: 'Grooming', tags: ['shampoo', 'itchy-skin', 'soothing', 'oatmeal'],
    aiSummary: 'A gentle soap-free shampoo with oatmeal, aloe, and tea tree oil to soothe dry, itchy, and irritated pet skin.',
    specs: { Volume: '475ml', 'Key Ingredients': 'Oatmeal, Aloe Vera, Tea Tree Oil', 'pH Balanced': 'Yes', 'Soap Free': 'Yes', 'Suitable For': 'Dogs & Cats' },
  },
  {
    title: 'Kokoba Pet First Aid Kit',
    description: 'A comprehensive first aid kit designed specifically for pets, containing bandages, antiseptic wipes, tick removers, scissors, and a first aid guide. Comes in a compact, durable carry case.',
    price: 19.99, originalPrice: 24.99, rating: 4.5, reviewCount: 3200, platform: 'amazon',
    pros: ['Comprehensive 40-piece kit', 'Pet-specific contents', 'Compact carry case', 'Includes first aid guide'],
    cons: ['Some items are small quantities', 'No medications included'],
    brand: 'Kokoba', petType: 'all', subCategory: 'First Aid', tags: ['first-aid', 'emergency', 'kit', 'essential'],
    aiSummary: 'A comprehensive 40-piece pet-specific first aid kit in a compact case with bandages, antiseptic, and tick removers.',
    specs: { 'Pieces': '40', 'Includes': 'Bandages, Wipes, Tick Remover, Scissors', 'Case': 'Durable Carry Case', 'Guide': 'Pet First Aid Booklet', 'Suitable For': 'All Pets' },
  },
  {
    title: 'Nutravet Nutracalm Calming Supplement for Cats & Dogs 60 Capsules',
    description: 'A natural calming supplement that helps manage stress and anxiety in pets without sedation. Contains L-tryptophan, GABA, L-theanine, and B vitamins to promote relaxation during fireworks, travel, or separation.',
    price: 16.99, originalPrice: 19.99, rating: 4.2, reviewCount: 5400, platform: 'amazon',
    pros: ['Natural ingredients', 'Non-sedating', 'Fast acting (1-2 hours)', 'Can be used daily or as needed'],
    cons: ['Capsules need to be opened for fussy pets', 'Not effective for all animals'],
    brand: 'Nutravet', petType: 'all', subCategory: 'Calming', tags: ['calming', 'anxiety', 'natural', 'supplement'],
    aiSummary: 'A fast-acting natural calming supplement with L-tryptophan and GABA to manage pet stress without sedation.',
    specs: { 'Capsule Count': '60', 'Key Ingredients': 'L-Tryptophan, GABA, L-Theanine', 'Onset': '1-2 Hours', 'Sedating': 'No', 'Usage': 'Daily or As Needed' },
  },
  {
    title: 'Johnsons 4Fleas Tablets for Dogs Over 11kg',
    description: 'Fast-acting oral flea treatment tablets that start killing fleas within 15 minutes. Contains nitenpyram which provides rapid knockdown of adult fleas for immediate relief from infestations.',
    price: 6.99, originalPrice: 8.49, rating: 4.1, reviewCount: 9800, platform: 'amazon',
    pros: ['Starts killing fleas in 15 minutes', 'Oral tablet - no mess', 'Fast relief from infestations', 'Can be used alongside other treatments'],
    cons: ['Only lasts 24 hours', 'Not a long-term preventative'],
    brand: "Johnson's", petType: 'dog', subCategory: 'Flea & Tick', tags: ['flea-tablet', 'fast-acting', 'oral', 'emergency'],
    aiSummary: 'A rapid-action oral flea tablet that starts killing fleas within 15 minutes for immediate infestation relief.',
    specs: { 'Pack Size': '6 Tablets', 'Active': 'Nitenpyram', 'Onset': '15 Minutes', 'Duration': '24 Hours', 'Dog Size': 'Over 11kg' },
  },
  {
    title: 'Mikki Ear Cleaner for Dogs and Cats 100ml',
    description: 'A gentle ear cleaning solution that dissolves wax and debris while soothing irritated ear canals. Formulated with natural ingredients including tea tree and eucalyptus for antibacterial properties.',
    price: 5.99, originalPrice: 7.99, rating: 4.3, reviewCount: 4100, platform: 'amazon',
    pros: ['Gentle natural formula', 'Dissolves wax effectively', 'Soothing for irritated ears', 'Easy dropper application'],
    cons: ['Strong herbal scent', 'Pets dislike having ears cleaned'],
    brand: 'Mikki', petType: 'all', subCategory: 'Ear Care', tags: ['ear-cleaner', 'grooming', 'hygiene', 'natural'],
    aiSummary: 'A gentle natural ear cleaning solution with tea tree and eucalyptus that dissolves wax and soothes irritation.',
    specs: { Volume: '100ml', 'Key Ingredients': 'Tea Tree Oil, Eucalyptus', Application: 'Dropper Bottle', 'Antibacterial': 'Yes', 'Suitable For': 'Dogs & Cats' },
  },
  {
    title: 'Protexin Pro-Kolin Advanced Probiotic for Dogs 60ml',
    description: 'A veterinary probiotic paste that helps restore and maintain normal intestinal function during and after episodes of diarrhoea. Contains beneficial bacteria, prebiotics, and kaolin for gut health.',
    price: 14.99, originalPrice: 17.99, rating: 4.6, reviewCount: 7200, platform: 'amazon',
    pros: ['Veterinary-grade probiotic', 'Fast-acting paste format', 'Contains prebiotics and kaolin', 'Easy syringe dosing'],
    cons: ['Small tube for large dogs', 'Must be refrigerated after opening'],
    brand: 'Protexin', petType: 'dog', subCategory: 'Digestive Health', tags: ['probiotic', 'digestive', 'diarrhoea', 'gut-health'],
    aiSummary: 'A vet-grade probiotic paste with beneficial bacteria and kaolin for rapid restoration of normal gut function.',
    specs: { Volume: '60ml', 'Key Ingredients': 'Enterococcus faecium, Pectin, Kaolin', Format: 'Oral Paste Syringe', 'Refrigerate': 'After Opening', 'Dosing': 'By Weight' },
  },
  {
    title: 'Leucillin Antiseptic Skincare Spray 250ml',
    description: 'A veterinary-approved hypochlorous acid antiseptic spray that is safe for use on all animals. Kills 99.99% of germs on contact while being non-toxic, non-irritating, and safe if licked or ingested.',
    price: 8.99, originalPrice: 11.99, rating: 4.7, reviewCount: 12600, platform: 'amazon',
    pros: ['Safe if licked', 'Kills 99.99% of germs', 'Non-stinging formula', 'Suitable for all animals'],
    cons: ['Needs frequent application', 'Spray mechanism can fail'],
    brand: 'Leucillin', petType: 'all', subCategory: 'Wound Care', tags: ['antiseptic', 'wound-care', 'spray', 'safe'],
    isStaffPick: true,
    aiSummary: 'A non-toxic antiseptic spray killing 99.99% of germs on contact, safe if licked and suitable for all animals.',
    specs: { Volume: '250ml', 'Active': 'Hypochlorous Acid', 'Kills': '99.99% of Germs', 'Safe If Licked': 'Yes', 'Suitable For': 'All Animals' },
  },
  {
    title: 'Dorwest Herbs Scullcap & Valerian Tablets 100 Tabs',
    description: 'A licensed herbal medicine for the symptomatic relief of anxiety, nervousness, and excitability in dogs and cats. Contains scullcap, valerian, gentian, and vervain for natural calming without drowsiness.',
    price: 12.99, originalPrice: 15.49, rating: 4.4, reviewCount: 6800, platform: 'amazon',
    pros: ['Licensed herbal medicine', 'No drowsiness', 'Natural ingredients', 'Can be used long-term'],
    cons: ['Tablets are large', 'Takes a few days for full effect'],
    brand: 'Dorwest', petType: 'all', subCategory: 'Calming', tags: ['calming', 'herbal', 'anxiety', 'natural-remedy'],
    aiSummary: 'A licensed herbal calming medicine with scullcap and valerian for natural anxiety relief without drowsiness.',
    specs: { 'Tablet Count': '100', 'Key Herbs': 'Scullcap, Valerian, Gentian, Vervain', 'Licensed': 'Yes (VMD)', 'Drowsiness': 'No', 'Suitable For': 'Dogs & Cats' },
  },
];

// --- Pet Accessories ---
const accessoryProducts: ProductSeed[] = [
  {
    title: 'Ancol Heritage Leather Dog Collar',
    description: 'A classic handcrafted leather collar made from premium bridle leather that softens beautifully with age. Features solid brass hardware and a traditional buckle fastening for timeless style and durability.',
    price: 16.99, originalPrice: 19.99, rating: 4.7, reviewCount: 9800, platform: 'amazon',
    pros: ['Premium bridle leather', 'Solid brass hardware', 'Ages beautifully', 'Handcrafted in UK'],
    cons: ['Leather needs conditioning', 'Stiffer when new'],
    brand: 'Ancol', petType: 'dog', subCategory: 'Collars', tags: ['collar', 'leather', 'premium', 'traditional'],
    featured: true, isStaffPick: true,
    aiSummary: 'A handcrafted premium bridle leather collar with solid brass hardware that softens and ages beautifully over time.',
    specs: { Material: 'Bridle Leather', Hardware: 'Solid Brass', 'Size Range': 'Small to XL', 'Made In': 'United Kingdom', Width: '25mm' },
  },
  {
    title: 'Catit Cabrio Cat Carrier',
    description: 'A sturdy top-and-front opening pet carrier with a removable top shell for easy vet access. Features a padded liner, secure latch system, and ventilation on all sides for comfortable travel.',
    price: 29.99, originalPrice: 36.99, rating: 4.4, reviewCount: 7600, platform: 'amazon',
    pros: ['Top and front opening', 'Removable top shell', 'Padded liner included', 'Excellent ventilation'],
    cons: ['Bulky for storage', 'Latches can be stiff'],
    brand: 'Catit', petType: 'cat', subCategory: 'Carriers', tags: ['carrier', 'cat', 'travel', 'vet-visit'],
    aiSummary: 'A dual-opening cat carrier with removable top shell and padded liner for stress-free vet visits and travel.',
    specs: { Dimensions: '51cm x 33cm x 35cm', 'Openings': 'Top & Front', 'Weight Limit': 'Up to 5kg', 'Liner': 'Padded, Removable', 'Ventilation': '360 Degree' },
  },
  {
    title: 'Ruffwear Approach Full Day Hiking Dog Pack',
    description: 'A lightweight, low-profile dog backpack designed for day hikes. Features saddlebag-style pockets, a padded handle, and a comfortable cross-chest strap system that distributes weight evenly.',
    price: 74.95, originalPrice: 84.95, rating: 4.6, reviewCount: 4200, platform: 'amazon',
    pros: ['Lightweight and comfortable', 'Reflective trim', 'Even weight distribution', 'Multiple attachment points'],
    cons: ['Expensive', 'Not for dogs under 13kg'],
    brand: 'Ruffwear', petType: 'dog', subCategory: 'Bags & Packs', tags: ['backpack', 'hiking', 'outdoor', 'adventure'],
    aiSummary: 'A lightweight saddlebag-style dog backpack with even weight distribution for comfortable day-hiking adventures.',
    specs: { 'Size Range': 'S-L/XL', 'Saddlebag Volume': '5.6L total', Material: 'Bluesign-Approved Ripstop', 'Reflective': 'Yes', 'Carry Capacity': '25% of dog weight' },
  },
  {
    title: 'PetFusion Ultimate Dog Bed Orthopaedic Memory Foam',
    description: 'A premium orthopaedic dog bed with solid 10cm memory foam base rated at 11.4kg/m3 density. The bolstered sides provide neck and joint support while the water-resistant inner liner protects the foam.',
    price: 79.99, originalPrice: 99.99, rating: 4.6, reviewCount: 16200, platform: 'amazon',
    pros: ['10cm memory foam base', 'Water-resistant inner liner', 'Removable machine-washable cover', 'Ideal for senior dogs'],
    cons: ['Heavy and bulky', 'Cover zips can catch fur'],
    brand: 'PetFusion', petType: 'dog', subCategory: 'Beds', tags: ['dog-bed', 'orthopaedic', 'memory-foam', 'senior-dog'],
    isDeal: true, dealExpiry: daysAgo(-20),
    aiSummary: 'A premium orthopaedic bed with 10cm solid memory foam and bolstered sides for superior joint support.',
    specs: { 'Foam': '10cm Solid Memory Foam', 'Density': '11.4 kg/m3', 'Cover': 'Removable, Machine Washable', 'Inner Liner': 'Water-Resistant', 'Size': 'Large (91cm x 71cm)' },
  },
  {
    title: 'ROGZ Utility Reflective Dog Lead 1.8m',
    description: 'A durable reflective dog lead made from woven nylon with a stitched-in reflective thread for night visibility. Features a heavy-duty chrome clip and comfortable padded handle for all-weather walking.',
    price: 11.99, originalPrice: 14.99, rating: 4.5, reviewCount: 5400, platform: 'amazon',
    pros: ['Built-in reflective thread', 'Heavy-duty chrome clip', 'Weather resistant', 'Padded handle'],
    cons: ['Chrome clip can be heavy for small dogs', 'Limited colour options'],
    brand: 'Rogz', petType: 'dog', subCategory: 'Leads', tags: ['lead', 'reflective', 'nylon', 'durable'],
    aiSummary: 'A durable woven nylon lead with stitched-in reflective thread and padded handle for safe all-weather walking.',
    specs: { Length: '1.8m', Width: '25mm', Material: 'Woven Nylon', 'Reflective': 'Stitched-In Thread', Clip: 'Heavy-Duty Chrome' },
  },
  {
    title: 'Curver Petlife Pet Food Storage Container 12kg',
    description: 'A stylish airtight food storage container that keeps dry pet food fresh for longer. Features a snap-lock lid, easy-pour opening, and a sleek rattan-effect design that looks great in any kitchen.',
    price: 19.99, originalPrice: 24.99, rating: 4.4, reviewCount: 8100, platform: 'amazon',
    pros: ['Airtight snap-lock lid', 'Keeps food fresh', 'Stylish rattan design', 'Easy to pour'],
    cons: ['Lid seal may wear over time', 'Not fully transparent'],
    brand: 'Curver', petType: 'all', subCategory: 'Storage', tags: ['food-storage', 'container', 'airtight', 'stylish'],
    aiSummary: 'A stylish airtight rattan-effect food storage container that keeps up to 12kg of dry pet food fresh.',
    specs: { Capacity: '12kg dry food', Dimensions: '28cm x 28cm x 50cm', 'Seal': 'Airtight Snap-Lock', Material: 'BPA-Free Plastic', Design: 'Rattan Effect' },
  },
  {
    title: 'PetKit Eversweet Solo 2 Smart Water Fountain 1.8L',
    description: 'A modern smart water fountain with ultra-quiet pump and LED water level indicator. Features a wireless design with USB charging and a replaceable quad-filtration system for clean, fresh water.',
    price: 39.99, originalPrice: 49.99, rating: 4.3, reviewCount: 6200, platform: 'amazon',
    pros: ['Ultra-quiet pump', 'Wireless USB charging', 'LED water level indicator', 'Quad-filtration system'],
    cons: ['Small capacity for multi-pet homes', 'Proprietary filters'],
    brand: 'PetKit', petType: 'all', subCategory: 'Water Fountains', tags: ['water-fountain', 'smart', 'wireless', 'filter'],
    aiSummary: 'A sleek wireless smart water fountain with ultra-quiet pump, LED indicator, and quad-filtration for clean drinking water.',
    specs: { Capacity: '1.8L', 'Pump': 'Ultra-Quiet', 'Power': 'USB-C Rechargeable', 'Filter': 'Quad-Filtration', 'Indicator': 'LED Water Level' },
  },
  {
    title: 'Pecute Dog Car Seat Cover Waterproof',
    description: 'A heavy-duty waterproof dog car seat cover that protects your back seat from dirt, hair, scratches, and moisture. Features a non-slip backing, seat anchors, and openings for seatbelts.',
    price: 24.99, originalPrice: 29.99, rating: 4.4, reviewCount: 12400, platform: 'amazon',
    pros: ['100% waterproof', 'Non-slip backing', 'Seatbelt openings', 'Universal fit'],
    cons: ['Can be hot in summer', 'Difficult to install first time'],
    brand: 'Pecute', petType: 'dog', subCategory: 'Car Accessories', tags: ['car-seat-cover', 'waterproof', 'travel', 'protection'],
    isDeal: true, dealExpiry: daysAgo(-6),
    aiSummary: 'A heavy-duty waterproof back-seat cover with non-slip backing and seatbelt openings for hassle-free dog travel.',
    specs: { 'Fit': 'Universal (137cm x 147cm)', 'Waterproof': '100%', 'Non-Slip': 'Yes', 'Seatbelt Access': 'Yes', Material: '600D Oxford Polyester' },
  },
  {
    title: 'Trixie Dog Activity Poker Box Strategy Game Level 2',
    description: 'An intermediate-level puzzle toy with sliding lids, removable cones, and hidden compartments that challenge your dog to find treats. Includes a training booklet and non-slip rubber feet.',
    price: 12.99, originalPrice: 16.99, rating: 4.3, reviewCount: 7800, platform: 'amazon',
    pros: ['Multiple challenge types', 'Non-slip rubber feet', 'Dishwasher safe', 'Training booklet included'],
    cons: ['Smart dogs solve it quickly', 'Lightweight for strong dogs'],
    brand: 'Trixie', petType: 'dog', subCategory: 'Puzzle Toys', tags: ['puzzle-toy', 'enrichment', 'interactive', 'treat-dispenser'],
    aiSummary: 'An intermediate puzzle toy with sliding lids and hidden compartments that challenge dogs to earn their treats.',
    specs: { 'Difficulty': 'Level 2 (Intermediate)', 'Challenges': 'Sliding Lids, Cones, Compartments', 'Non-Slip': 'Rubber Feet', 'Dishwasher Safe': 'Yes', Dimensions: '31cm x 31cm' },
  },
  {
    title: 'LickiMat Soother Slow Feeder Mat',
    description: 'A textured licking mat designed to spread soft food, creating a slow-feeding experience that calms and soothes anxious pets. The repetitive licking action releases endorphins that reduce stress and boredom.',
    price: 8.99, originalPrice: 10.99, rating: 4.5, reviewCount: 14600, platform: 'amazon',
    pros: ['Calming through licking', 'Slows feeding dramatically', 'Can be frozen for longer activity', 'Dishwasher safe'],
    cons: ['Only works with soft/wet food', 'Small ridges hard to clean by hand'],
    brand: 'LickiMat', petType: 'all', subCategory: 'Enrichment', tags: ['lick-mat', 'slow-feeder', 'calming', 'enrichment'],
    featured: true,
    aiSummary: 'A textured licking mat that calms pets through endorphin-releasing repetitive licking while slowing food consumption.',
    specs: { Dimensions: '20cm x 20cm', Material: 'Food-Grade TPR', 'Dishwasher Safe': 'Yes', 'Freezer Safe': 'Yes', 'Suitable For': 'Dogs & Cats' },
  },
  {
    title: 'Tractive GPS Tracker for Dogs',
    description: 'A lightweight GPS tracker that attaches to any collar and provides real-time location tracking via the Tractive app. Features virtual fence alerts, activity monitoring, and worldwide coverage.',
    price: 44.99, originalPrice: 49.99, rating: 4.2, reviewCount: 11800, platform: 'amazon',
    pros: ['Real-time GPS tracking', 'Virtual fence alerts', 'Activity monitoring', 'Waterproof (IPX7)'],
    cons: ['Requires monthly subscription', 'Battery lasts 2-5 days'],
    brand: 'Tractive', petType: 'dog', subCategory: 'Tech & Trackers', tags: ['GPS-tracker', 'smart', 'safety', 'location'],
    isStaffPick: true,
    aiSummary: 'A lightweight waterproof GPS tracker with real-time location, virtual fences, and activity monitoring via smartphone app.',
    specs: { Weight: '35g', 'Battery Life': '2-5 Days', 'Tracking': 'Real-Time GPS', 'Waterproof': 'IPX7', 'Subscription': 'Required (from \u00a33.75/month)' },
  },
  {
    title: 'Petface Outdoor Paws Rope Dog Toy Set of 5',
    description: 'A value pack of five colourful rope toys in different shapes and sizes for tugging, fetching, and chewing. Made from durable cotton rope that also helps clean teeth during play.',
    price: 9.99, originalPrice: 12.99, rating: 4.3, reviewCount: 8400, platform: 'amazon',
    pros: ['Five toys in one pack', 'Dental cleaning benefit', 'Multiple play styles', 'Durable cotton rope'],
    cons: ['Strings can unravel', 'Not for aggressive chewers'],
    brand: 'Petface', petType: 'dog', subCategory: 'Toys', tags: ['rope-toy', 'value-pack', 'dental', 'tug-toy'],
    aiSummary: 'A five-piece colourful cotton rope toy set for tugging, fetching, and teeth-cleaning play at great value.',
    specs: { 'Pack Size': '5 Toys', Material: 'Cotton Rope', 'Toy Types': 'Tug, Knot, Ring, Ball, Fetch', 'Dental Benefit': 'Yes', 'Suitable For': 'Medium Dogs' },
  },
  {
    title: 'Sleepypod Air In-Cabin Pet Carrier',
    description: 'An airline-approved in-cabin pet carrier that fits under most airline seats. Features a plush bedding liner, luggage strap, and zip-down mesh sides for ventilation during flights.',
    price: 64.99, originalPrice: 74.99, rating: 4.5, reviewCount: 3600, platform: 'amazon',
    pros: ['Airline approved', 'Plush bedding liner', 'Fits under most seats', 'Luggage strap included'],
    cons: ['Limited to small pets', 'Expensive for occasional use'],
    brand: 'Sleepypod', petType: 'all', subCategory: 'Carriers', tags: ['carrier', 'airline', 'travel', 'in-cabin'],
    aiSummary: 'An airline-approved in-cabin carrier with plush liner, mesh ventilation, and luggage strap for stress-free flying.',
    specs: { Dimensions: '45cm x 25cm x 25cm', 'Airline Approved': 'Yes (most airlines)', 'Pet Weight': 'Up to 7kg', 'Bedding': 'Plush Removable Liner', 'Features': 'Luggage Strap, Mesh Sides' },
  },
  {
    title: 'Kong Zoom Groom Multi-Use Brush',
    description: 'A flexible rubber grooming brush that attracts loose hair like a magnet while providing a soothing massage. Works on wet or dry coats, can be used with shampoo during baths, and is easy to clean.',
    price: 7.99, originalPrice: 9.99, rating: 4.5, reviewCount: 10200, platform: 'amazon',
    pros: ['Attracts hair like a magnet', 'Massage-like grooming', 'Works wet or dry', 'Easy to clean'],
    cons: ['Less effective on thick undercoats', 'Soft rubber wears over time'],
    brand: 'KONG', petType: 'all', subCategory: 'Grooming', tags: ['grooming-brush', 'rubber', 'massage', 'deshedding'],
    aiSummary: 'A flexible rubber grooming brush that magnetically attracts loose hair while providing a soothing massage experience.',
    specs: { Material: 'Natural Rubber', 'Use': 'Wet or Dry', 'Coat Types': 'Short to Medium', 'Massage': 'Yes', 'Suitable For': 'Dogs & Cats' },
  },
  {
    title: 'Petsafe Drinkwell Platinum Pet Fountain 5L',
    description: 'A large-capacity pet water fountain with free-falling water stream that encourages hydration. Features a replaceable carbon water filter, adjustable flow control, and a receiving ramp for quiet operation.',
    price: 34.99, originalPrice: 42.99, rating: 4.3, reviewCount: 9400, platform: 'amazon',
    pros: ['Large 5L capacity', 'Free-falling stream encourages drinking', 'Adjustable flow control', 'Quiet operation'],
    cons: ['Motor needs regular cleaning', 'BPA-free plastic can stain'],
    brand: 'PetSafe', petType: 'all', subCategory: 'Water Fountains', tags: ['water-fountain', 'large-capacity', 'filter', 'hydration'],
    aiSummary: 'A large 5L water fountain with free-falling stream, carbon filtration, and adjustable flow for pet hydration.',
    specs: { Capacity: '5 litres', 'Filter': 'Replaceable Carbon', 'Flow': 'Adjustable', 'Ramp': 'Receiving Ramp (quiet)', Material: 'BPA-Free Plastic' },
  },
];

// ─── Article Data ───────────────────────────────────────────────────────────

interface ArticleSeed {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  petType: string;
  heroImage?: string;
  heroImageAlt: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorBio: string;
  authorCredentials: string;
  reviewerName: string;
  reviewerCredentials: string;
  readTime: number;
  isFeatured: boolean;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  faqs: { question: string; answer: string }[];
  publishedDaysAgo: number;
  categorySlug: string;
}

const articlesData: ArticleSeed[] = [
  // --- Blog Posts ---
  {
    slug: 'ultimate-guide-to-puppy-nutrition',
    title: 'The Ultimate Guide to Puppy Nutrition in 2026',
    subtitle: 'Everything you need to know about feeding your puppy for optimal growth and health',
    type: 'blog-post',
    petType: 'dog',
    heroImage: '/_candidates/06_photo-1450778869180-41d0601e046e.jpg',
    heroImageAlt: 'A happy puppy eating from a bowl of nutritious food',
    excerpt: 'Getting your puppy\'s nutrition right from the start sets the foundation for a long, healthy life. This comprehensive guide covers everything from choosing the right food to establishing healthy feeding habits.',
    content: `## Why Puppy Nutrition Matters

Getting nutrition right during your puppy's first year is one of the most impactful decisions you'll make as a new dog owner. During this critical growth period, puppies need a carefully balanced diet that supports rapid bone development, muscle growth, cognitive function, and immune system maturation.

Unlike adult dogs, puppies have significantly higher caloric and nutritional requirements relative to their body weight. A large-breed puppy, for example, will increase its birth weight by 60 to 70 times within the first year. This explosive growth demands precise nutritional support that generic dog food simply cannot provide.

## Choosing the Right Puppy Food

When selecting a puppy food, look for products that meet FEDIAF (European) or AAFCO (American) nutritional standards for growth. The label should clearly state it is formulated for "growth" or "all life stages." Avoid foods labelled only for adult maintenance, as these lack the higher protein, fat, and mineral content puppies need.

Premium brands like Royal Canin, Hill's Science Plan, and Purina Pro Plan offer breed-size-specific puppy formulas. Large-breed puppy foods contain controlled calcium and phosphorus levels to prevent skeletal problems, while small-breed formulas offer energy-dense kibble sized for tiny mouths.

## Feeding Schedule and Portions

Puppies under four months old typically need four meals per day. Between four and six months, you can reduce to three meals daily. Most puppies can transition to twice-daily feeding from six months onward, which is a schedule many owners maintain for life.

Always follow the manufacturer's feeding guidelines as a starting point, then adjust based on your puppy's body condition. You should be able to feel (but not see) your puppy's ribs, and they should have a visible waist when viewed from above. Your veterinarian can help you assess body condition at each check-up.

## Common Nutritional Mistakes

One of the most frequent errors new puppy owners make is over-supplementing. If you're feeding a complete puppy food, adding calcium or vitamin supplements can actually cause more harm than good, particularly in large breeds where excess calcium contributes to developmental orthopaedic disease.

Another common mistake is feeding too many treats. Treats should make up no more than 10% of your puppy's daily caloric intake. Choose healthy options like small pieces of carrot, apple (without seeds), or purpose-made puppy training treats rather than fatty human food scraps.`,
    authorName: 'Dr. Sarah Mitchell',
    authorBio: 'Veterinary nutritionist with 15 years of experience in companion animal dietetics.',
    authorCredentials: 'BVSc, MRCVS, Dip ECVCN',
    reviewerName: 'James Patterson',
    reviewerCredentials: 'Senior Pet Editor',
    readTime: 8,
    isFeatured: true,
    seoTitle: 'Ultimate Guide to Puppy Nutrition 2026 | Expert Feeding Advice',
    metaDescription: 'Expert veterinary guide to puppy nutrition covering food selection, feeding schedules, portions, and common mistakes. Everything you need for a healthy puppy.',
    focusKeyword: 'puppy nutrition',
    faqs: [
      { question: 'When should I switch from puppy to adult food?', answer: 'Small breeds can switch at 9-12 months, medium breeds at 12 months, and large/giant breeds at 12-24 months. Consult your vet for breed-specific guidance.' },
      { question: 'Can I feed my puppy raw food?', answer: 'Raw diets are controversial. If you choose raw feeding, work with a veterinary nutritionist to ensure the diet is complete and balanced for growth. Be aware of bacterial contamination risks.' },
      { question: 'How much water should a puppy drink?', answer: 'Puppies should have constant access to fresh water. As a guide, they need approximately 60ml per kilogram of body weight per day, but this varies with activity and temperature.' },
    ],
    publishedDaysAgo: 5,
    categorySlug: 'dog-supplies',
  },
  {
    slug: 'indoor-cat-enrichment-ideas',
    title: '15 Enrichment Ideas to Keep Your Indoor Cat Happy and Healthy',
    subtitle: 'Creative ways to stimulate your indoor cat\'s mind and body',
    type: 'blog-post',
    petType: 'cat',
    heroImage: '/_candidates/094_photo-1537151608828-ea2b11777ee8.jpg',
    heroImageAlt: 'An indoor cat playing with an interactive puzzle feeder',
    excerpt: 'Indoor cats live longer, safer lives, but without proper enrichment they can develop behavioural problems and health issues. Discover 15 proven enrichment strategies that will transform your cat\'s indoor experience.',
    content: `## The Indoor Cat Dilemma

Keeping cats indoors dramatically increases their life expectancy, with indoor cats living an average of 12-18 years compared to just 2-5 years for outdoor cats in urban environments. However, the indoor environment can be understimulating for an animal whose wild ancestors spent much of their day hunting, exploring, and defending territory.

Without adequate enrichment, indoor cats commonly develop obesity, behavioural problems like furniture scratching and inappropriate elimination, over-grooming, and even depression. The good news is that with some creativity and relatively small investments, you can create an indoor environment that satisfies all of your cat's natural instincts.

## Vertical Space and Climbing

Cats are natural climbers, and adding vertical space is one of the most effective enrichment strategies. Cat trees, wall-mounted shelves, and window perches give your cat the elevated vantage points they instinctively crave. A well-placed cat tree near a window provides hours of "cat TV" as your feline watches birds, squirrels, and the world go by.

Consider creating a cat highway along your walls using sturdy floating shelves or purpose-built cat walkways. Brands like Catit and Go Pet Club offer excellent multi-level cat trees that combine climbing, scratching, and hiding opportunities in a single structure.

## Puzzle Feeders and Food Enrichment

In the wild, cats spend a significant portion of their day hunting for food. Serving meals in a standard bowl eliminates this natural behaviour entirely. Puzzle feeders like the Trixie 5-in-1 Activity Fun Board or simple DIY solutions like hiding kibble in egg cartons can transform mealtimes into engaging mental challenges.

Start with easy puzzles and gradually increase difficulty as your cat masters each level. Scatter feeding, where you distribute kibble around the house for your cat to find, is another simple but effective strategy that encourages movement and exploration.

## Interactive Play Sessions

Dedicated interactive play sessions are essential for indoor cats. Wand toys that mimic prey movement, such as feather teasers and fishing-rod toys, tap into your cat's hunting instinct and provide crucial exercise. Aim for two 15-minute play sessions daily, ideally before meals to simulate the hunt-catch-eat cycle.

Rotate toys regularly to prevent boredom, keeping only 3-4 toys available at a time and swapping them weekly. Toys infused with catnip or silver vine can reignite interest in familiar items. Automated toys like laser pointers (always end with a tangible "catch") and battery-powered mice are useful supplements when you're away.

## Sensory Enrichment

Don't forget about your cat's other senses. Cat-safe plants like cat grass and catnip provide olfactory stimulation, while bird feeder cameras or aquarium screensavers offer visual entertainment. Some cats enjoy gentle background music or specialised "music for cats" compositions that use frequencies within the feline hearing range.`,
    authorName: 'Emma Wilson',
    authorBio: 'Certified feline behaviour consultant specialising in indoor cat welfare and enrichment.',
    authorCredentials: 'CCBC, AABP Member',
    reviewerName: 'Dr. Sarah Mitchell',
    reviewerCredentials: 'BVSc, MRCVS',
    readTime: 10,
    isFeatured: true,
    seoTitle: '15 Indoor Cat Enrichment Ideas | Keep Your Cat Happy Inside',
    metaDescription: 'Discover 15 expert-approved enrichment ideas for indoor cats including puzzle feeders, vertical space, interactive play, and sensory stimulation.',
    focusKeyword: 'indoor cat enrichment',
    faqs: [
      { question: 'How many toys does an indoor cat need?', answer: 'Keep 3-4 toys available and rotate weekly. Quality of play interaction matters more than quantity of toys.' },
      { question: 'Is it cruel to keep a cat indoors?', answer: 'No. With proper enrichment, indoor cats live longer, healthier lives. The key is providing outlets for natural behaviours like climbing, hunting, and exploring.' },
      { question: 'Can I train my indoor cat to walk on a lead?', answer: 'Yes! Many cats can be trained to walk on a harness and lead. Start indoors, use positive reinforcement, and be patient. It can take weeks for a cat to feel comfortable.' },
    ],
    publishedDaysAgo: 12,
    categorySlug: 'cat-products',
  },
  // --- Buyer's Guides ---
  {
    slug: 'best-dog-harnesses-2026',
    heroImage: '/_candidates/25_photo-1530281700549-e82e7bf110d6.jpg',
    title: 'The 7 Best Dog Harnesses for 2026: Tested and Reviewed',
    subtitle: 'Our experts tested 23 harnesses to find the best options for every dog and walking style',
    type: 'buyers-guide',
    petType: 'dog',
    heroImageAlt: 'A selection of premium dog harnesses laid out for comparison',
    excerpt: 'We tested 23 dog harnesses over three months with dogs of all sizes to bring you the definitive guide. From no-pull training harnesses to lightweight adventure gear, here are the seven best options for 2026.',
    content: `## How We Tested

Over a three-month testing period, our team evaluated 23 dog harnesses across five key criteria: fit and comfort, ease of use, durability, pulling control, and value for money. We tested each harness with multiple dogs ranging from a 4kg Chihuahua to a 45kg German Shepherd, across various walking conditions including urban pavements, muddy trails, and rainy British weather.

Each harness was scored on a 100-point scale, with 25 points allocated to comfort, 20 to durability, 20 to ease of use, 20 to pulling control, and 15 to value for money. We also consulted with veterinary physiotherapists to ensure our top picks don't restrict natural movement or cause long-term issues.

## Our Top Pick: Ruffwear Front Range Harness

The Ruffwear Front Range earned our top recommendation for its exceptional combination of comfort, durability, and versatility. The padded chest and belly panels distribute pressure evenly, while the dual leash attachment points (front and back) give you flexibility in how you walk your dog.

The four points of adjustment ensure a snug, customised fit for most body types, and the reflective trim provides excellent visibility during dark winter walks. At around forty pounds, it's not the cheapest option, but the build quality justifies the investment. We've been using our test harness daily for three months with zero signs of wear.

## Best Budget Pick: Julius-K9 IDC Powerharness

If you're looking for a reliable harness without the premium price tag, the Julius-K9 IDC Powerharness is hard to beat. It's incredibly easy to put on thanks to the single chest buckle design, and the sturdy handle on the back is genuinely useful for lifting dogs over obstacles or maintaining control in tricky situations.

The reflective elements are generous, and the hook-and-loop panels for customisation are a fun bonus. Our main criticism is that it only has a back attachment point, which makes it less effective for dogs that pull. For casual walkers with well-trained dogs, though, it's an excellent choice.

## Best for Pullers: Halti No-Pull Harness

For dogs that treat walks as a sled-pulling competition, the Halti No-Pull Harness offers the best pulling control in our test. The unique front-attachment design redirects your dog's momentum towards you when they pull, making walks immediately more manageable without causing discomfort.

The padded straps and mesh panels keep your dog comfortable even during longer walks, and the adjustable fit means it works for a wide range of body shapes. It does require a bit more fiddling to put on compared to simpler designs, but the pulling control it provides is worth the extra few seconds.

## What to Look For in a Dog Harness

When choosing a harness, consider your dog's size, walking behaviour, and the type of walks you typically do. No-pull front-clip harnesses are ideal for training, while back-clip harnesses suit well-behaved dogs. Measure your dog carefully using the manufacturer's size guide, and look for adjustable straps that allow you to fine-tune the fit over time.`,
    authorName: 'James Patterson',
    authorBio: 'Senior pet product reviewer with 8 years of experience testing gear for dogs of all sizes.',
    authorCredentials: 'Senior Pet Editor, 8+ years testing',
    reviewerName: 'Dr. Sarah Mitchell',
    reviewerCredentials: 'BVSc, MRCVS',
    readTime: 12,
    isFeatured: true,
    seoTitle: 'Best Dog Harnesses 2026 | 23 Tested & 7 Expert Picks',
    metaDescription: 'We tested 23 dog harnesses over 3 months to find the 7 best for 2026. Expert picks for every budget, dog size, and walking style.',
    focusKeyword: 'best dog harnesses',
    faqs: [
      { question: 'Are harnesses better than collars for dogs?', answer: 'For most dogs, yes. Harnesses distribute pressure across the chest rather than concentrating it on the neck, reducing the risk of tracheal damage and giving you better control.' },
      { question: 'What size harness does my dog need?', answer: 'Measure your dog\'s girth (the widest part of their ribcage) and consult the manufacturer\'s size chart. Most harnesses should allow you to fit two fingers between the harness and your dog.' },
      { question: 'How do I stop my dog pulling on a harness?', answer: 'Use a front-clip harness for pulling dogs. When your dog pulls, stop walking and wait for slack in the lead before continuing. Pair this with positive reinforcement training for best results.' },
    ],
    publishedDaysAgo: 18,
    categorySlug: 'pet-accessories',
  },
  {
    slug: 'best-aquarium-filters-beginners',
    heroImage: '/_candidates/68_photo-1560809451-9e77c2e8214a.jpg',
    title: 'Best Aquarium Filters for Beginners: A Complete Buying Guide',
    subtitle: 'Choosing the right filter is the single most important decision for a healthy aquarium',
    type: 'buyers-guide',
    petType: 'fish',
    heroImageAlt: 'Various aquarium filters arranged next to a planted tank',
    excerpt: 'Your filter is the life support system of your aquarium. This beginner-friendly guide explains the different filter types, what to look for, and our top recommendations for tanks of every size.',
    content: `## Why Filtration Matters

Aquarium filtration is the foundation of a healthy fish tank. Without adequate filtration, toxic ammonia and nitrite from fish waste accumulate rapidly, poisoning your fish within days. A good filter performs three essential functions: mechanical filtration (removing debris), biological filtration (converting toxic ammonia to less harmful nitrate), and chemical filtration (removing dissolved pollutants).

Of these three, biological filtration is the most critical. Beneficial bacteria colonise the filter media and break down ammonia through the nitrogen cycle. This is why you should never replace all filter media at once or rinse it under tap water, as chlorine kills these essential bacteria.

## Types of Aquarium Filters

Internal filters sit inside the tank and are ideal for small aquariums up to about 100 litres. They're affordable, easy to maintain, and quiet. However, they take up space inside the tank and have limited media capacity. Popular options include the Fluval U Series and JBL CristalProfi i range.

External canister filters sit outside the tank in the cabinet below. They offer the best filtration capacity, are completely hidden from view, and are ideal for tanks over 100 litres. Premium options like the JBL CristalProfi e1502 and Oase BioMaster deliver outstanding performance. The downside is a higher price point and slightly more complex maintenance.

Hang-on-back filters (HOB) offer a middle ground, hanging on the tank rim with the motor inside the tank and the filter box outside. They're popular in the US but less common in the UK market.

## Choosing the Right Filter Size

A common rule of thumb is to choose a filter rated for 4-10 times your tank volume per hour. So a 100-litre tank would need a filter with a flow rate of 400-1000 litres per hour. For heavily stocked tanks or messy fish like goldfish and cichlids, aim for the higher end of this range.

Don't be afraid to over-filter. A filter rated for a larger tank than yours won't harm your fish but will provide more stable water quality and require less frequent maintenance. Just ensure the flow rate isn't so strong that it creates uncomfortable currents for slow-swimming species.

## Our Top Picks by Tank Size

For nano tanks (up to 30L), the Fluval Spec filter system provides excellent built-in filtration. For community tanks (60-200L), the JBL CristalProfi e902 offers outstanding value. For larger setups (200L+), the JBL CristalProfi e1502 Greenline is our top recommendation for its whisper-quiet operation, energy efficiency, and generous media capacity.`,
    authorName: 'Tom Richards',
    authorBio: 'Aquarist and fishkeeping journalist with 20 years of experience maintaining tropical and marine aquariums.',
    authorCredentials: 'OATA Member, 20+ Years Fishkeeping',
    reviewerName: 'James Patterson',
    reviewerCredentials: 'Senior Pet Editor',
    readTime: 11,
    isFeatured: false,
    seoTitle: 'Best Aquarium Filters for Beginners 2026 | Complete Buying Guide',
    metaDescription: 'Complete beginner guide to aquarium filters. Learn filter types, sizing rules, and our expert picks for every tank size and budget.',
    focusKeyword: 'best aquarium filters',
    faqs: [
      { question: 'How often should I clean my aquarium filter?', answer: 'Clean mechanical media every 2-4 weeks by rinsing in old tank water (never tap water). Biological media should rarely be disturbed. Replace chemical media (carbon) monthly.' },
      { question: 'Can I turn my filter off at night?', answer: 'No. The beneficial bacteria in your filter need constant oxygenated water flow. Turning it off even for a few hours can cause a bacterial die-off and a dangerous ammonia spike.' },
      { question: 'Do I need a filter if I have live plants?', answer: 'Yes. While plants help absorb nitrate, they cannot process ammonia and nitrite fast enough to keep fish safe. A filter is always necessary in a stocked aquarium.' },
    ],
    publishedDaysAgo: 25,
    categorySlug: 'fish-and-aquatics',
  },
  // --- Comparisons ---
  {
    slug: 'royal-canin-vs-hills-science-plan',
    heroImage: '/_candidates/02_photo-1509205477838-a534e43a849f.jpg',
    title: 'Royal Canin vs Hill\'s Science Plan: Which Premium Cat Food Is Better?',
    subtitle: 'An in-depth nutritional comparison of two veterinary-recommended cat food brands',
    type: 'comparison',
    petType: 'cat',
    heroImageAlt: 'Royal Canin and Hills Science Plan cat food bags side by side',
    excerpt: 'Royal Canin and Hill\'s Science Plan are two of the most recommended premium cat food brands by veterinarians. But which one is actually better for your cat? We compare ingredients, nutrition, variety, and value.',
    content: `## The Premium Cat Food Showdown

When your veterinarian recommends a premium cat food, chances are they'll mention Royal Canin or Hill's Science Plan. Both brands have earned their reputation through decades of scientific research and veterinary endorsement. But for cat owners choosing between them, the differences can be confusing.

We've spent three months analysing ingredients lists, nutritional profiles, product ranges, and real-world feeding results to bring you the most comprehensive comparison of these two premium brands available anywhere online.

## Ingredients and Nutritional Philosophy

Royal Canin takes a function-first approach to nutrition, focusing on the nutritional profile rather than ingredient aesthetics. They use ingredients like "dehydrated poultry protein" and "animal fats" that sound less appealing to humans but are highly digestible for cats. Their formulas are backed by extensive feeding trials and are precisely calibrated for specific life stages, breeds, and health conditions.

Hill's Science Plan emphasises clinically proven antioxidant blends and high-quality protein sources. Their ingredient lists tend to read more transparently, with named meat sources like "chicken" appearing prominently. Hill's also boasts an extensive range of prescription diets through their Science Diet and Prescription Diet lines for cats with specific medical conditions.

## Product Range Comparison

Royal Canin wins on variety with an astonishing range of breed-specific formulas (Maine Coon, Persian, Siamese, etc.) alongside life-stage and condition-specific options. This level of customisation is unmatched in the industry. If you have a pedigree cat, there's likely a Royal Canin formula designed specifically for their breed.

Hill's offers fewer breed-specific options but excels in their therapeutic diet range. Their Prescription Diet line covers virtually every feline health condition, from kidney disease to obesity, and many veterinary practices stock Hill's as their primary recommendation for diet-managed conditions.

## Price and Value

Both brands sit at the premium end of the market, with prices significantly above supermarket brands. Royal Canin tends to be marginally more expensive, particularly for their breed-specific formulas. However, the cost per day difference between the two brands is typically less than 20p, making this a minor factor in the decision.

Both brands offer loyalty programmes and subscription services that can reduce costs by 10-15%. When you factor in the potential veterinary savings from feeding a premium diet (better dental health, healthier weight, fewer digestive issues), both represent genuine value despite their higher shelf price.

## Our Verdict

There's no definitive winner here - both are excellent choices. If you have a pedigree cat or want highly specific formulation, Royal Canin's breed-specific range is unbeatable. If you prefer more transparent ingredient labelling or your cat has a medical condition requiring dietary management, Hill's Science Plan is the stronger choice.`,
    authorName: 'Dr. Sarah Mitchell',
    authorBio: 'Veterinary nutritionist with 15 years of experience in companion animal dietetics.',
    authorCredentials: 'BVSc, MRCVS, Dip ECVCN',
    reviewerName: 'Emma Wilson',
    reviewerCredentials: 'CCBC, AABP Member',
    readTime: 9,
    isFeatured: false,
    seoTitle: "Royal Canin vs Hill's Science Plan Cat Food | Expert Comparison",
    metaDescription: "In-depth comparison of Royal Canin and Hill's Science Plan cat food. Expert analysis of ingredients, nutrition, variety, price, and which is best for your cat.",
    focusKeyword: "royal canin vs hills",
    faqs: [
      { question: 'Which do vets recommend more, Royal Canin or Hill\'s?', answer: 'Both are equally recommended by veterinarians. Individual vet preferences often depend on which brand they have a commercial relationship with, rather than significant quality differences.' },
      { question: 'Can I mix Royal Canin and Hill\'s together?', answer: 'While it won\'t harm your cat, mixing defeats the purpose of precisely formulated nutrition. Stick with one brand and formula for consistent nutrition.' },
      { question: 'Are Royal Canin and Hill\'s worth the price?', answer: 'For most cats, yes. The quality control, nutritional research, and feeding trial data behind these brands offers reassurance that generic brands cannot match.' },
    ],
    publishedDaysAgo: 32,
    categorySlug: 'cat-products',
  },
  {
    slug: 'paper-bedding-vs-wood-shavings-small-pets',
    heroImage: '/_candidates/40_photo-1504579264001-833438f93df2.jpg',
    title: 'Paper Bedding vs Wood Shavings: Which Is Best for Your Small Pet?',
    subtitle: 'A detailed comparison of the two most popular small pet bedding types',
    type: 'comparison',
    petType: 'small-pet',
    heroImageAlt: 'Paper bedding and wood shavings side by side in guinea pig enclosures',
    excerpt: 'Choosing between paper bedding and wood shavings is one of the first decisions small pet owners face. We compare absorbency, odour control, dust levels, cost, and safety to help you make the right choice.',
    content: `## The Great Bedding Debate

Walk into any pet shop and you'll find two dominant bedding options for small pets: paper-based bedding (like Carefresh) and wood shavings (like Chipsi). Both have passionate advocates, and both have genuine strengths. But which is actually better for your rabbit, guinea pig, hamster, or gerbil?

We conducted a four-week side-by-side comparison test using identical enclosures with matched pairs of guinea pigs. We measured absorbency, odour development, dust levels, and overall cleanliness at regular intervals to bring you data-driven answers rather than opinions.

## Absorbency Test Results

Paper bedding won the absorbency test convincingly. Carefresh Natural absorbed approximately three times its weight in liquid, compared to approximately 1.5 times for Chipsi Classic wood shavings. This translated to noticeably drier cage floors and cleaner animals when using paper bedding, particularly in high-traffic areas around water bottles and food dishes.

However, wood shavings performed better in the "spot-cleaning" test. Wet wood shavings are easy to identify and scoop out, while wet paper bedding tends to clump and stick to the cage floor, making spot cleaning slightly more time-consuming.

## Odour Control Comparison

Odour control showed more nuanced results. Wood shavings provided better initial odour masking thanks to their natural pine or spruce scent. For the first two days after a full cage clean, shavings kept the enclosure smelling fresher.

However, paper bedding maintained acceptable odour levels for significantly longer, likely due to its superior absorbency preventing urine pooling. By day five, the wood shavings enclosure was noticeably more pungent than the paper bedding enclosure. If you prefer longer intervals between full cage cleans, paper bedding has the advantage.

## Safety Considerations

This is where the comparison becomes most important. Certain wood shavings, particularly those from cedar and untreated pine, release phenols (aromatic hydrocarbons) that can cause respiratory irritation and liver damage in small animals, especially rats and mice. Heat-treated kiln-dried shavings, like Chipsi Classic, have significantly reduced phenol content and are generally considered safe for most species.

Paper bedding is universally considered safe for all small pet species. It produces virtually no dust (Carefresh claims 99% dust-free), making it the clear choice for animals with respiratory sensitivities or for owners who experience allergies.

## Cost Analysis

Wood shavings win on cost by a significant margin. Per litre, wood shavings typically cost 50-70% less than paper bedding. For owners with large enclosures or multiple small pets, this cost difference adds up over time. However, if paper bedding's superior absorbency means you can go longer between full changes, the actual cost difference narrows.`,
    authorName: 'Emma Wilson',
    authorBio: 'Certified feline behaviour consultant and experienced small pet owner with expertise in enclosure design and husbandry.',
    authorCredentials: 'Small Animal Husbandry Certificate',
    reviewerName: 'Dr. Sarah Mitchell',
    reviewerCredentials: 'BVSc, MRCVS',
    readTime: 8,
    isFeatured: false,
    seoTitle: 'Paper Bedding vs Wood Shavings for Small Pets | Side-by-Side Test',
    metaDescription: 'We tested paper bedding vs wood shavings over 4 weeks. Compare absorbency, odour control, safety, dust, and cost for rabbits, guinea pigs, and hamsters.',
    focusKeyword: 'paper bedding vs wood shavings',
    faqs: [
      { question: 'Are wood shavings safe for hamsters?', answer: 'Kiln-dried, heat-treated wood shavings (like Chipsi) are generally safe. Avoid cedar shavings entirely and untreated pine, as the phenols can damage hamster respiratory systems.' },
      { question: 'How often should I change small pet bedding?', answer: 'Spot-clean daily and do a full bedding change every 5-7 days. Paper bedding may last slightly longer between full changes due to better absorbency.' },
      { question: 'Can I use newspaper as small pet bedding?', answer: 'Plain newsprint is safe but offers poor absorbency and no odour control. Modern paper bedding products are vastly superior. If cost is a concern, shredded paper from a cross-cut shredder is a better DIY option.' },
    ],
    publishedDaysAgo: 40,
    categorySlug: 'small-pets',
  },
  // --- News ---
  {
    slug: 'uk-pet-food-regulations-2026-update',
    heroImage: '/_candidates/10_photo-1573435567032-ff5982925350.jpg',
    title: 'New UK Pet Food Labelling Regulations Coming into Force March 2026',
    subtitle: 'What the updated PFMA guidelines mean for pet owners and manufacturers',
    type: 'news',
    petType: 'all',
    heroImageAlt: 'Pet food labels being inspected under new UK regulations',
    excerpt: 'Significant changes to UK pet food labelling requirements are coming into effect this spring, bringing greater transparency about ingredients, nutritional content, and country of origin. Here\'s what pet owners need to know.',
    content: `## Major Labelling Overhaul Announced

The Pet Food Manufacturers' Association (PFMA) has announced that updated pet food labelling guidelines will come into force across the UK from March 2026. These changes represent the most significant overhaul of pet food packaging requirements in over a decade and are designed to give pet owners clearer, more transparent information about what they're feeding their animals.

The new regulations follow two years of consultation with veterinary nutritionists, consumer groups, and industry stakeholders. They align with broader food industry transparency trends while addressing concerns specific to the pet food market.

## Key Changes for Pet Owners

The most impactful change for consumers is the requirement for clearer percentage declarations of meat and animal-derived ingredients. Currently, manufacturers can use vague terms like "meat and animal derivatives." Under the new guidelines, they must specify the type of meat, the percentage, and whether it's fresh, dried, or rendered.

Additionally, the term "natural" will now have a legal definition in pet food labelling. Products claiming to be "natural" must contain at least 95% naturally derived ingredients, with any synthetic additions (such as vitamins and minerals) clearly identified. This addresses widespread concerns about "greenwashing" in the pet food industry.

## Country of Origin Requirements

For the first time, pet food sold in the UK will need to clearly display where the product was manufactured, not just where the brand is headquartered. This change is particularly relevant for brands that design products in the UK but manufacture overseas.

The country of origin of primary animal-protein ingredients must also be disclosed if different from the manufacturing country. This gives pet owners who prefer locally sourced products the information they need to make informed choices.

## Industry Response

Reaction from the pet food industry has been mixed. Premium brands like Lily's Kitchen and Forthglade have welcomed the changes, noting that they already exceed most of the new requirements. Mass-market manufacturers have expressed concerns about implementation costs and the timeline for compliance, though the PFMA has provided a 12-month transition period.

Retail analysts predict that the changes could benefit premium and super-premium pet food brands, as greater label transparency may highlight the quality differences between price tiers more clearly than current labelling allows.`,
    authorName: 'James Patterson',
    authorBio: 'Senior pet industry journalist covering UK pet market trends, regulations, and innovations for over 8 years.',
    authorCredentials: 'Senior Pet Editor',
    reviewerName: 'Dr. Sarah Mitchell',
    reviewerCredentials: 'BVSc, MRCVS',
    readTime: 6,
    isFeatured: true,
    seoTitle: 'New UK Pet Food Labelling Regulations 2026 | What You Need to Know',
    metaDescription: 'The UK is introducing major pet food labelling changes in March 2026. Learn about new ingredient transparency, "natural" definitions, and origin requirements.',
    focusKeyword: 'UK pet food regulations 2026',
    faqs: [
      { question: 'When do the new regulations come into effect?', answer: 'The new guidelines come into force in March 2026, with a 12-month transition period for manufacturers to update their packaging.' },
      { question: 'Will pet food prices increase?', answer: 'Minor price increases are possible as manufacturers update packaging and reformulate some products. However, major price impacts are not expected.' },
      { question: 'How do I check if my pet food meets the new standards?', answer: 'Look for updated packaging with specific meat percentages, clear "natural" definitions, and country of origin information. The PFMA website will also publish a compliance guide.' },
    ],
    publishedDaysAgo: 3,
    categorySlug: 'pet-health',
  },
  {
    slug: 'smart-pet-tech-trends-2026',
    heroImage: '/_candidates/09_photo-1592194996308-7b43878e84a6.jpg',
    title: 'Smart Pet Tech in 2026: GPS Trackers, AI Feeders, and Health Monitors',
    subtitle: 'The latest technology innovations transforming how we care for our pets',
    type: 'news',
    petType: 'all',
    heroImageAlt: 'Smart pet technology devices including GPS collars and automated feeders',
    excerpt: 'The pet tech industry is booming in 2026, with AI-powered health monitors, advanced GPS trackers, and smart feeders leading the charge. We explore the most exciting innovations and what they mean for everyday pet owners.',
    content: `## The Pet Tech Revolution Continues

The UK pet technology market is projected to reach 1.2 billion pounds by the end of 2026, driven by increasingly sophisticated products that promise to make pet ownership easier, safer, and more data-driven. From GPS collars that monitor your dog's location in real-time to AI-powered cameras that can detect early signs of illness, the pet tech landscape is evolving rapidly.

At the 2026 Global Pet Expo, over 200 new smart pet products were unveiled, representing a 40% increase over the previous year. The trend is clear: pet owners are willing to invest in technology that gives them peace of mind and deeper insights into their pets' health and happiness.

## GPS Tracking Goes Mainstream

GPS pet trackers have matured significantly, with battery life extending to 7-14 days (up from 2-3 days just two years ago) and accuracy improving to within 3 metres. Leading brands like Tractive and Apple (with AirTag integration for pet collars) now offer geofencing, activity monitoring, and even temperature alerts when your pet enters dangerous conditions.

The most exciting development is the integration of health monitoring into GPS devices. Several manufacturers now offer collars that track heart rate, respiratory rate, and activity patterns, alerting owners to potential health issues before visible symptoms appear. While veterinary validation of these features is still ongoing, early clinical data is promising.

## AI-Powered Smart Feeders

Smart feeders have evolved beyond simple timed dispensers. The latest generation uses computer vision to identify individual pets in multi-pet households, dispensing the correct portion for each animal. This is a genuine game-changer for households where pets are on different diets or one pet has a tendency to steal food.

Some feeders now integrate with veterinary weight management programmes, automatically adjusting portion sizes based on weight trends detected by built-in scales. While the technology is impressive, prices remain high, with premium models costing between 150 and 300 pounds.

## What This Means for Pet Owners

The democratisation of pet health data is perhaps the most significant trend. Just as fitness trackers transformed human health awareness, pet health monitors are giving owners unprecedented insight into their animals' wellbeing. However, experts caution against over-reliance on technology.

Veterinary bodies including the BVA have reminded pet owners that smart devices supplement but do not replace regular veterinary check-ups. A GPS tracker cannot detect internal illness, and a smart feeder cannot assess body condition with the nuance of a trained professional. The best approach is to use technology as an additional tool in your pet care toolkit, not as a substitute for professional veterinary guidance.`,
    authorName: 'Tom Richards',
    authorBio: 'Technology journalist covering the intersection of consumer tech and pet care innovation.',
    authorCredentials: 'Tech & Pet Innovation Correspondent',
    reviewerName: 'James Patterson',
    reviewerCredentials: 'Senior Pet Editor',
    readTime: 7,
    isFeatured: false,
    seoTitle: 'Smart Pet Tech 2026 | GPS Trackers, AI Feeders & Health Monitors',
    metaDescription: 'Explore the latest 2026 pet tech trends including GPS trackers with health monitoring, AI smart feeders, and pet health wearables. Expert analysis inside.',
    focusKeyword: 'smart pet technology 2026',
    faqs: [
      { question: 'Are GPS pet trackers worth it?', answer: 'For dogs that are walked off-lead or cats that go outdoors, GPS trackers provide genuine peace of mind. Modern trackers are lightweight, waterproof, and have multi-day battery life.' },
      { question: 'Can smart feeders replace me feeding my pet?', answer: 'Smart feeders handle portion control and scheduling well, but they cannot monitor food freshness, clean bowls, or notice changes in appetite that might indicate illness.' },
      { question: 'Is pet health monitoring technology accurate?', answer: 'Accuracy varies by device and metric. Activity tracking is generally reliable, while heart rate and respiratory monitoring is still being clinically validated. Always consult a vet for health concerns.' },
    ],
    publishedDaysAgo: 8,
    categorySlug: 'pet-accessories',
  },
];

// ─── Newsletter Subscribers ─────────────────────────────────────────────────

const newsletterEmails = [
  'petlover42@gmail.com',
  'sophie.jones@outlook.com',
  'mark.wilson@yahoo.co.uk',
  'lucy.chen@hotmail.com',
  'david.brown@protonmail.com',
];

// ─── Contact Submissions ────────────────────────────────────────────────────

const contactSubmissions = [
  {
    name: 'Rachel Green',
    email: 'rachel.green@gmail.com',
    subject: 'Affiliate link not working',
    message: 'Hi there, I tried clicking the affiliate link for the Royal Canin Medium Adult Dog Food on your site but it redirected me to a 404 page on Amazon. Could you please check and update the link? I was ready to purchase based on your review. Thanks!',
  },
  {
    name: 'Michael Thompson',
    email: 'mike.thompson@outlook.com',
    subject: 'Product suggestion for review',
    message: 'I\'ve been following your site for a while and I noticed you don\'t have any reviews for automatic cat litter boxes. I recently bought the Litter-Robot 4 and it\'s been a game-changer. Would you consider reviewing it? I think your readers would really benefit from an honest comparison of the options available in the UK market.',
  },
  {
    name: 'Priya Patel',
    email: 'priya.p@yahoo.co.uk',
    subject: 'Thank you for the harness guide',
    message: 'Just wanted to say a massive thank you for your dog harness buying guide. My rescue greyhound is a nightmare on walks and I bought the Halti No-Pull Harness based on your recommendation. It has genuinely transformed our walks - she no longer drags me down the street! Keep up the brilliant work.',
  },
];

// ─── Main Seed Function ─────────────────────────────────────────────────────

async function main() {
  console.log('Starting seed...\n');

  // ── 1. Delete existing data (FK-safe order) ──
  console.log('Clearing existing data...');
  await prisma.analytics.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactSubmission.deleteMany();
  console.log('  All existing data cleared.\n');

  // ── 2. Create Users ──
  console.log('Creating users...');
  for (const u of usersData) {
    const hash = await bcrypt.hash(u.password, 12);
    await prisma.user.create({
      data: { email: u.email, passwordHash: hash, role: u.role },
    });
    console.log(`  ${u.role}: ${u.email}`);
  }
  console.log('');

  // ── 3. Create Categories ──
  console.log('Creating categories...');
  const categoryMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
    console.log(`  ${cat.name}`);
  }
  console.log('');

  // ── 4. Create Products ──
  console.log('Creating products...');

  const productsByCategory: Record<string, ProductSeed[]> = {
    'dog-supplies': dogProducts,
    'cat-products': catProducts,
    'bird-supplies': birdProducts,
    'fish-and-aquatics': fishProducts,
    'small-pets': smallPetProducts,
    'pet-health': healthProducts,
    'pet-accessories': accessoryProducts,
  };

  const createdProductIds: string[] = [];

  for (const [catSlug, products] of Object.entries(productsByCategory)) {
    const categoryId = categoryMap[catSlug];
    for (const p of products) {
      const slug = slugify(p.title);
      const created = await prisma.product.create({
        data: {
          title: p.title,
          slug,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          currency: 'GBP',
          rating: p.rating,
          reviewCount: p.reviewCount,
          images: [nextCandidateImage()],
          affiliateLink: '#',
          platform: p.platform,
          pros: p.pros,
          cons: p.cons,
          aiSummary: p.aiSummary,
          seoTitle: `${p.title} | PetGearHub`,
          metaDescription: p.aiSummary,
          status: 'PUBLISHED',
          featured: p.featured ?? false,
          brand: p.brand,
          petType: p.petType,
          subCategory: p.subCategory,
          tags: p.tags,
          isStaffPick: p.isStaffPick ?? false,
          isDeal: p.isDeal ?? false,
          dealExpiry: p.dealExpiry ?? null,
          specs: p.specs,
          categoryId,
        },
      });
      createdProductIds.push(created.id);
    }
    console.log(`  ${catSlug}: ${products.length} products`);
  }
  const totalProducts = Object.values(productsByCategory).reduce((s, arr) => s + arr.length, 0);
  console.log(`  Total: ${totalProducts} products\n`);

  // ── 5. Create Articles ──
  console.log('Creating articles...');
  for (const a of articlesData) {
    await prisma.article.create({
      data: {
        slug: a.slug,
        title: a.title,
        subtitle: a.subtitle,
        type: a.type,
        petType: a.petType,
        heroImage: a.heroImage ?? placeholderImg(encodeURIComponent(a.title.substring(0, 40)), 1200, 600),
        heroImageAlt: a.heroImageAlt,
        excerpt: a.excerpt,
        content: a.content,
        authorName: a.authorName,
        authorPhoto: placeholderImg(a.authorName.replace(/ /g, '+'), 200, 200),
        authorBio: a.authorBio,
        authorCredentials: a.authorCredentials,
        reviewerName: a.reviewerName,
        reviewerPhoto: placeholderImg(a.reviewerName.replace(/ /g, '+'), 200, 200),
        reviewerCredentials: a.reviewerCredentials,
        readTime: a.readTime,
        isFeatured: a.isFeatured,
        seoTitle: a.seoTitle,
        metaDescription: a.metaDescription,
        focusKeyword: a.focusKeyword,
        faqs: a.faqs,
        status: 'PUBLISHED',
        publishedAt: daysAgo(a.publishedDaysAgo),
        categoryId: categoryMap[a.categorySlug] ?? null,
      },
    });
    console.log(`  [${a.type}] ${a.title}`);
  }
  console.log('');

  // ── 6. Create Analytics ──
  console.log('Creating analytics data...');
  const analyticsProductIds = createdProductIds
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  let analyticsCount = 0;
  for (const productId of analyticsProductIds) {
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = daysAgo(dayOffset);
      const views = randomInt(50, 1200);
      const clicks = randomInt(Math.floor(views * 0.02), Math.floor(views * 0.12));
      await prisma.analytics.create({
        data: { productId, views, clicks, date },
      });
      analyticsCount++;
    }
  }
  console.log(`  ${analyticsCount} analytics records for ${analyticsProductIds.length} products\n`);

  // ── 7. Create Newsletter Subscribers ──
  console.log('Creating newsletter subscribers...');
  for (const email of newsletterEmails) {
    await prisma.newsletterSubscriber.create({ data: { email } });
  }
  console.log(`  ${newsletterEmails.length} subscribers\n`);

  // ── 8. Create Contact Submissions ──
  console.log('Creating contact submissions...');
  for (const sub of contactSubmissions) {
    await prisma.contactSubmission.create({ data: sub });
  }
  console.log(`  ${contactSubmissions.length} submissions\n`);

  // ── Summary ──
  console.log('========================================');
  console.log('Seed complete!');
  console.log('========================================');
  console.log(`  Users:          ${usersData.length}`);
  console.log(`  Categories:     ${categoriesData.length}`);
  console.log(`  Products:       ${totalProducts}`);
  console.log(`  Articles:       ${articlesData.length}`);
  console.log(`  Analytics:      ${analyticsCount}`);
  console.log(`  Newsletter:     ${newsletterEmails.length}`);
  console.log(`  Contact:        ${contactSubmissions.length}`);
  console.log('');
  console.log('Admin login: admin@petgearhub.com');
  console.log('IMPORTANT: Change the default password after first login!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
