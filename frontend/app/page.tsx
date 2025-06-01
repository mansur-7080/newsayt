'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingProducts from '@/components/home/TrendingProducts'
import FlashDeals from '@/components/home/FlashDeals'
import ShellShockerDeals from '@/components/home/ShellShockerDeals'
import ComboDeals from '@/components/home/ComboDeals'
import { FeaturedSellers } from '@/components/home/FeaturedSellers'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main className="bg-[#f2f2f2]">
        {/* Hero Banner */}
        <section className="bg-[#0c3b7c] text-white">
          <div className="container mx-auto">
            <div className="relative">
              <div className="flex items-center">
                <button className="absolute left-2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="w-full">
                  <HeroCarousel />
                </div>
                
                <button className="absolute right-2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button className="w-3 h-3 rounded-full bg-white opacity-100"></button>
                <button className="w-3 h-3 rounded-full bg-white opacity-50"></button>
                <button className="w-3 h-3 rounded-full bg-white opacity-50"></button>
                <button className="w-3 h-3 rounded-full bg-white opacity-50"></button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Exact match to Newegg.com */}
        <div className="container mx-auto px-4 py-6">
          {/* Tech Deals Section - Exact match to Newegg.com */}
          <div className="bg-[#0c3b7c] text-white p-6 mb-8 rounded-sm">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Tech Deals</h2>
                <p className="mb-4">Save on the latest electronics and components</p>
                <Link 
                  href="/deals" 
                  className="inline-block px-4 py-2 bg-[#ff5722] text-white rounded-sm text-sm font-medium hover:bg-[#e04b1c] transition-colors"
                >
                  Shop Now
                </Link>
              </div>
              <div className="flex items-center">
                <button className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.2)] rounded-full mr-2 text-white">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-[rgba(255,255,255,0.2)] rounded-full text-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Products Section - Exact match to Newegg.com */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333]">Featured Products</h2>
              <Link 
                href="/featured" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Featured
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Promo Cards - Matches Newegg's trust badges */}
          <section className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-3">
              <div className="text-[#0066c0]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 10H4C3.44772 10 3 10.4477 3 11V19C3 19.5523 3.44772 20 4 20H16C16.5523 20 17 19.5523 17 19V11C17 10.4477 16.5523 10 16 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10V6C7 4.93913 7.42143 3.92172 8.17157 3.17157C8.92172 2.42143 9.93913 2 11 2C12.0609 2 13.0783 2.42143 13.8284 3.17157C14.5786 3.92172 15 4.93913 15 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">Free Shipping</h3>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
            </div>
            
            <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-3">
              <div className="text-[#0066c0]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">Secure Payments</h3>
                <p className="text-xs text-gray-600">100% protected payments</p>
              </div>
            </div>
            
            <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-3">
              <div className="text-[#0066c0]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10L11 14L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-600">Dedicated support team</p>
              </div>
            </div>
            
            <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-3">
              <div className="text-[#0066c0]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">Money-Back Guarantee</h3>
                <p className="text-xs text-gray-600">30-day return policy</p>
              </div>
            </div>
          </section>

          {/* Shell Shocker Deals - Exact match to Newegg.com */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333] flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#e31837]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Shell Shocker Deals
              </h2>
              <Link 
                href="/shell-shocker" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Shell Shocker Deals
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <ShellShockerDeals />
          </section>

          {/* Combo Deals - Exact match to Newegg.com */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333] flex items-center">
                <svg className="w-6 h-6 mr-2 text-[#0066c0]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                Combo Deals
              </h2>
              <Link 
                href="/combo-deals" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Combo Deals
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <ComboDeals />
          </section>

          {/* Today's Best Deals - Exact match to Newegg.com */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333]">Today's Best Deals</h2>
              <Link 
                href="/deals" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Deals
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <FlashDeals />
          </section>

          {/* Trending Products - Exact match to Newegg.com */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333]">Trending Products</h2>
              <Link 
                href="/trending" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Trending
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <TrendingProducts />
          </section>

          {/* Featured Sellers - Marketplace functionality */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#333333]">Featured Sellers</h2>
              <Link 
                href="/seller" 
                className="text-sm text-[#0066c0] hover:text-[#ff5722] flex items-center"
              >
                View All Sellers
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <FeaturedSellers />
          </section>

          {/* PC Builder Banner - Exact match to Newegg.com */}
          <section className="mb-8">
            <div className="bg-[#0c3b7c] text-white p-6 rounded-sm">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Your Dream PC</h3>
                  <p className="mb-4 text-sm">Use our PC Builder to create a custom computer tailored to your needs</p>
                  <Link 
                    href="/pc-builder" 
                    className="inline-block px-4 py-2 bg-[#ff5722] text-white rounded-sm text-sm font-medium hover:bg-[#e04b1c] transition-colors"
                  >
                    Start Building
                  </Link>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="w-24 h-24 bg-[#1a4b91] rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">PC</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}            