import { FixedSizeGrid as Grid } from 'react-window';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bike,
  BookOpen,
  Camera,
  CarFront,
  Check,
  Gem,
  Gamepad2,
  GraduationCap,
  Grid2x2,
  Headphones,
  Heart,
  HeartOff,
  Laptop,
  Layers3,
  LayoutList,
  ListFilter,
  PackageSearch,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  Store,
  TabletSmartphone,
  Trash2,
  Watch,
  ZoomIn
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import useElementSize from '../hooks/useElementSize';
import { categories } from '../data/products';
import { useApp } from '../context/AppContext';
import { EmptyState, Modal, RatingStars, SearchBar, SectionHeading } from './common';

const iconByKey = {
  sparkles: Sparkles,
  smartphone: Smartphone,
  laptop: Laptop,
  'book-open': BookOpen,
  shirt: Shirt,
  sofa: Sofa,
  'car-front': CarFront,
  'gamepad-2': Gamepad2,
  headphones: Headphones,
  camera: Camera,
  watch: Watch,
  'tablet-smartphone': TabletSmartphone,
  'graduation-cap': GraduationCap,
  bike: Bike,
  gem: Gem,
  'layers-3': Layers3
};

export function CategoryCard({ category, count, active, onClick }) {
  const Icon = iconByKey[category.iconKey] || Sparkles;
  return (
    <button type="button" onClick={onClick} className={`group relative overflow-hidden rounded-3xl border px-5 py-5 text-left shadow-soft transition hover:-translate-y-1 ${active ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition group-hover:opacity-10`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-glow`}><Icon className="h-5 w-5" /></div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{count.toLocaleString()}</span>
      </div>
    </button>
  );
}

export function ProductCard({ product, onQuickView }) {
  const { isWishlisted, toggleWishlist, addToCart, isCompared, toggleCompare } = useApp();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-col gap-2"><span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-white">{product.condition}</span><span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white">-{product.discount}%</span></div>
        <div className="absolute right-3 top-3 flex gap-2"><button onClick={() => toggleWishlist(product.id)} type="button" className="rounded-full bg-white/90 p-2 text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-white">{wishlisted ? <Heart className="h-4 w-4 fill-current text-rose-500" /> : <HeartOff className="h-4 w-4" />}</button><button onClick={() => addToCart(product.id)} type="button" className="rounded-full bg-white/90 p-2 text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-white"><ShoppingCart className="h-4 w-4" /></button></div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2"><span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-white">{product.badge}</span><button onClick={() => onQuickView(product)} type="button" className="rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">Quick View</button></div>
      </div>
      <div className="p-4">
        <button onClick={() => navigate(`/product/${product.id}`)} className="block text-left"><h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-slate-900 dark:text-white">{product.title}</h3></button>
        <div className="mt-2 flex items-center justify-between gap-2"><div><div className="text-lg font-bold text-slate-900 dark:text-white">₹{product.price.toLocaleString()}</div><div className="text-xs text-slate-500 line-through dark:text-slate-400">₹{product.originalPrice.toLocaleString()}</div></div><RatingStars value={product.rating} /></div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"><span>{product.seller}</span><span>{product.location}</span></div>
        <div className="mt-3 flex items-center gap-2"><button onClick={() => navigate(`/product/${product.id}`)} className="btn-secondary flex-1 px-4 py-2 text-xs">View details</button><button onClick={() => toggleCompare(product.id)} className={`rounded-full border px-3 py-2 text-xs font-semibold ${compared ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'}`}>Compare</button></div>
      </div>
    </motion.article>
  );
}

export function ProductQuickView({ product, open, onClose }) {
  const { toggleWishlist, addToCart, isWishlisted, viewProduct } = useApp();
  useEffect(() => { if (open && product) viewProduct(product.id); }, [open, product, viewProduct]);
  if (!product) return null;
  const wishlisted = isWishlisted(product.id);
  return (
    <Modal open={open} onClose={onClose} title="Quick Preview" width="max-w-5xl">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative bg-slate-100 dark:bg-slate-900"><img src={product.image} alt={product.title} className="h-full w-full object-cover" /><div className="absolute left-4 top-4 flex gap-2"><span className="chip bg-white/90 text-slate-700">{product.category}</span><span className="chip bg-emerald-500 text-white">{product.condition}</span></div></div>
        <div className="max-h-[80vh] overflow-auto p-6 scrollbar-thin">
          <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-bold tracking-tight">{product.title}</h3><div className="mt-2 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"><RatingStars value={product.rating} /><span>{product.reviewCount} reviews</span></div></div><button onClick={() => toggleWishlist(product.id)} className="rounded-full border border-slate-200 p-3 dark:border-slate-800">{wishlisted ? <Heart className="h-5 w-5 fill-current text-rose-500" /> : <HeartOff className="h-5 w-5" />}</button></div>
          <div className="mt-5 flex items-center gap-3"><div className="text-3xl font-bold text-emerald-600">₹{product.price.toLocaleString()}</div><div className="text-sm text-slate-500 line-through dark:text-slate-400">₹{product.originalPrice.toLocaleString()}</div><span className="chip border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30">-{product.discount}%</span></div>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{product.description}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Seller</p><p className="mt-1 font-semibold">{product.seller}</p></div><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Location</p><p className="mt-1 font-semibold">{product.location}</p></div></div>
          <div className="mt-5 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
          <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => addToCart(product.id)} className="btn-primary flex-1 px-5 py-3"><ShoppingCart className="h-4 w-4" /> Add to cart</button><button onClick={() => toggleWishlist(product.id)} className="btn-secondary flex-1 px-5 py-3"><Heart className="h-4 w-4" /> Wishlist</button></div>
        </div>
      </div>
    </Modal>
  );
}

export function SidebarFilter({ filters, onChange, onClear, onApply, compact = false }) {
  return (
    <aside className={`surface rounded-[2rem] p-5 ${compact ? '' : 'sticky top-24'}`}>
      <div className="flex items-center justify-between gap-2"><h3 className="text-lg font-semibold">Filters</h3><button type="button" onClick={onClear} className="text-sm font-medium text-emerald-600">Clear</button></div>
      <div className="mt-5 space-y-5">
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price range</label><div className="mt-3 grid grid-cols-2 gap-3"><input type="number" value={filters.minPrice} onChange={(event) => onChange('minPrice', event.target.value)} className="input-field py-2.5" placeholder="Min" /><input type="number" value={filters.maxPrice} onChange={(event) => onChange('maxPrice', event.target.value)} className="input-field py-2.5" placeholder="Max" /></div></div>
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rating</label><div className="mt-3 flex flex-wrap gap-2">{[0, 3, 4, 4.5].map((rating) => <button key={rating} type="button" onClick={() => onChange('rating', rating)} className={`chip ${filters.rating === rating ? 'bg-emerald-500 text-white' : ''}`}>{rating ? `${rating}+` : 'Any'}</button>)}</div></div>
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Condition</label><select value={filters.condition} onChange={(event) => onChange('condition', event.target.value)} className="input-field mt-3"><option value="">Any condition</option>{['Like New', 'Excellent', 'Good', 'Fair', 'Refurbished', 'Open Box'].map((condition) => <option key={condition}>{condition}</option>)}</select></div>
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Location</label><select value={filters.location} onChange={(event) => onChange('location', event.target.value)} className="input-field mt-3"><option value="">Any city</option>{['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'].map((location) => <option key={location}>{location}</option>)}</select></div>
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sort</label><select value={filters.sort} onChange={(event) => onChange('sort', event.target.value)} className="input-field mt-3"><option value="featured">Featured</option><option value="latest">Latest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Rating</option></select></div>
        <div><label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">View</label><div className="mt-3 flex gap-2"><button type="button" onClick={() => onChange('view', 'grid')} className={`chip ${filters.view === 'grid' ? 'bg-emerald-500 text-white' : ''}`}><Grid2x2 className="h-4 w-4" /> Grid</button><button type="button" onClick={() => onChange('view', 'list')} className={`chip ${filters.view === 'list' ? 'bg-emerald-500 text-white' : ''}`}><LayoutList className="h-4 w-4" /> List</button></div></div>
        <button type="button" onClick={onApply} className="btn-primary w-full"><ListFilter className="h-4 w-4" /> Apply filters</button>
      </div>
    </aside>
  );
}

export function ProductGrid({ products, listView = false, onQuickView, onLoadMore, hasMore = false, virtualized = true }) {
  const container = useRef(null);
  const { ref, width } = useElementSize();
  const columns = useMemo(() => (width < 640 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4), [width]);
  const cellWidth = width > 0 ? Math.floor(width / columns) : 320;
  const cellHeight = 420;
  const rowCount = Math.ceil(products.length / columns);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return undefined;
    const marker = container.current?.querySelector('[data-load-more]');
    if (!marker) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLoadMore();
    }, { rootMargin: '400px' });
    observer.observe(marker);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, products.length]);

  if (!listView && virtualized && width > 0) {
    return <div ref={ref} className="space-y-6"><div ref={container} className="surface rounded-[2rem] p-3"><Grid columnCount={columns} columnWidth={cellWidth} height={Math.min(1400, Math.max(720, Math.ceil(products.length / columns) * cellHeight))} rowCount={rowCount} rowHeight={cellHeight} width={width} overscanRowCount={4}>{({ columnIndex, rowIndex, style }) => { const product = products[rowIndex * columns + columnIndex]; if (!product) return null; return <div style={{ ...style, padding: 12 }}><ProductCard product={product} onQuickView={onQuickView} /></div>; }}</Grid></div>{hasMore ? <div data-load-more className="h-10 w-full" /> : null}</div>;
  }

  return <div ref={container} className={`grid gap-5 ${listView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'}`}>{products.map((product) => listView ? <motion.article key={product.id} whileHover={{ y: -3 }} className="surface flex flex-col overflow-hidden rounded-[1.75rem] md:flex-row"><div className="relative aspect-[4/3] w-full md:w-72"><img src={product.image} alt={product.title} className="h-full w-full object-cover" loading="lazy" /></div><div className="flex-1 p-5"><div className="flex flex-wrap items-center gap-2"><span className="chip">{product.category}</span><span className="chip">{product.condition}</span><span className="chip bg-emerald-500 text-white">-{product.discount}%</span></div><Link to={`/product/${product.id}`} className="mt-3 block text-xl font-semibold text-slate-900 dark:text-white">{product.title}</Link><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p><div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400"><span>{product.seller}</span><span>{product.location}</span><RatingStars value={product.rating} /></div><div className="mt-5 flex items-center gap-3"><div className="text-2xl font-bold">₹{product.price.toLocaleString()}</div><button onClick={() => onQuickView(product)} className="btn-secondary px-4 py-2 text-xs">Quick view</button></div></div></motion.article> : <ProductCard key={product.id} product={product} onQuickView={onQuickView} />)}{hasMore ? <div data-load-more className="h-10 w-full" /> : null}</div>;
}

export function ProductCarousel({ title, products, onQuickView }) {
  return <section><SectionHeading eyebrow="Curated" title={title} /><div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">{products.map((product) => <div key={product.id} className="min-w-[280px] max-w-[280px]"><ProductCard product={product} onQuickView={onQuickView} /></div>)}</div></section>;
}

export function HeroSection({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const floatingProducts = useMemo(() => categories.slice(0, 3), []);

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white px-6 py-10 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:px-10 lg:px-12 lg:py-14">
      <div className="absolute inset-0 mesh-bg opacity-90" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2"><span className="chip bg-emerald-500 text-white">Marketplace 2.0</span><span className="chip"><Sparkles className="h-4 w-4 text-amber-500" /> Startup-quality UI</span></div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">Buy Smart. Sell Easy. <span className="text-gradient">Save More.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">A polished secondhand marketplace for students and communities. Discover trusted deals, list used items fast, and browse a premium storefront experience that feels production-ready.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row"><button onClick={() => navigate('/marketplace')} className="btn-primary">Explore Products <ArrowRight className="h-4 w-4" /></button><button onClick={() => navigate('/seller/urban-loop')} className="btn-secondary">Start Selling <Store className="h-4 w-4" /></button></div>
          <div className="mt-8"><SearchBar value={query} onChange={setQuery} onSubmit={(value) => onSearch?.(value) || navigate(`/marketplace?q=${encodeURIComponent(value)}`)} placeholder="Search used laptops, books, bikes, headphones..." /></div>
          <div className="mt-8 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">{['Trending deals', 'Campus verified', 'Fast pickup', 'Eco-friendly reuse'].map((label) => <span key={label} className="chip"><Check className="h-4 w-4 text-emerald-500" /> {label}</span>)}</div>
        </div>
        <div className="relative"><div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" /><div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-blue-400/20 blur-3xl" /><motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="surface relative rounded-[2rem] p-5"><div className="grid gap-4 sm:grid-cols-2">{floatingProducts.map((category, index) => <div key={category.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950" style={{ transform: `translateY(${index % 2 === 0 ? 0 : 18}px)` }}><div className={`mb-3 h-28 rounded-2xl bg-gradient-to-br ${category.gradient}`} /><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{category.name}</p><p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{category.description}</p></div>)}</div><div className="mt-4 flex items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-4 text-white shadow-glow"><div><p className="text-xs uppercase tracking-[0.25em] text-white/80">Today’s deal pulse</p><p className="mt-1 text-lg font-semibold">55% off on featured essentials</p></div><div className="rounded-2xl bg-white/20 px-3 py-2 text-sm font-semibold">Ends in 03:24:18</div></div></motion.div></div>
      </motion.div>
    </section>
  );
}

export function QuickCompareTray({ products, onClear }) {
  if (!products.length) return null;
  return <div className="surface fixed bottom-24 left-1/2 z-40 flex w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 items-center justify-between gap-4 rounded-[2rem] px-4 py-3 shadow-soft"><div><p className="text-sm font-semibold">Compare {products.length} products</p><p className="text-xs text-slate-500">Open compare from cards, then review side by side.</p></div><div className="flex gap-2">{products.slice(0, 3).map((product) => <Link key={product.id} to={`/product/${product.id}`} className="chip">{product.title.slice(0, 18)}</Link>)}<button onClick={onClear} className="btn-secondary px-4 py-2 text-xs">Clear</button></div></div>;
}

export function FlashSaleTimer({ seconds = 14400 }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => { const timer = setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000); return () => clearInterval(timer); }, []);
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const sec = remaining % 60;
  return <div className="rounded-3xl bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-4 text-white shadow-glow"><p className="text-xs uppercase tracking-[0.25em] text-white/80">Flash sale ends in</p><p className="mt-1 text-2xl font-black tabular-nums">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(sec).padStart(2, '0')}</p></div>;
}