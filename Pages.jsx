import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Heart,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Trash2,
  TrendingUp,
  ZoomIn,
  LayoutGrid,
  ListFilter,
  Grid2x2,
  Smartphone,
  Laptop,
  BookOpen,
  Shirt,
  Sofa,
  CarFront,
  Gamepad2,
  Headphones,
  Camera,
  Watch,
  TabletSmartphone,
  GraduationCap,
  Bike,
  Gem,
  Layers3
} from 'lucide-react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  categories,
  categoryCountMap,
  dealProducts,
  featuredProducts,
  getProductById,
  getProductsBySellerSlug,
  getRelatedProducts,
  getSellerBySlug,
  products,
  topRatedProducts,
  trendingProducts
} from '../data/products';
import { useApp } from '../context/AppContext';
import useDebounce from '../hooks/useDebounce';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { BackToTop, EmptyState, Footer, FloatingSupportButton, Loader, Navbar, RatingStars, SearchBar, SectionHeading, SimpleCounterStrip, ToastViewport } from '../components/common';
import { CategoryCard, FlashSaleTimer, HeroSection, ProductCarousel, ProductGrid, ProductQuickView, QuickCompareTray, SidebarFilter } from '../components/products';

function PageShell({ children }) {
  return <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"><div className="absolute inset-0 -z-10 mesh-bg opacity-60" /><div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div></div>;
}

function PageSection({ children, className = '' }) {
  return <section className={`mb-14 ${className}`}>{children}</section>;
}

function useSearchQueryState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  useEffect(() => setQuery(searchParams.get('q') || ''), [searchParams]);
  return { searchParams, setSearchParams, query, setQuery };
}

