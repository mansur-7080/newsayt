import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import CategoryGrid from '@/components/home/CategoryGrid'
import TrendingProducts from '@/components/home/TrendingProducts'
import FlashDeals from '@/components/home/FlashDeals'
import BrandShowcase from '@/components/home/BrandShowcase'
import { FeaturedBrands } from '@/components/ui/FeaturedBrands'
import { PromoCards } from '@/components/ui/PromoCards'
import { NewsletterSignup } from '@/components/ui/NewsletterSignup'
import { MobileAppBanner } from '@/components/ui/MobileAppBanner'
import { RecentlyViewed } from '@/components/ui/RecentlyViewed'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative">
          <HeroCarousel />
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto px-4 py-8">
          <PromoCards />
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600">Discover amazing products in every category</p>
          </div>
          <CategoryGrid />
        </section>

        {/* Featured Brands */}
        <section className="container mx-auto px-4 py-8">
          <FeaturedBrands />
        </section>

        {/* Flash Deals Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">⚡ Flash Deals</h2>
                <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
              </div>
            </div>
            <FlashDeals />
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Top Global Brands</h2>
              <p className="text-white/80">Shop from the world's most trusted brands</p>
            </div>
            <BrandShowcase />
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Trending Now</h2>
            <p className="text-gray-600">Most popular products loved by our customers</p>
          </div>
          <TrendingProducts />
        </section>

        {/* Recently Viewed */}
        <section className="container mx-auto px-4 py-8">
          <RecentlyViewed />
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 py-8">
          <NewsletterSignup />
        </section>

        {/* Mobile App Banner */}
        <section className="container mx-auto px-4 py-8">
          <MobileAppBanner />
        </section>
      </main>

      <Footer />
    </div>
  )
}      