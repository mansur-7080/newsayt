'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function NeweggNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-[#0c3b7c] border-t border-[rgba(255,255,255,0.1)]">
      <div className="container mx-auto px-2">
        <div className="flex items-center h-5 overflow-x-auto">
          {/* Menu Button - Exact match to Newegg.com */}
          <div className="relative group h-full">
            <button 
              className="flex items-center text-white h-full px-1 hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-1.5 h-1.5 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-medium text-[7px]">Menu</span>
              <ChevronDown className="w-1 h-1 ml-0.5" />
            </button>
            
            <div className={`absolute left-0 top-full w-48 bg-white shadow-lg rounded-b-md overflow-hidden ${isMenuOpen ? 'block' : 'hidden'} group-hover:block z-50`}>
              <ul className="py-0.5">
                <li>
                  <Link href="/components" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Components &amp; Storage
                  </Link>
                </li>
                <li>
                  <Link href="/computers" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Computer Systems
                  </Link>
                </li>
                <li>
                  <Link href="/peripherals" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Peripherals
                  </Link>
                </li>
                <li>
                  <Link href="/networking" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Networking
                  </Link>
                </li>
                <li>
                  <Link href="/electronics" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/gaming" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Gaming &amp; VR
                  </Link>
                </li>
                <li>
                  <Link href="/software-services" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Software &amp; Services
                  </Link>
                </li>
                <li>
                  <Link href="/automotive" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Automotive &amp; Tools
                  </Link>
                </li>
                <li>
                  <Link href="/home-outdoors" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Home &amp; Outdoors
                  </Link>
                </li>
                <li>
                  <Link href="/health-sports" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Health &amp; Sports
                  </Link>
                </li>
                <li>
                  <Link href="/toys-drones" className="block px-2 py-0.5 hover:bg-gray-100 text-[#333333] text-[8px]">
                    Toys, Drones &amp; Collectibles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Navigation Links - Exact match to Newegg.com */}
          <Link href="/shell-shocker" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Shell Shocker Deals
          </Link>
          <Link href="/pc-builder" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            PC Builder
          </Link>
          <Link href="/gaming" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            <span>Gamer Community</span>
            <span className="ml-0.5 text-[5px] px-0.5 bg-[#ff5722] text-white rounded">BETA</span>
          </Link>
          <Link href="/clearance" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Clearance
          </Link>
          <Link href="/game-deals" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Game Deals
          </Link>
          <Link href="/best-sellers" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Best Sellers
          </Link>
          <Link href="/trade-in" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Trade In
          </Link>
          <Link href="/newegg-card" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Newegg Card
          </Link>
          <Link href="/combo-deals" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Combo Savings
          </Link>
          <Link href="/free-ram" className="flex items-center h-full px-1 text-white hover:bg-[rgba(255,255,255,0.1)] whitespace-nowrap text-[7px]">
            Free RAM w/ Ryzen
          </Link>
        </div>
      </div>
    </nav>
  )
}