export function HomePage() {
  const navigate = useNavigate();
  const testimonials = [
    { name: 'Ritika Sharma', role: 'Hostel student', text: 'The interface looks premium enough to be a real marketplace launch. Search and filters feel polished.', rating: 5, avatar: 'https://i.pravatar.cc/150?img=47' },
    { name: 'Arjun Mehta', role: 'Campus seller', text: 'Listing products and browsing categories is super smooth. Great exhibition demo experience.', rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Nidhi Kapoor', role: 'College buyer', text: 'The dark mode, animations and product cards make it feel startup-quality. Judges will like it.', rating: 5, avatar: 'https://i.pravatar.cc/150?img=23' }
  ];

  return <PageShell><PageSection><HeroSection onSearch={(value) => navigate(`/marketplace?q=${encodeURIComponent(value)}`)} /></PageSection><PageSection><SectionHeading eyebrow="Featured" title="Trending products, top deals and recently added picks" description="A curated storefront view that mimics a polished marketplace with strong merchandising and responsive interactions." action={<Link to="/marketplace" className="btn-secondary"><ArrowRight className="h-4 w-4" /> Browse marketplace</Link>} /><div className="grid gap-6 lg:grid-cols-3"><ProductCarousel title="Trending now" products={trendingProducts.slice(0, 4)} onQuickView={() => {}} /><ProductCarousel title="Best deals" products={dealProducts.slice(0, 4)} onQuickView={() => {}} /><ProductCarousel title="Top rated" products={topRatedProducts.slice(0, 4)} onQuickView={() => {}} /></div></PageSection><PageSection><SectionHeading eyebrow="Categories" title="Shop by category" description="Clean category cards with counts, gradients and fast navigation into the browsing flow." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{categories.slice(0, 8).map((category) => <CategoryCard key={category.slug} category={category} count={categoryCountMap[category.slug]} onClick={() => navigate(`/marketplace?category=${category.slug}`)} />)}</div></PageSection><PageSection><SimpleCounterStrip /></PageSection><PageSection><SectionHeading eyebrow="Trust" title="Why people choose ApnaDukaan" description="A realistic reuse-first platform that makes secondhand commerce feel safe, elegant and modern." /><div className="grid gap-4 md:grid-cols-3">{[{ icon: ShieldCheck, title: 'Verified seller profiles', text: 'Clear seller info, response times, ratings and listing quality markers.' }, { icon: Leaf, title: 'Sustainability first', text: 'Reuse culture and smart resale are presented as the primary value story.' }, { icon: Truck, title: 'Fast campus handover', text: 'Local meetup, pickup and instant chat cues simulate a real buying flow.' }].map((item) => <div key={item.title} className="surface rounded-[2rem] p-6"><item.icon className="h-10 w-10 text-emerald-500" /><h3 className="mt-4 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p></div>)}</div></PageSection><PageSection><SectionHeading eyebrow="Testimonials" title="Realistic marketplace feedback" description="A premium landing page should show trust, freshness and a sense of product maturity." /><div className="grid gap-4 lg:grid-cols-3">{testimonials.map((item) => <div key={item.name} className="surface rounded-[2rem] p-6"><div className="flex items-center gap-4"><img src={item.avatar} alt={item.name} className="h-14 w-14 rounded-2xl object-cover" /><div><h3 className="font-semibold">{item.name}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p></div></div><div className="mt-4 flex items-center gap-2"><RatingStars value={item.rating} /></div><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p></div>)}</div></PageSection></PageShell>;
}

export function MarketplacePage() {
  const { compareItems, clearCompare, addSearchHistory } = useApp();
  const { query, setQuery } = useSearchQueryState();
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', rating: 0, condition: '', location: '', category: '', sort: 'featured', view: 'grid' });
  const [quickView, setQuickView] = useState(null);
  const [visibleCount, setVisibleCount] = useState(48);
  const sentinelRef = useRef(null);
  const isVisible = useIntersectionObserver(sentinelRef, { rootMargin: '500px' });
  const debouncedQuery = useDebounce(query, 220);

  useEffect(() => { if (isVisible) setVisibleCount((count) => Math.min(count + 36, 240)); }, [isVisible]);

  const filtered = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    const items = products.filter((product) => {
      const matchesQuery = !normalized || [product.title, product.seller, product.category, product.tags.join(' '), product.location].join(' ').toLowerCase().includes(normalized);
      const matchesCategory = !filters.category || product.categorySlug === filters.category;
      const matchesCondition = !filters.condition || product.condition === filters.condition;
      const matchesLocation = !filters.location || product.location === filters.location;
      const matchesRating = !filters.rating || product.rating >= filters.rating;
      const min = Number(filters.minPrice || 0);
      const max = Number(filters.maxPrice || Number.MAX_SAFE_INTEGER);
      const matchesPrice = product.price >= min && product.price <= max;
      return matchesQuery && matchesCategory && matchesCondition && matchesLocation && matchesRating && matchesPrice;
    });

    const sorted = [...items].sort((a, b) => {
      switch (filters.sort) {
        case 'latest': return b.listedAt.localeCompare(a.listedAt);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating || b.reviewCount - a.reviewCount;
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.reviewCount - a.reviewCount;
      }
    });

    return sorted;
  }, [debouncedQuery, filters]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const categoryChips = ['All', ...categories.map((category) => category.name)];

  const applyFilters = () => {
    if (debouncedQuery) addSearchHistory(debouncedQuery);
    setVisibleCount(48);
  };

  const clearFilters = () => {
    setFilters({ minPrice: '', maxPrice: '', rating: 0, condition: '', location: '', category: '', sort: 'featured', view: 'grid' });
    setQuery('');
    setVisibleCount(48);
  };

  return <PageShell><PageSection><div className="grid gap-6 lg:grid-cols-[320px_1fr]"><SidebarFilter filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} onClear={clearFilters} onApply={applyFilters} /><div><div className="surface rounded-[2rem] p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><h1 className="text-3xl font-bold tracking-tight">Marketplace</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Browse thousands of realistic demo listings with live filters, wishlist support and quick view interactions.</p></div><SearchBar value={query} onChange={setQuery} onSubmit={(value) => { setQuery(value); setVisibleCount(48); }} placeholder="Search the marketplace..." compact /></div><div className="mt-5 flex flex-wrap gap-2">{categoryChips.map((chip) => <button key={chip} type="button" onClick={() => setFilters((prev) => ({ ...prev, category: chip === 'All' ? '' : categories.find((category) => category.name === chip)?.slug || '' }))} className={`chip ${filters.category === (categories.find((category) => category.name === chip)?.slug || '') ? 'bg-emerald-500 text-white' : ''}`}>{chip}</button>)}</div></div><div className="mt-6 flex items-center justify-between gap-3"><p className="text-sm text-slate-500 dark:text-slate-400">Showing {visibleProducts.length.toLocaleString()} of {filtered.length.toLocaleString()} products</p><div className="flex items-center gap-2"><button onClick={() => setFilters((prev) => ({ ...prev, view: 'grid' }))} className={`chip ${filters.view === 'grid' ? 'bg-emerald-500 text-white' : ''}`}><LayoutGrid className="h-4 w-4" /> Grid</button><button onClick={() => setFilters((prev) => ({ ...prev, view: 'list' }))} className={`chip ${filters.view === 'list' ? 'bg-emerald-500 text-white' : ''}`}><ListFilter className="h-4 w-4" /> List</button></div></div><div className="mt-6">{visibleProducts.length ? <ProductGrid products={visibleProducts} listView={filters.view === 'list'} onQuickView={setQuickView} hasMore={visibleCount < filtered.length} onLoadMore={() => setVisibleCount((count) => Math.min(count + 36, filtered.length))} /> : <EmptyState title="No products matched your filters" description="Try clearing filters or search another keyword to discover more listings." action={<button onClick={clearFilters} className="btn-primary">Reset filters</button>} />}<div ref={sentinelRef} className="h-10" /></div></div></div></PageSection><ProductQuickView product={quickView} open={Boolean(quickView)} onClose={() => setQuickView(null)} />{compareItems.length ? <QuickCompareTray products={compareItems} onClear={clearCompare} /> : null}</PageShell>;
}

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted, addToCart, viewProduct } = useApp();
  const product = getProductById(id);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => { if (product) viewProduct(product.id); }, [product, viewProduct]);

  if (!product) {
    return <PageShell><EmptyState title="Product not found" description="The product may have been removed from the demo catalog." action={<button onClick={() => navigate('/marketplace')} className="btn-primary">Back to marketplace</button>} /></PageShell>;
  }

  const related = getRelatedProducts(product, 8);
  const wishlisted = isWishlisted(product.id);

  return <PageShell><PageSection><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><div className="space-y-4"><div className="surface overflow-hidden rounded-[2rem]"><div className="group relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800"><img src={product.gallery[activeImage]} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><button className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow-soft backdrop-blur dark:bg-slate-950/80"><ZoomIn className="h-5 w-5" /></button><div className="absolute left-4 top-4 flex flex-wrap gap-2"><span className="chip bg-white/90">{product.category}</span><span className="chip bg-emerald-500 text-white">{product.condition}</span></div></div><div className="grid grid-cols-4 gap-3 p-4">{product.gallery.map((image, index) => <button key={image} type="button" onClick={() => setActiveImage(index)} className={`overflow-hidden rounded-2xl border-2 ${activeImage === index ? 'border-emerald-400' : 'border-transparent'}`}><img src={image} alt={`${product.title} ${index + 1}`} className="aspect-square w-full object-cover" /></button>)}</div></div></div><div><div className="surface rounded-[2rem] p-6"><div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Link to="/marketplace" className="hover:text-emerald-600">Marketplace</Link><ChevronRight className="h-3 w-3" /><Link to={`/marketplace?category=${product.categorySlug}`} className="hover:text-emerald-600">{product.category}</Link></div><h1 className="mt-3 text-3xl font-bold tracking-tight">{product.title}</h1><div className="mt-3 flex flex-wrap items-center gap-3"><RatingStars value={product.rating} /><span className="text-sm text-slate-500 dark:text-slate-400">{product.reviewCount} reviews</span><span className="chip">{product.stock} left</span></div><div className="mt-5 flex flex-wrap items-end gap-4"><div><p className="text-sm text-slate-500 dark:text-slate-400">Price</p><p className="text-4xl font-black text-emerald-600">₹{product.price.toLocaleString()}</p></div><div className="pb-1 text-sm text-slate-500 line-through dark:text-slate-400">₹{product.originalPrice.toLocaleString()}</div><span className="chip bg-emerald-500 text-white">Save {product.discount}%</span></div><p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{product.description}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Seller</p><p className="mt-1 font-semibold">{product.seller}</p></div><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p><p className="mt-1 font-semibold">{product.location}</p></div></div><div className="mt-6 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => addToCart(product.id)} className="btn-primary flex-1"><ShoppingCart className="h-4 w-4" /> Add to cart</button><button onClick={() => toggleWishlist(product.id)} className="btn-secondary flex-1"><Heart className="h-4 w-4" /> {wishlisted ? 'Saved' : 'Wishlist'}</button><button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="btn-secondary flex-1"><Share2 className="h-4 w-4" /> Share</button></div><div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-3"><img src={product.sellerAvatar} alt={product.seller} className="h-14 w-14 rounded-2xl object-cover" /><div><div className="flex items-center gap-2"><h3 className="font-semibold">{product.seller}</h3> {product.badge === 'Verified' ? <BadgeCheck className="h-4 w-4 text-emerald-500" /> : null}</div><p className="text-sm text-slate-500 dark:text-slate-400">Campus seller · {product.location}</p></div></div><div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm"><div className="rounded-2xl bg-white p-4 dark:bg-slate-950"><p className="text-xl font-bold">4.8</p><p className="text-slate-500">Rating</p></div><div className="rounded-2xl bg-white p-4 dark:bg-slate-950"><p className="text-xl font-bold">12h</p><p className="text-slate-500">Reply time</p></div><div className="rounded-2xl bg-white p-4 dark:bg-slate-950"><p className="text-xl font-bold">{product.stock}</p><p className="text-slate-500">Stock</p></div></div></div></div></div></div></PageSection><PageSection><SectionHeading eyebrow="Specs" title="Product details and highlights" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{Object.entries(product.specs).map(([label, value]) => <div key={label} className="surface rounded-3xl p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p><p className="mt-2 text-sm font-semibold">{String(value)}</p></div>)}</div></PageSection><PageSection><SectionHeading eyebrow="Reviews" title="What buyers say" /><div className="grid gap-4 lg:grid-cols-3">{product.reviews.map((review) => <div key={review.id} className="surface rounded-3xl p-5"><div className="flex items-center gap-3"><img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-2xl object-cover" /><div><p className="font-semibold">{review.name}</p><RatingStars value={review.rating} /></div></div><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{review.text}</p></div>)}</div></PageSection><PageSection><SectionHeading eyebrow="Related" title="Similar and related listings" /><ProductCarousel title="Related picks" products={related} onQuickView={() => {}} /></PageSection></PageShell>;
}

