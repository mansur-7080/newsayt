'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react'
import { NeweggNavBar } from '../ui/NeweggNavBar'

export default function Header() {
  return (
    <>
      <header className="bg-[#0c3b7c] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-7">
            {/* Logo - Exact Newegg style */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#ff5722] rounded-full flex items-center justify-center mr-0.5">
                  <span className="text-white font-bold text-[6px]">n</span>
                </div>
                <span className="text-white font-bold text-[10px]">newegg</span>
              </div>
            </Link>

            {/* Search Bar - Exact Newegg style */}
            <form className="flex-1 max-w-xl mx-2 hidden md:flex">
              <div className="flex w-full">
                <div className="relative">
                  <select className="appearance-none h-5 px-1 py-0 bg-white border-r border-gray-300 rounded-l-sm focus:outline-none text-[#333] text-[8px] w-12">
                    <option>All</option>
                    <option>Components</option>
                    <option>Computers</option>
                    <option>Electronics</option>
                    <option>Gaming</option>
                    <option>Networking</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0.5 text-gray-700">
                    <ChevronDown className="w-1.5 h-1.5" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 h-5 px-1 py-0 bg-white border-0 focus:outline-none text-[#333] text-[8px]"
                />
                <button
                  type="submit"
                  className="h-5 px-1 bg-[#0066c0] text-white hover:bg-[#004b8d] rounded-r-sm flex items-center justify-center"
                >
                  <Search className="w-2 h-2" />
                </button>
              </div>
            </form>

            {/* Right Actions - Exact Newegg style */}
            <div className="flex items-center gap-1">
              {/* User Account */}
              <Link href="/account" className="hidden md:flex items-center text-white hover:text-[#f7a01e]">
                <div className="flex flex-col">
                  <span className="text-[6px] leading-tight">Welcome</span>
                  <span className="text-[8px] font-medium">Sign In / Register</span>
                </div>
              </Link>

              {/* Returns & Orders */}
              <Link href="/account/orders" className="hidden md:flex items-center text-white hover:text-[#f7a01e] ml-1">
                <div className="flex flex-col">
                  <span className="text-[6px] leading-tight">Returns</span>
                  <span className="text-[8px] font-medium">&amp; Orders</span>
                </div>
              </Link>

              {/* Country/Language Selector - US Flag */}
              <div className="hidden md:flex items-center ml-1">
                <button className="flex items-center justify-center w-3 h-3 rounded-full overflow-hidden border border-white/30">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="#FFFFFF"/>
                    <rect y="0" width="24" height="1.85" fill="#B22234"/>
                    <rect y="3.69" width="24" height="1.85" fill="#B22234"/>
                    <rect y="7.38" width="24" height="1.85" fill="#B22234"/>
                    <rect y="11.08" width="24" height="1.85" fill="#B22234"/>
                    <rect y="14.77" width="24" height="1.85" fill="#B22234"/>
                    <rect y="18.46" width="24" height="1.85" fill="#B22234"/>
                    <rect y="22.15" width="24" height="1.85" fill="#B22234"/>
                    <rect width="12" height="12.92" fill="#3C3B6E"/>
                    <circle cx="1.5" cy="1.5" r="0.5" fill="white"/>
                    <circle cx="4.5" cy="1.5" r="0.5" fill="white"/>
                    <circle cx="7.5" cy="1.5" r="0.5" fill="white"/>
                    <circle cx="10.5" cy="1.5" r="0.5" fill="white"/>
                    <circle cx="3" cy="3" r="0.5" fill="white"/>
                    <circle cx="6" cy="3" r="0.5" fill="white"/>
                    <circle cx="9" cy="3" r="0.5" fill="white"/>
                    <circle cx="1.5" cy="4.5" r="0.5" fill="white"/>
                    <circle cx="4.5" cy="4.5" r="0.5" fill="white"/>
                    <circle cx="7.5" cy="4.5" r="0.5" fill="white"/>
                    <circle cx="10.5" cy="4.5" r="0.5" fill="white"/>
                    <circle cx="3" cy="6" r="0.5" fill="white"/>
                    <circle cx="6" cy="6" r="0.5" fill="white"/>
                    <circle cx="9" cy="6" r="0.5" fill="white"/>
                    <circle cx="1.5" cy="7.5" r="0.5" fill="white"/>
                    <circle cx="4.5" cy="7.5" r="0.5" fill="white"/>
                    <circle cx="7.5" cy="7.5" r="0.5" fill="white"/>
                    <circle cx="10.5" cy="7.5" r="0.5" fill="white"/>
                    <circle cx="3" cy="9" r="0.5" fill="white"/>
                    <circle cx="6" cy="9" r="0.5" fill="white"/>
                    <circle cx="9" cy="9" r="0.5" fill="white"/>
                    <circle cx="1.5" cy="10.5" r="0.5" fill="white"/>
                    <circle cx="4.5" cy="10.5" r="0.5" fill="white"/>
                    <circle cx="7.5" cy="10.5" r="0.5" fill="white"/>
                    <circle cx="10.5" cy="10.5" r="0.5" fill="white"/>
                  </svg>
                </button>
              </div>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative p-0.5 text-white hover:text-[#f7a01e] ml-1">
                <ShoppingCart className="w-2.5 h-2.5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#f7a01e] text-white text-[5px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button className="p-0.5 text-white hover:text-[#f7a01e] md:hidden">
                <Menu className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form className="md:hidden pb-1">
            <div className="flex">
              <div className="relative">
                <select className="appearance-none h-4 px-1 py-0 bg-white border-r border-gray-300 rounded-l-sm focus:outline-none text-[#333] text-[8px] w-10">
                  <option>All</option>
                  <option>Components</option>
                  <option>Computers</option>
                  <option>Electronics</option>
                  <option>Gaming</option>
                  <option>Networking</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0.5 text-gray-700">
                  <ChevronDown className="w-1 h-1" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 h-4 px-1 py-0 bg-white border-0 focus:outline-none text-[#333] text-[8px]"
              />
              <button
                type="submit"
                className="h-4 px-1 bg-[#0066c0] text-white rounded-r-sm flex items-center justify-center"
              >
                <Search className="w-1.5 h-1.5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Navigation Bar - Using the new Newegg-style navigation */}
        <NeweggNavBar />
      </header>
    </>
  )
}                                                                                                