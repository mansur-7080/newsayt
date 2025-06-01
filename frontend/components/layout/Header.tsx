'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, Globe, MapPin, Sparkles } from 'lucide-react'
import { NavigationBar } from '../ui/NavigationBar'

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[var(--newegg-header-bg)] text-[var(--newegg-header-text)] text-sm">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-[var(--newegg-yellow)] interactive-element">
                <MapPin className="w-4 h-4" />
                <span>Deliver to Uzbekistan</span>
              </button>
              <Link href="/track" className="hover:text-[var(--newegg-yellow)] hidden md:block interactive-element">
                Track Order
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button className="hover:text-[var(--newegg-yellow)] interactive-element">
                <Globe className="w-4 h-4 inline mr-1" />
                UZ / EN
              </button>
              <Link href="/seller" className="hover:text-[var(--newegg-yellow)] hidden md:block interactive-element">
                Sell on MegaMart
              </Link>
              <Link href="/help" className="hover:text-[var(--newegg-yellow)] interactive-element">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[var(--newegg-header-bg)] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 interactive-element">
              <div className="w-10 h-10 bg-[var(--newegg-orange)] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                MegaMart
              </span>
            </Link>

            {/* Search Bar */}
            <form className="flex-1 max-w-2xl mx-8 hidden md:flex">
              <div className="flex w-full">
                <select className="px-4 py-2 bg-white border-r border-gray-300 rounded-l-lg focus:outline-none text-[var(--newegg-text-primary)]">
                  <option>All Categories</option>
                  <option>Components &amp; Storage</option>
                  <option>Computer Systems</option>
                  <option>Electronics</option>
                  <option>Gaming &amp; VR</option>
                  <option>Networking</option>
                </select>
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="flex-1 px-4 py-2 bg-white border-t border-b border-gray-300 focus:outline-none focus:border-[var(--newegg-blue-light)] text-[var(--newegg-text-primary)] placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--newegg-blue-light)] text-white rounded-r-lg transition-all duration-300 hover:bg-blue-700 interactive-element"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="text-xs text-[var(--newegg-header-text)] mb-1">Welcome</div>
                <Link href="/account" className="text-sm font-medium text-[var(--newegg-yellow)] hover:underline">
                  Sign In / Register
                </Link>
              </div>

              <div className="hidden md:block">
                <div className="text-xs text-[var(--newegg-header-text)] mb-1">Returns</div>
                <Link href="/account/orders" className="text-sm font-medium text-[var(--newegg-yellow)] hover:underline">
                  &amp; Orders
                </Link>
              </div>

              <Link href="/cart" className="relative p-2 hover:bg-[var(--newegg-blue-medium)] rounded-lg interactive-element">
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--newegg-orange)] text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <button className="p-2 hover:bg-[var(--newegg-blue-medium)] rounded-lg md:hidden interactive-element">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form className="md:hidden pb-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--newegg-blue-light)] text-[var(--newegg-text-primary)] placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--newegg-blue-light)] text-white rounded-lg transition-all duration-300 hover:bg-blue-700 interactive-element"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-[var(--newegg-blue-dark)] border-t border-[var(--newegg-blue-medium)]">
          <div className="container mx-auto">
            <NavigationBar />
          </div>
        </div>
      </header>
    </>
  )
}                                    