export function CategoriesPage() {
  return <PageShell><PageSection><SectionHeading eyebrow="Categories" title="Browse all categories" description="A premium browsing map of the marketplace organized by use case, budget and lifestyle." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{categories.map((category) => <CategoryCard key={category.slug} category={category} count={categoryCountMap[category.slug]} onClick={() => {}} />)}</div></PageSection></PageShell>;
}

export function WishlistPage() {
  const { wishlistItems, removeWishlist, addToCart } = useApp();
  return <PageShell><PageSection><SectionHeading eyebrow="Wishlist" title="Saved for later" description="Products stay in localStorage to simulate a real logged-in wishlist flow." />{wishlistItems.length ? <div className="grid gap-4">{wishlistItems.map((product) => <div key={product.id} className="surface flex flex-col gap-4 rounded-[2rem] p-4 md:flex-row md:items-center"><img src={product.image} alt={product.title} className="h-40 w-full rounded-3xl object-cover md:h-24 md:w-24" /><div className="flex-1"><h3 className="text-lg font-semibold">{product.title}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.seller} · {product.location}</p></div><div className="flex items-center gap-2"><button onClick={() => addToCart(product.id)} className="btn-primary px-4 py-2 text-xs">Move to cart</button><button onClick={() => removeWishlist(product.id)} className="btn-secondary px-4 py-2 text-xs"><Trash2 className="h-4 w-4" /> Remove</button></div></div>)}</div> : <EmptyState title="Your wishlist is empty" description="Save items you like from the marketplace and they will appear here instantly." action={<Link to="/marketplace" className="btn-primary">Explore products</Link>} />}</PageSection></PageShell>;
}

