import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { BackToTop, Footer, FloatingSupportButton, Loader, Navbar, ToastViewport } from './components/common';

const HomePage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.HomePage })));
const MarketplacePage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.MarketplacePage })));
const ProductDetailsPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.ProductDetailsPage })));
const CategoriesPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.CategoriesPage })));
const WishlistPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.WishlistPage })));
const CartPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.CartPage })));
const AboutPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.ContactPage })));
const ProfilePage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.ProfilePage })));
const SellerStorePage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.SellerStorePage })));
const TrendingPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.TrendingPage })));
const DealsPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.DealsPage })));
const RecentlyViewedPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.RecentlyViewedPage })));
const FAQPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.FAQPage })));
const NotFoundPage = lazy(() => import('./pages/Pages').then((module) => ({ default: module.NotFoundPage })));

function ShellRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader label="Preparing ApnaDukaan..." />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/seller/:slug" element={<SellerStorePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <ToastViewport />
      <ShellRoutes />
      <Footer />
      <BackToTop />
      <FloatingSupportButton />
    </AppProvider>
  );
}