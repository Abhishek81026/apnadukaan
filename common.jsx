import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronUp,
  Facebook,
  Heart,
  Instagram,
  LayoutGrid,
  LayoutList,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  PackageSearch,
  PhoneCall,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Store,
  SunMedium,
  Twitter,
  X
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { searchSuggestions, categories } from '../data/products';
import useDebounce from '../hooks/useDebounce';

export function RatingStars({ value = 0, size = 16 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const fill = value >= index + 1 ? 1 : value > index ? value - index : 0;
        return (
          <span key={index} className="relative inline-flex" style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" width={size} height={size} className="text-slate-300 dark:text-slate-700">
              <path fill="currentColor" d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, fill)) * 100}%` }}>
              <svg viewBox="0 0 24 24" width={size} height={size} className="text-amber-400">
                <path fill="currentColor" d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
          </span>
        );
      })}
      <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">{value.toFixed(1)}</span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">{eyebrow}</p> : null}
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SearchBar({ value = '', onChange, onSubmit, placeholder = 'Search products, categories or sellers...', compact = false }) {
  const navigate = useNavigate();
  const { state, addSearchHistory, clearSearchHistory } = useApp();
  const [focused, setFocused] = useState(false);
  const debouncedValue = useDebounce(value, 200);
  const suggestions = useMemo(() => searchSuggestions(debouncedValue), [debouncedValue]);

  const handleSubmit = (query) => {
    const normalized = query.trim();
    if (!normalized) return;
    addSearchHistory(normalized);
    if (onSubmit) onSubmit(normalized);
    navigate(`/marketplace?q=${encodeURIComponent(normalized)}`);
    setFocused(false);
  };

  return (
    <div className={`relative ${compact ? 'max-w-xl' : 'w-full'}`}>
      <form onSubmit={(event) => { event.preventDefault(); handleSubmit(value); }} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input value={value} onChange={(event) => onChange(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 120)} className="input-field pl-11 pr-32 shadow-soft" placeholder={placeholder} />
        <button className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 text-xs">Search</button>
      </form>
      <AnimatePresence>
        {focused && (suggestions.length > 0 || state.searchHistory.length > 0) ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="absolute z-40 mt-3 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-slate-800">
              <span>Suggestions</span>
              <button type="button" onClick={clearSearchHistory} className="text-emerald-600 hover:text-emerald-500">Clear history</button>
            </div>
            <div className="max-h-80 overflow-auto p-2 scrollbar-thin">
              {suggestions.map((item) => <button key={item} type="button" onClick={() => handleSubmit(item)} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"><span>{item}</span><ArrowRight className="h-4 w-4 text-slate-400" /></button>)}
              {state.searchHistory.map((item) => <button key={item} type="button" onClick={() => handleSubmit(item)} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"><span className="flex items-center gap-2"><PackageSearch className="h-4 w-4 text-emerald-500" /> {item}</span><ChevronRight className="h-4 w-4 text-slate-400" /></button>)}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return <button type="button" onClick={toggleTheme} className="btn-secondary px-4 py-2">{theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}<span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span></button>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlistCount } = useApp();
  const navItems = [{ to: '/', label: 'Home' }, { to: '/marketplace', label: 'Marketplace' }, { to: '/categories', label: 'Categories' }, { to: '/trending', label: 'Trending' }, { to: '/deals', label: 'Deals' }, { to: '/faq', label: 'FAQ' }];

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white shadow-glow"><Store className="h-5 w-5" /></div><div><p className="text-base font-bold tracking-tight">ApnaDukaan</p><p className="text-xs text-slate-500 dark:text-slate-400">Buy Smart. Sell Easy. Save More.</p></div></Link>
        <nav className="hidden items-center gap-1 lg:flex">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-emerald-500 text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}`}>{item.label}</NavLink>)}</nav>
        <div className="hidden flex-1 lg:block"><SearchBar compact /></div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/wishlist" className="btn-secondary px-4 py-2"><Heart className="h-4 w-4" /><span className="hidden sm:inline">Wishlist</span>{wishlistCount ? <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] text-white">{wishlistCount}</span> : null}</Link>
          <Link to="/cart" className="btn-primary px-4 py-2"><ShoppingCart className="h-4 w-4" /><span className="hidden sm:inline">Cart</span>{cartCount ? <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">{cartCount}</span> : null}</Link>
          <button type="button" onClick={() => setOpen((prev) => !prev)} className="btn-secondary px-4 py-2 lg:hidden">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <div className="space-y-3"><SearchBar /><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}>{item.label}</NavLink>)}</div></div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function Loader({ label = 'Loading...' }) {
  return <div className="flex min-h-[40vh] items-center justify-center"><div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-soft dark:border-slate-800 dark:bg-slate-900"><LoaderCircle className="h-10 w-10 animate-spin text-emerald-500" /><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p></div></div>;
}

export function EmptyState({ icon: Icon = PackageSearch, title, description, action }) {
  return <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500"><Icon className="h-7 w-7" /></div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>{action ? <div className="mt-6">{action}</div> : null}</div>;
}

export function StatCounter({ end, suffix = '', label }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let current = 0;
    const steps = 44;
    const increment = Math.max(1, Math.ceil(end / steps));
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setValue(current);
    }, 28);
    return () => clearInterval(timer);
  }, [end]);
  return <div className="rounded-3xl border border-slate-200 bg-white px-5 py-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900"><div className="text-3xl font-bold text-slate-900 dark:text-white">{value.toLocaleString()}{suffix}</div><div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</div></div>;
}