export function CartPage() {
  const { cartItems, setQty, removeFromCart, clearCart, showToast } = useApp();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 149 : 0;
  const discount = subtotal > 5000 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + shipping - discount;
  const [coupon, setCoupon] = useState('');

  return <PageShell><PageSection><SectionHeading eyebrow="Cart" title="Order summary and checkout simulation" description="All cart interactions work locally with price calculation and coupon UI." />{cartItems.length ? <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-4">{cartItems.map((product) => <div key={product.id} className="surface flex flex-col gap-4 rounded-[2rem] p-4 md:flex-row md:items-center"><img src={product.image} alt={product.title} className="h-28 w-full rounded-3xl object-cover md:h-24 md:w-24" /><div className="flex-1"><h3 className="font-semibold">{product.title}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.seller} · {product.condition}</p><p className="mt-2 text-lg font-bold text-emerald-600">₹{product.price.toLocaleString()}</p></div><div className="flex items-center gap-2"><button onClick={() => setQty(product.id, Math.max(1, product.qty - 1))} className="rounded-full border p-2"><Minus className="h-4 w-4" /></button><span className="min-w-8 text-center font-semibold">{product.qty}</span><button onClick={() => setQty(product.id, product.qty + 1)} className="rounded-full border p-2"><Plus className="h-4 w-4" /></button></div><button onClick={() => removeFromCart(product.id)} className="btn-secondary px-4 py-2 text-xs"><Trash2 className="h-4 w-4" /> Remove</button></div>)}</div><div className="surface sticky top-24 rounded-[2rem] p-6"><h3 className="text-xl font-semibold">Checkout summary</h3><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div><div className="flex justify-between"><span>Shipping</span><span>₹{shipping.toLocaleString()}</span></div><div className="flex justify-between"><span>Coupon discount</span><span>-₹{discount.toLocaleString()}</span></div><div className="border-t border-dashed border-slate-300 pt-3 flex justify-between text-base font-bold"><span>Total</span><span>₹{total.toLocaleString()}</span></div></div><div className="mt-6 space-y-3"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="input-field" placeholder="Coupon code" /><button onClick={() => showToast('Coupon applied', coupon || 'Demo coupon accepted')} className="btn-secondary w-full">Apply coupon</button><button onClick={clearCart} className="btn-primary w-full">Proceed to checkout</button></div></div></div> : <EmptyState title="Your cart is empty" description="Add products from the marketplace or wishlist to see checkout pricing here." action={<Link to="/marketplace" className="btn-primary">Browse marketplace</Link>} />}</PageSection></PageShell>;
}

export function AboutPage() {
  return <PageShell><PageSection><SectionHeading eyebrow="About" title="A marketplace designed like a funded startup product" description="ApnaDukaan was built to present a premium secondhand commerce experience with realistic UI depth and strong visual polish." /><div className="grid gap-4 lg:grid-cols-3">{[{ title: 'Student-first commerce', text: 'Affordable used products, campus pickup and sustainable reuse are central to the product story.' }, { title: 'Premium front-end experience', text: 'Glassmorphism, animated surfaces, dark mode and responsive layouts create a mature demo.' }, { title: 'No backend dependency', text: 'All interactions are simulated with dynamic data and localStorage, keeping the app self-contained.' }].map((card) => <div key={card.title} className="surface rounded-[2rem] p-6"><h3 className="text-lg font-semibold">{card.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.text}</p></div>)}</div></PageSection></PageShell>;
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { showToast } = useApp();
  return <PageShell><PageSection><SectionHeading eyebrow="Contact" title="Get in touch" description="A polished contact section with working inputs and simulated submission feedback." /><div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="surface rounded-[2rem] p-6"><div className="space-y-4 text-sm text-slate-600 dark:text-slate-400"><p className="flex items-center gap-3"><Mail className="h-4 w-4 text-emerald-500" /> hello@apnadukaan.in</p><p className="flex items-center gap-3"><PhoneCall className="h-4 w-4 text-emerald-500" /> +91 00000 00000</p><p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-emerald-500" /> College exhibition booth demo</p></div></div><form onSubmit={(event) => { event.preventDefault(); showToast('Message sent', 'We will respond in the demo inbox.'); setForm({ name: '', email: '', message: '' }); }} className="surface rounded-[2rem] p-6 space-y-4"><input className="input-field" placeholder="Your name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} /><input className="input-field" placeholder="Email address" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} /><textarea className="input-field min-h-40" placeholder="Message" value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} /><button className="btn-primary w-full">Send message</button></form></div></PageSection></PageShell>;
}

