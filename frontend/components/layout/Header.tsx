'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, Heart, User, Globe, MapPin, Bell, Sparkles } from 'lucide-react'
import { NavigationBar } from '../ui/NavigationBar'

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-opacity-5 bg-black text-black text-sm border-b border-opacity-10 border-black">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-indigo-300 interactive-element border-highlight">
                <MapPin className="w-4 h-4" />
                <span>Deliver to Uzbekistan</span>
              </button>
              <Link href="/track" className="hover:text-indigo-300 hidden md:block interactive-element border-highlight">
                Track Order
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button className="hover:text-indigo-300 interactive-element border-highlight">
                <Globe className="w-4 h-4 inline mr-1" />
                UZ / EN
              </button>
              <Link href="/seller" className="hover:text-indigo-300 hidden md:block interactive-element border-highlight">
                Sell on MegaMart
              </Link>
              <Link href="/help" className="hover:text-indigo-300 interactive-element border-highlight">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-opacity-5 bg-black backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 interactive-element">
              <div className="w-10 h-10 bg-[#4f8eff] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">
                MegaMart
              </span>
            </Link>

            {/* Search Bar */}
            <form className="flex-1 max-w-2xl mx-8 hidden md:flex">
              <div className="flex w-full">
                <select className="px-4 py-2 bg-white border-r border-opacity-20 border-black rounded-l-lg focus:outline-none text-black">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home &amp; Garden</option>
                  <option>Sports</option>
                </select>
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="flex-1 px-4 py-2 bg-white border-t border-b border-opacity-20 border-black focus:outline-none focus:border-[#4f8eff] text-black placeholder-black placeholder-opacity-40"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4f8eff] text-white rounded-r-lg transition-all duration-300 shadow-sm hover:shadow-md border-highlight interactive-element"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-opacity-10 hover:bg-black rounded-lg hidden md:block border-highlight">
                <Bell className="w-6 h-6 text-black" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4f8eff] text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              <Link href="/wishlist" className="relative p-2 hover:bg-opacity-10 hover:bg-black rounded-lg border-highlight">
                <Heart className="w-6 h-6 text-black" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4f8eff] text-white text-xs rounded-full flex items-center justify-center">
                  7
                </span>
              </Link>

              <Link href="/account" className="p-2 hover:bg-opacity-10 hover:bg-black rounded-lg hidden md:block border-highlight">
                <User className="w-6 h-6 text-black" />
              </Link>

              <Link href="/cart" className="relative p-2 hover:bg-opacity-10 hover:bg-black rounded-lg border-highlight">
                <ShoppingCart className="w-6 h-6 text-black" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4f8eff] text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <button className="p-2 hover:bg-opacity-10 hover:bg-black rounded-lg md:hidden border-highlight">
                <Menu className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form className="md:hidden pb-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 bg-white border border-opacity-20 border-black rounded-lg focus:outline-none focus:border-[#4f8eff] text-black placeholder-black placeholder-opacity-40"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4f8eff] text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border-highlight interactive-element"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Navigation Bar */}
        <NavigationBar />
      </header>
    </>
  )
}                              