export function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const linkGroups = [{ title: 'Explore', links: [{ to: '/marketplace', label: 'Marketplace' }, { to: '/trending', label: 'Trending' }, { to: '/deals', label: 'Deals' }] }, { title: 'Company', links: [{ to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }, { to: '/faq', label: 'FAQ' }] }, { title: 'Account', links: [{ to: '/profile', label: 'Profile' }, { to: '/wishlist', label: 'Wishlist' }, { to: '/cart', label: 'Cart' }] }];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white shadow-glow"><Store className="h-5 w-5" /></div><div><p className="text-lg font-bold">ApnaDukaan</p><p className="text-sm text-slate-500 dark:text-slate-400">Buy Smart. Sell Easy. Save More.</p></div></Link>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">A premium secondhand marketplace experience for students, hostels and local communities. Built to feel like a real startup product with realistic frontend interactions.</p>
          <div className="mt-6 flex flex-wrap gap-2"><a className="chip" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4" /> Instagram</a><a className="chip" href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook className="h-4 w-4" /> Facebook</a><a className="chip" href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="h-4 w-4" /> X/Twitter</a><a className="chip" href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn</a></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">{linkGroups.map((group) => <div key={group.title}><h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{group.title}</h4><div className="mt-4 space-y-3">{group.links.map((link) => <Link key={link.to} to={link.to} className="block text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400">{link.label}</Link>)}</div></div>)}</div>
      </div>
      <div className="border-t border-slate-200 px-4 py-6 dark:border-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 ApnaDukaan. Built for exhibition demos and startup-style presentation.</p>
          <form onSubmit={(event) => { event.preventDefault(); showToast('Newsletter subscribed', email || 'Thanks for joining our list'); setEmail(''); }} className="flex w-full max-w-md gap-2"><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email for launch updates" className="input-field" /><button className="btn-primary whitespace-nowrap px-4 py-3 text-sm"><Send className="h-4 w-4" /> Join</button></form>
        </div>
      </div>
    </footer>
  );
}

export function ToastViewport() {
  const { toast, dismissToast } = useApp();
  useEffect(() => { if (!toast) return undefined; const timer = setTimeout(dismissToast, 2600); return () => clearTimeout(timer); }, [toast, dismissToast]);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed right-4 top-20 z-[60] w-[min(360px,calc(100vw-2rem))] rounded-3xl border border-emerald-200 bg-white p-4 shadow-soft dark:border-emerald-900 dark:bg-slate-900">
          <div className="flex items-start gap-3"><div className="mt-0.5 rounded-2xl bg-emerald-500/10 p-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div><div className="flex-1"><p className="font-semibold text-slate-900 dark:text-white">{toast.title}</p>{toast.message ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{toast.message}</p> : null}</div><button type="button" onClick={dismissToast} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"><X className="h-4 w-4" /></button></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Modal({ open, onClose, title, children, width = 'max-w-3xl' }) {
  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button type="button" aria-label="Close modal" className="absolute inset-0 bg-slate-950/70" onClick={onClose} /><motion.div initial={{ scale: 0.96, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 16, opacity: 0 }} className={`relative z-10 w-full ${width} overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950`}><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"><h3 className="text-lg font-semibold">{title}</h3><button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-900"><X className="h-5 w-5" /></button></div>{children}</motion.div></motion.div> : null}</AnimatePresence>;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const handler = () => setVisible(window.scrollY > 600); window.addEventListener('scroll', handler, { passive: true }); handler(); return () => window.removeEventListener('scroll', handler); }, []);
  if (!visible) return null;
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 p-4 text-white shadow-glow"><ChevronUp className="h-5 w-5" /></button>;
}

export function FloatingSupportButton() {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-6 left-6 z-50"><AnimatePresence>{open ? <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mb-3 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-950"><div className="flex items-center justify-between"><p className="font-semibold">Need help?</p><button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-900"><X className="h-4 w-4" /></button></div><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Demo support panel with fast answers for exhibition walkthroughs.</p><div className="mt-4 grid gap-2"><a href="mailto:hello@apnadukaan.in" className="btn-secondary justify-start"><Mail className="h-4 w-4" /> Email support</a><a href="tel:+910000000000" className="btn-secondary justify-start"><PhoneCall className="h-4 w-4" /> Call support</a></div></motion.div> : null}</AnimatePresence><button type="button" onClick={() => setOpen((prev) => !prev)} className="btn-primary rounded-full px-5 py-4"><MessageCircle className="h-5 w-5" /> Support</button></div>;
}

export function SimpleCounterStrip() {
  const stats = [{ value: 10000, suffix: '+', label: 'Products' }, { value: 5000, suffix: '+', label: 'Users' }, { value: 1000, suffix: '+', label: 'Sellers' }, { value: categories.length, suffix: '+', label: 'Categories' }];
  return <div className="grid gap-4 md:grid-cols-4">{stats.map((stat) => <StatCounter key={stat.label} end={stat.value} suffix={stat.suffix} label={stat.label} />)}</div>;
}

export function FlashBadge({ children }) {
  return <span className="chip border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">{children}</span>;
}

export function MobileSectionTabs({ tabs, active, onChange }) {
  return <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin lg:hidden">{tabs.map((tab) => <button key={tab} type="button" onClick={() => onChange(tab)} className={`chip whitespace-nowrap ${active === tab ? 'bg-emerald-500 text-white' : ''}`}>{tab}</button>)}</div>;
}