export function ProfilePage() {
  const { wishlistItems, recentlyViewedItems } = useApp();
  const user = { name: 'Aman Verma', role: 'Campus buyer and resale enthusiast', avatar: 'https://i.pravatar.cc/300?img=5' };
  return <PageShell><PageSection><div className="surface overflow-hidden rounded-[2rem]"><div className="h-56 bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-400" /><div className="px-6 pb-6"><img src={user.avatar} alt={user.name} className="-mt-16 h-32 w-32 rounded-[2rem] border-4 border-white object-cover shadow-soft dark:border-slate-950" /><h1 className="mt-4 text-3xl font-bold">{user.name}</h1><p className="mt-1 text-slate-500 dark:text-slate-400">{user.role}</p></div></div></PageSection><PageSection><div className="grid gap-6 lg:grid-cols-2"><div className="surface rounded-[2rem] p-6"><SectionHeading eyebrow="Wishlist" title="Saved items" />{wishlistItems.slice(0, 4).map((product) => <div key={product.id} className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><img src={product.image} alt={product.title} className="h-12 w-12 rounded-2xl object-cover" /><div className="min-w-0"><p className="truncate font-medium">{product.title}</p><p className="text-xs text-slate-500">₹{product.price.toLocaleString()}</p></div></div>)}</div><div className="surface rounded-[2rem] p-6"><SectionHeading eyebrow="Recently viewed" title="Browsing history" />{recentlyViewedItems.slice(0, 4).map((product) => <div key={product.id} className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><img src={product.image} alt={product.title} className="h-12 w-12 rounded-2xl object-cover" /><div className="min-w-0"><p className="truncate font-medium">{product.title}</p><p className="text-xs text-slate-500">{product.seller}</p></div></div>)}</div></div></PageSection></PageShell>;
}

