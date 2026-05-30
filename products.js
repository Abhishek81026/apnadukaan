const categories = [
  { name: 'Electronics', slug: 'electronics', iconKey: 'sparkles', gradient: 'from-blue-500 to-cyan-400', description: 'Gadgets, accessories and smart devices.' },
  { name: 'Smartphones', slug: 'smartphones', iconKey: 'smartphone', gradient: 'from-sky-500 to-indigo-500', description: 'Used mobiles with verified condition tags.' },
  { name: 'Laptops', slug: 'laptops', iconKey: 'laptop', gradient: 'from-slate-700 to-sky-500', description: 'Student and creator-ready machines.' },
  { name: 'Books', slug: 'books', iconKey: 'book-open', gradient: 'from-amber-500 to-orange-500', description: 'Textbooks, novels and competitive prep.' },
  { name: 'Fashion', slug: 'fashion', iconKey: 'shirt', gradient: 'from-pink-500 to-rose-500', description: 'Premium thrift fashion and wardrobe finds.' },
  { name: 'Shoes', slug: 'shoes', iconKey: 'sparkles', gradient: 'from-stone-600 to-zinc-400', description: 'Sneakers, formals and streetwear pairs.' },
  { name: 'Furniture', slug: 'furniture', iconKey: 'sofa', gradient: 'from-emerald-600 to-teal-500', description: 'Home and hostel furniture picks.' },
  { name: 'Vehicles', slug: 'vehicles', iconKey: 'car-front', gradient: 'from-orange-500 to-red-500', description: 'Cycles, bikes and mobility essentials.' },
  { name: 'Gaming', slug: 'gaming', iconKey: 'gamepad-2', gradient: 'from-fuchsia-600 to-violet-500', description: 'Consoles, controllers and gaming gear.' },
  { name: 'Headphones', slug: 'headphones', iconKey: 'headphones', gradient: 'from-cyan-500 to-blue-600', description: 'Over-ear, TWS and studio audio gear.' },
  { name: 'Sports', slug: 'sports', iconKey: 'sparkles', gradient: 'from-green-500 to-lime-500', description: 'Fitness, outdoor and campus sports.' },
  { name: 'Cameras', slug: 'cameras', iconKey: 'camera', gradient: 'from-slate-700 to-slate-500', description: 'DSLR, mirrorless and vlogging gear.' },
  { name: 'Watches', slug: 'watches', iconKey: 'watch', gradient: 'from-amber-600 to-stone-500', description: 'Analog, digital and smart watches.' },
  { name: 'Tablets', slug: 'tablets', iconKey: 'tablet-smartphone', gradient: 'from-cyan-600 to-blue-500', description: 'Entertainment and productivity tablets.' },
  { name: 'Home Decor', slug: 'home-decor', iconKey: 'sparkles', gradient: 'from-rose-500 to-amber-400', description: 'Decor items for rooms and study areas.' },
  { name: 'Appliances', slug: 'appliances', iconKey: 'sparkles', gradient: 'from-slate-500 to-emerald-500', description: 'Essential home appliances at fair prices.' },
  { name: 'Study Materials', slug: 'study-materials', iconKey: 'graduation-cap', gradient: 'from-indigo-500 to-sky-500', description: 'Notes, lab kits and academic resources.' },
  { name: 'Bikes', slug: 'bikes', iconKey: 'bike', gradient: 'from-neutral-700 to-emerald-500', description: 'Campus and commuter bikes.' },
  { name: 'Accessories', slug: 'accessories', iconKey: 'gem', gradient: 'from-purple-500 to-fuchsia-500', description: 'Everyday carry and lifestyle accessories.' },
  { name: 'Others', slug: 'others', iconKey: 'layers-3', gradient: 'from-slate-600 to-slate-400', description: 'Everything else worth reselling.' }
];

const conditions = ['Like New', 'Excellent', 'Good', 'Fair', 'Refurbished', 'Open Box'];
const locations = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Chandigarh'];
const productTags = ['Bestseller', 'Student Pick', 'Fast Delivery', 'Verified Seller', 'Limited Stock', 'Hot Deal', 'Premium', 'Eco Save'];
const reviewText = ['Exactly as shown. Smooth transaction and solid value.', 'Great condition, quick response from seller and fast delivery.', 'Better than expected for the price. Would recommend.', 'Nice quality and well packed. Perfect for campus use.', 'Fair pricing and trustworthy seller experience.'];

