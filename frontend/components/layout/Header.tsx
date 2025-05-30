'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, Heart, User, Globe, ChevronDown, Truck, MapPin, Bell, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-orange-400">
                <MapPin className="w-4 h-4" />
                <span>Deliver to Uzbekistan</span>
              </button>
              <Link href="/track" className="hover:text-orange-400 hidden md:block">
                Track Order
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button className="hover:text-orange-400">
                <Globe className="w-4 h-4 inline mr-1" />
                UZ / EN
              </button>
              <Link href="/seller" className="hover:text-orange-400 hidden md:block">
                Sell on MegaMart
              </Link>
              <Link href="/help" className="hover:text-orange-400">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                MegaMart
              </span>
            </Link>

            {/* Search Bar */}
            <form className="flex-1 max-w-2xl mx-8 hidden md:flex">
              <div className="flex w-full">
                <select className="px-4 py-2 bg-gray-100 border-r border-gray-300 rounded-l-lg focus:outline-none">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                  <option>Sports</option>
                </select>
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg hidden md:block">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  7
                </span>
              </Link>

              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg hidden md:block">
                <User className="w-6 h-6" />
              </Link>

              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <button className="p-2 hover:bg-gray-100 rounded-lg md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form className="md:hidden pb-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </header>
    </>
  )
} 