export function SellerStorePage() {
  const { slug = 'urban-loop' } = useParams();
  const seller = getSellerBySlug(slug) || getSellerBySlug('urban-loop');
  const sellerProducts = getProductsBySellerSlug(seller.slug).slice(0, 12);
  if (!seller) return <Navigate to="/marketplace" replace />;

  return <PageShell><PageSection><div className="surface overflow-hidden rounded-[2rem]"><div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${seller.banner})` }} /><div className="px-6 pb-6"><img src={seller.avatar} alt={seller.name} className="-mt-16 h-32 w-32 rounded-[2rem] border-4 border-white object-cover shadow-soft dark:border-slate-950" /><div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-3xl font-bold">{seller.name}</h1><p className="mt-1 text-slate-500 dark:text-slate-400">Joined {seller.joined} · {seller.productCount.toLocaleString()} listings</p><div className="mt-3 flex flex-wrap gap-2"><RatingStars value={seller.rating} /><span className="chip">{seller.followers.toLocaleString()} followers</span><span className="chip">Reply time {seller.responseTime}</span></div></div><button className="btn-primary">Follow store</button></div></div></div></PageSection><PageSection><SectionHeading eyebrow="Store analytics" title="Seller dashboard snapshot" /><div className="grid gap-4 md:grid-cols-4">{[{ label: 'Sales', value: '1.2k', icon: LineChart }, { label: 'Response rate', value: '96%', icon: MessageCircle }, { label: 'Repeat buyers', value: '72%', icon: RefreshCw }, { label: 'Top rating', value: '4.8', icon: Star }].map((stat) => <div key={stat.label} className="surface rounded-3xl p-5"><stat.icon className="h-8 w-8 text-emerald-500" /><p className="mt-4 text-3xl font-bold">{stat.value}</p><p className="mt-1 text-sm text-slate-500">{stat.label}</p></div>)}</div></PageSection><PageSection><SectionHeading eyebrow="Products" title="Listings from this seller" /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{sellerProducts.map((product) => <div key={product.id} className="surface overflow-hidden rounded-[2rem]"><img src={product.image} alt={product.title} className="aspect-[4/3] w-full object-cover" /><div className="p-4"><h3 className="font-semibold">{product.title}</h3><p className="mt-2 text-sm text-slate-500">₹{product.price.toLocaleString()}</p></div></div>)}</div></PageSection></PageShell>;
}

export function TrendingPage() {
  return <PageShell><PageSection><SectionHeading eyebrow="Trending" title="Hot products gaining traction" description="Products with stronger ratings, more views and better deal ratios are emphasized here." /><ProductCarousel title="Popular right now" products={trendingProducts.slice(0, 12)} onQuickView={() => {}} /></PageSection></PageShell>;
}

export function DealsPage() {
  return <PageShell><PageSection><SectionHeading eyebrow="Deals" title="Best value listings" description="A flash-sale styled presentation for products with the strongest price-to-value story." action={<FlashSaleTimer seconds={11000} />} /><ProductCarousel title="Top deals" products={dealProducts.slice(0, 12)} onQuickView={() => {}} /></PageSection></PageShell>;
}

export function RecentlyViewedPage() {
  const { recentlyViewedItems } = useApp();
  return <PageShell><PageSection><SectionHeading eyebrow="History" title="Recently viewed products" />{recentlyViewedItems.length ? <ProductCarousel title="Continue browsing" products={recentlyViewedItems.slice(0, 12)} onQuickView={() => {}} /> : <EmptyState title="No recent items" description="Open some product pages to populate your recent browsing trail." action={<Link to="/marketplace" className="btn-primary">Browse marketplace</Link>} />}</PageSection></PageShell>;
}

export function FAQPage() {
  const questions = [{ q: 'Is this a real marketplace backend?', a: 'No. The app is frontend-only and simulates everything with static data and localStorage.' }, { q: 'How are the 10,000 products generated?', a: 'The catalog is created programmatically from category, seller and pricing arrays during app load.' }, { q: 'Do wishlist and cart actions persist?', a: 'Yes. They persist locally in the browser using localStorage.' }, { q: 'Can I use dark mode?', a: 'Yes. Theme preference is stored locally and toggles across the interface.' }];
  return <PageShell><PageSection><SectionHeading eyebrow="FAQ" title="Common questions" /><div className="space-y-3">{questions.map((item) => <details key={item.q} className="surface group rounded-3xl p-5"><summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4"><span>{item.q}</span><ChevronRight className="h-4 w-4 transition group-open:rotate-90" /></summary><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.a}</p></details>)}</div></PageSection></PageShell>;
}

export function NotFoundPage() {
  return <PageShell><PageSection><div className="surface rounded-[2rem] p-12 text-center"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">404</p><h1 className="mt-4 text-4xl font-black">Page not found</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">The route you requested does not exist in the demo experience. Return to the marketplace or explore the homepage.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link to="/" className="btn-primary">Go home</Link><Link to="/marketplace" className="btn-secondary">Browse marketplace</Link></div></div></PageSection></PageShell>;
}