'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingProducts from '@/components/home/TrendingProducts'
import FlashDeals from '@/components/home/FlashDeals'
import ShellShockerDeals from '@/components/home/ShellShockerDeals'
import ComboDeals from '@/components/home/ComboDeals'
import { FeaturedSellers } from '@/components/home/FeaturedSellers'
import { PromoCards } from '@/components/ui/PromoCards'
import { ChevronRight, Cpu, Monitor, Laptop, HardDrive, Gamepad, Wifi, Printer, Wrench, Home } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
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
    <>
      <Header />
      
      <main className="bg-[var(--newegg-body-bg)]">
        {/* Hero Banner */}
        <section className="bg-[var(--newegg-blue-dark)] text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm p-4 mb-6">
                <h3 className="text-lg font-bold text-[var(--newegg-text-primary)] mb-4 pb-2 border-b border-[var(--newegg-card-border)]">
                  Shop By Category
                </h3>
                <ul className="space-y-2">
                  {[
                    { name: 'Components & Storage', icon: <Cpu className="w-4 h-4" /> },
                    { name: 'Computer Systems', icon: <Laptop className="w-4 h-4" /> },
                    { name: 'Peripherals', icon: <Monitor className="w-4 h-4" /> },
                    { name: 'Networking', icon: <Wifi className="w-4 h-4" /> },
                    { name: 'Electronics', icon: <HardDrive className="w-4 h-4" /> },
                    { name: 'Gaming & VR', icon: <Gamepad className="w-4 h-4" /> },
                    { name: 'Office Solutions', icon: <Printer className="w-4 h-4" /> },
                    { name: 'Automotive & Tools', icon: <Wrench className="w-4 h-4" /> },
                    { name: 'Home & Outdoors', icon: <Home className="w-4 h-4" /> }
                  ].map((category) => (
                    <li key={category.name}>
                      <Link 
                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)] flex items-center gap-2 py-1"
                      >
                        {category.icon}
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm p-4 mb-6">
                <h3 className="text-lg font-bold text-[var(--newegg-text-primary)] mb-4 pb-2 border-b border-[var(--newegg-card-border)]">
                  Shop By Brand
                </h3>
                <ul className="space-y-2">
                  {[
                    'ASUS',
                    'MSI',
                    'GIGABYTE',
                    'Intel',
                    'AMD',
                    'NVIDIA',
                    'Samsung',
                    'Corsair',
                    'Logitech',
                    'Seagate'
                  ].map((brand) => (
                    <li key={brand}>
                      <Link 
                        href={`/brand/${brand.toLowerCase()}`}
                        className="text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)] block py-1"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm p-4">
                <h3 className="text-lg font-bold text-[var(--newegg-text-primary)] mb-4 pb-2 border-b border-[var(--newegg-card-border)]">
                  Customer Service
                </h3>
                <ul className="space-y-2">
                  {[
                    'Help Center',
                    'Track Order',
                    'Return Policy',
                    'Feedback',
                    'Contact Us'
                  ].map((item) => (
                    <li key={item}>
                      <Link 
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)] block py-1"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Promo Cards */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <PromoCards />
                </motion.div>
              </section>

              {/* Shell Shocker Deals */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <ShellShockerDeals />
                </motion.div>
              </section>

              {/* Combo Deals */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <ComboDeals />
                </motion.div>
              </section>

              {/* Today's Best Deals */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[var(--newegg-text-primary)]">Today's Best Deals</h2>
                    <Link 
                      href="/deals" 
                      className="text-sm text-[var(--newegg-blue-light)] hover:text-[var(--newegg-orange)] flex items-center"
                    >
                      View All Deals
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <FlashDeals />
                </motion.div>
              </section>

              {/* Trending Products */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[var(--newegg-text-primary)]">Trending Products</h2>
                    <Link 
                      href="/trending" 
                      className="text-sm text-[var(--newegg-blue-light)] hover:text-[var(--newegg-orange)] flex items-center"
                    >
                      View All Trending
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <TrendingProducts />
                </motion.div>
              </section>

              {/* Featured Sellers */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[var(--newegg-text-primary)]">Featured Sellers</h2>
                    <Link 
                      href="/seller" 
                      className="text-sm text-[var(--newegg-blue-light)] hover:text-[var(--newegg-orange)] flex items-center"
                    >
                      View All Sellers
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <FeaturedSellers />
                </motion.div>
              </section>

              {/* PC Builder Banner */}
              <section className="mb-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="bg-[var(--newegg-blue-dark)] text-white p-6 rounded-sm">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Build Your Dream PC</h3>
                        <p className="mb-4 text-sm">Use our PC Builder to create a custom computer tailored to your needs</p>
                        <Link 
                          href="/pc-builder" 
                          className="inline-block px-4 py-2 bg-[var(--newegg-orange)] text-white rounded-sm text-sm font-medium hover:bg-[#ff5722] transition-colors"
                        >
                          Start Building
                        </Link>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <div className="w-24 h-24 bg-[var(--newegg-blue-medium)] rounded-full flex items-center justify-center">
                          <span className="text-4xl font-bold">PC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}                                                                                                                                           