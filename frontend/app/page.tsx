'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import CategoryGrid from '@/components/home/CategoryGrid'
import TrendingProducts from '@/components/home/TrendingProducts'
import FlashDeals from '@/components/home/FlashDeals'
import BrandShowcase from '@/components/home/BrandShowcase'
import { FeaturedSellers } from '@/components/home/FeaturedSellers'
import { FeaturedBrands } from '@/components/ui/FeaturedBrands'
import { PromoCards } from '@/components/ui/PromoCards'
import { MobileAppBanner } from '@/components/ui/MobileAppBanner'
import { RecentlyViewed } from '@/components/ui/RecentlyViewed'
import { ArrowRight } from 'lucide-react'
import InteractiveBackground from '@/components/ui/interactive/InteractiveBackground'
import MouseTracker from '@/components/ui/interactive/MouseTracker'
import FloatingParticles from '@/components/ui/interactive/FloatingParticles'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <InteractiveBackground 
      className="min-h-screen dark-gradient-bg"
      particleCount={10}
      particleOpacity={0.15}
      particleSize={2}
      gradientColors={['rgba(79, 142, 255, 0.05)', 'rgba(65, 241, 182, 0.03)']}
    >
      <Header />
      
      <MouseTracker className="w-full">
        <FloatingParticles count={8} minSize={1} maxSize={5} />
        <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <HeroCarousel />
          
          {/* Floating search bar - Devin.ai inspired */}
          <div className="absolute bottom-8 left-0 right-0 z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  className="glass-card p-2 rounded-lg shadow-sm border border-black/5 backdrop-blur-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ 
                    boxShadow: '0 0 10px rgba(79, 142, 255, 0.1), 0 0 3px rgba(65, 241, 182, 0.05)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-grow">
                      <input 
                        type="text" 
                        placeholder="Search for products, brands, or categories..." 
                        className="w-full px-4 py-2 rounded-lg bg-white/80 border border-black/5 text-black/80 placeholder-black/40 focus:outline-none focus:ring-1 focus:ring-[#4f8eff]/30 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                    <motion.button 
                      className="bg-[#4f8eff] text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: '0 0 8px rgba(79, 142, 255, 0.2)'
                      }}
                    >
                      Search
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto px-4 py-8 border-b border-opacity-10 border-black">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <PromoCards />
          </motion.div>
        </section>

        {/* Categories Section - More compact */}
        <section className="dark-gradient-bg py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mb-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Shop by Category</h2>
              <p className="text-black/60 text-base font-light">Discover products across all departments</p>
            </motion.div>
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Brands - More compact */}
        <section className="container mx-auto px-4 py-8 border-b border-opacity-10 border-black">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Featured Brands</h2>
              <p className="text-black/60 text-base font-light">Shop from our curated collection of top brands</p>
            </div>
            <FeaturedBrands />
          </motion.div>
        </section>

        {/* Flash Deals Section - More compact */}
        <section className="dark-gradient-bg py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Today's Best Deals</h2>
                <p className="text-black/60 text-base font-light">Limited time offers with exceptional savings</p>
              </div>
              <motion.button 
                className="hidden md:flex items-center text-black/70 hover:text-black font-medium"
                whileHover={{ 
                  scale: 1.02,
                  color: 'rgba(79, 142, 255, 1)'
                }}
              >
                View All Deals
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </motion.div>
            <FlashDeals />
            <div className="mt-6 text-center md:hidden">
              <motion.button 
                className="inline-flex items-center text-black/70 hover:text-black font-medium"
                whileHover={{ 
                  scale: 1.02,
                  color: 'rgba(79, 142, 255, 1)'
                }}
              >
                View All Deals
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="dark-gradient-bg py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mb-4 text-center"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Top Global Brands</h2>
              <p className="text-black/60 text-base font-light">Shop from the world's most trusted manufacturers</p>
            </motion.div>
            <BrandShowcase />
          </div>
        </section>

        {/* Trending Products Section - More compact */}
        <section className="dark-gradient-bg py-8">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Trending Products</h2>
                <p className="text-black/60 text-base font-light">Most popular products based on customer purchases</p>
              </div>
              <motion.button 
                className="hidden md:flex items-center text-black/70 hover:text-black font-medium"
                whileHover={{ 
                  scale: 1.02,
                  color: 'rgba(79, 142, 255, 1)'
                }}
              >
                View All Trending
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </motion.div>
            <TrendingProducts />
            <div className="mt-6 text-center md:hidden">
              <motion.button 
                className="inline-flex items-center text-black/70 hover:text-black font-medium"
                whileHover={{ 
                  scale: 1.02,
                  color: 'rgba(79, 142, 255, 1)'
                }}
              >
                View All Trending
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>
        
        {/* Featured Sellers Section - More compact */}
        <section className="py-8 dark-gradient-bg">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mb-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Featured Sellers</h2>
              <p className="text-black/60 text-base font-light">Discover unique products from our top marketplace sellers</p>
            </motion.div>
            <FeaturedSellers />
          </div>
        </section>

        {/* Recently Viewed - More compact */}
        <section className="container mx-auto px-4 py-8 border-t border-opacity-10 border-black">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent mb-1">Recently Viewed</h2>
              <p className="text-black/60 text-base font-light">Continue shopping where you left off</p>
            </div>
            <RecentlyViewed />
          </motion.div>
        </section>

        {/* Newsletter section removed as requested */}

        {/* Mobile App Banner - More compact */}
        <section className="container mx-auto px-4 py-8 border-t border-opacity-10 border-black">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <MobileAppBanner />
          </motion.div>
        </section>
      </main>
      </MouseTracker>

      <Footer />
    </InteractiveBackground>
  )
}                                                                                                      