const sellerNames = ['Aarav Traders', 'Campus Bazaar', 'Urban Loop', 'GreenMart Resale', 'Nexa Exchange', 'SecondChance Hub', 'DealDock', 'ReUse Republic', 'SmartSell Studio', 'TradeNest', 'ThriftSphere', 'LocalLoop', 'ValueVibe', 'PrimeSwap', 'Campus Cart', 'Renew Room'];
const firstNames = ['Aman', 'Riya', 'Kunal', 'Sneha', 'Rahul', 'Ananya', 'Aditi', 'Arjun', 'Nikhil', 'Priya'];
const lastNames = ['Sharma', 'Patel', 'Verma', 'Singh', 'Iyer', 'Gupta', 'Khan', 'Mehta', 'Reddy', 'Bose'];

function createRng(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function createSeller(index) {
  const rng = createRng(index + 99);
  const name = sellerNames[index % sellerNames.length];
  return {
    name,
    slug: slugify(name),
    avatar: `https://i.pravatar.cc/200?img=${(index % 70) + 1}`,
    banner: `https://picsum.photos/seed/seller-banner-${index}/1200/400`,
    joined: `20${19 + (index % 5)}-${String((index % 12) + 1).padStart(2, '0')}`,
    rating: Number((4.4 + rng() * 0.5).toFixed(1)),
    followers: 1000 + index * 143,
    verified: index % 3 !== 0,
    responseTime: `${Math.max(1, Math.round(24 - rng() * 18))}h`
  };
}

const sellers = Array.from({ length: 24 }, (_, index) => createSeller(index));

function createTitle(category, rng, index) {
  const adjectives = ['Premium', 'Budget', 'Elite', 'Campus', 'Smart', 'Urban', 'Classic', 'Refined', 'Pro', 'Compact', 'Reliable', 'Value'];
  const nouns = {
    electronics: ['Speaker', 'Charger', 'Power Bank', 'Smart Hub', 'Device'],
    smartphones: ['Phone', 'Handset', 'Mobile', 'Smartphone'],
    laptops: ['Laptop', 'Notebook', 'Ultrabook', 'Workstation'],
    books: ['Guide', 'Textbook', 'Collection', 'Edition'],
    fashion: ['Jacket', 'Co-ord', 'Shirt', 'Dress', 'Denim'],
    shoes: ['Sneakers', 'Loafers', 'Running Shoes', 'Boots'],
    furniture: ['Study Desk', 'Chair', 'Sofa', 'Shelf'],
    vehicles: ['Scooter', 'Bike', 'Cycle', 'Commuter'],
    gaming: ['Console', 'Controller', 'Gaming Set', 'Accessory'],
    headphones: ['Headphones', 'Earbuds', 'Audio Gear'],
    sports: ['Treadmill', 'Racket', 'Fitness Kit', 'Basketball'],
    cameras: ['Camera', 'Lens', 'Tripod', 'Kit'],
    watches: ['Watch', 'Smartwatch', 'Chronograph'],
    tablets: ['Tablet', 'Pad', 'Slate'],
    'home-decor': ['Lamp', 'Decor Set', 'Wall Piece', 'Organizer'],
    appliances: ['Mixer', 'Air Fryer', 'Microwave', 'Cleaner'],
    'study-materials': ['Notes Pack', 'Lab Kit', 'Reference Set', 'Exam Bundle'],
    bikes: ['Cycle', 'Gear', 'Mountain Bike', 'Road Bike'],
    accessories: ['Backpack', 'Wallet', 'Case', 'Watch Band'],
    others: ['Bundle', 'Useful Item', 'Everyday Essential']
  };
  return `${pick(rng, adjectives)} ${pick(rng, nouns[category.slug])} ${index % 7 === 0 ? 'for Students' : 'Series'}`;
}

function createDescription(categoryName, condition, location, sellerName) {
  return `A carefully maintained ${condition.toLowerCase()} ${categoryName.toLowerCase()} item listed from ${location}. ${sellerName} is known for clean handover, realistic pricing and quick response times.`;
}

const products = [];

categories.forEach((category, categoryIndex) => {
  for (let index = 0; index < 550; index += 1) {
    const id = `${category.slug}-${String(index + 1).padStart(4, '0')}`;
    const rng = createRng(categoryIndex * 10000 + index + 1);
    const seller = sellers[(categoryIndex * 7 + index) % sellers.length];
    const condition = pick(rng, conditions);
    const priceFloor = 180 + categoryIndex * 25;
    const priceCeil = priceFloor + 12000 + categoryIndex * 100;
    const price = Math.round(priceFloor + rng() * (priceCeil - priceFloor));
    const originalPrice = Math.round(price * (1.08 + rng() * 0.42));
    const rating = Number((3.7 + rng() * 1.3).toFixed(1));
    const reviewCount = 8 + Math.round(rng() * 470);
    const location = pick(rng, locations);
    const tags = Array.from(new Set([pick(rng, productTags), pick(rng, productTags), pick(rng, productTags)]));
    const title = createTitle(category, rng, index);
    const badgePool = ['Trending', 'Best Deal', 'Hot', 'Verified', 'Student Favorite', 'Limited'];

    products.push({
      id,
      slug: `${id}-${slugify(title)}`,
      title,
      category: category.name,
      categorySlug: category.slug,
      image: `https://picsum.photos/seed/apnadukaan-${id}/900/900`,
      gallery: [1, 2, 3, 4].map((shot) => `https://picsum.photos/seed/apnadukaan-${id}-${shot}/900/900`),
      price,
      originalPrice,
      rating,
      seller: seller.name,
      sellerSlug: seller.slug,
      sellerAvatar: seller.avatar,
      condition,
      description: createDescription(category.name, condition, location, seller.name),
      tags,
      location,
      reviewCount,
      reviews: Array.from({ length: 3 }, (_, reviewIndex) => ({
        id: `${id}-review-${reviewIndex}`,
        name: `${pick(rng, firstNames)} ${pick(rng, lastNames)}`,
        rating: 4 + Math.floor(rng() * 2) / 2,
        text: pick(rng, reviewText),
        avatar: `https://i.pravatar.cc/150?img=${((categoryIndex * 3 + reviewIndex + index) % 70) + 1}`
      })),
      badge: pick(rng, badgePool),
      discount: Math.min(55, Math.round((1 - price / originalPrice) * 100)),
      listedAt: `2026-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
      featured: rng() > 0.84 || categoryIndex % 5 === 0,
      trending: rng() > 0.8 || index % 8 === 0,
      deal: price < originalPrice * 0.7,
      stock: 1 + Math.floor(rng() * 4),
      specs: {
        brand: pick(rng, ['Sony', 'Apple', 'Samsung', 'Dell', 'Lenovo', 'HP', 'JBL', 'Acer', 'Canon', 'Nike', 'Adidas']),
        warranty: `${Math.floor(rng() * 12)} months`,
        color: pick(rng, ['Black', 'White', 'Blue', 'Green', 'Grey', 'Silver', 'Red', 'Gold']),
        condition,
        delivery: pick(rng, ['Same day pickup', '2-3 day delivery', 'Campus meetup', 'Local handover'])
      }
    });
  }
});

const productMap = new Map(products.map((product) => [product.id, product]));

const categoryCountMap = categories.reduce((acc, category) => {
  acc[category.slug] = products.filter((product) => product.categorySlug === category.slug).length;
  return acc;
}, {});

const featuredProducts = products.filter((product) => product.featured).slice(0, 24);
const trendingProducts = products.filter((product) => product.trending).slice(0, 30);
const dealProducts = products.filter((product) => product.deal).sort((a, b) => a.price - b.price).slice(0, 30);
const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 30);
const newlyListedProducts = [...products].sort((a, b) => b.listedAt.localeCompare(a.listedAt)).slice(0, 30);

function getProductById(id) {
  return productMap.get(id) || null;
}

function getProductsByCategory(categorySlug) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

function getProductsBySellerSlug(slug) {
  return products.filter((product) => product.sellerSlug === slug);
}

function getSellerBySlug(slug) {
  const seller = sellers.find((item) => item.slug === slug) || null;
  if (!seller) return null;
  return {
    ...seller,
    productCount: getProductsBySellerSlug(slug).length
  };
}

function getRelatedProducts(product, limit = 10) {
  return products
    .filter((item) => item.id !== product.id && (item.categorySlug === product.categorySlug || item.sellerSlug === product.sellerSlug))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

function searchSuggestions(query = '') {
  const needle = String(query).trim().toLowerCase();
  if (!needle) return [];
  return products
    .filter((product) => product.title.toLowerCase().includes(needle) || product.category.toLowerCase().includes(needle))
    .slice(0, 8)
    .map((product) => product.title);
}

export {
  categories,
  categoryCountMap,
  conditions,
  dealProducts,
  featuredProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySellerSlug,
  getRelatedProducts,
  getSellerBySlug,
  locations,
  newlyListedProducts,
  products,
  searchSuggestions,
  sellers,
  topRatedProducts,
  trendingProducts
};