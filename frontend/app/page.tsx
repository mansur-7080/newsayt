import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import CategoryGrid from '@/components/home/CategoryGrid'
import TrendingProducts from '@/components/home/TrendingProducts'
import FlashDeals from '@/components/home/FlashDeals'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative">
          <HeroCarousel />
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600">Discover amazing products in every category</p>
          </div>
          <CategoryGrid />
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

        {/* Trending Products Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Trending Now</h2>
            <p className="text-gray-600">Most popular products loved by our customers</p>
          </div>
          <TrendingProducts />
        </section>
      </main>

      <Footer />
    </div>
  )
}   