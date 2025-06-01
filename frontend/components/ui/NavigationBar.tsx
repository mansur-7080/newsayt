'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight, Store, ShoppingBag, Gift } from 'lucide-react'

const categories = [
  {
    id: 'components',
    title: 'Components & Storage',
    href: '/category/components',
    children: [
      {
        id: 'cpu',
        title: 'CPUs / Processors',
        href: '/category/components/cpu',
        featured: true,
        description: 'Latest processors from Intel, AMD and more',
        children: [
          { id: 'intel', title: 'Intel Processors', href: '/category/components/cpu/intel' },
          { id: 'amd', title: 'AMD Processors', href: '/category/components/cpu/amd' },
          { id: 'server', title: 'Server Processors', href: '/category/components/cpu/server' },
          { id: 'accessories', title: 'CPU Accessories', href: '/category/components/cpu/accessories' },
        ]
      },
      {
        id: 'motherboards',
        title: 'Motherboards',
        href: '/category/components/motherboards',
        children: [
          { id: 'intel', title: 'Intel Motherboards', href: '/category/components/motherboards/intel' },
          { id: 'amd', title: 'AMD Motherboards', href: '/category/components/motherboards/amd' },
          { id: 'server', title: 'Server Motherboards', href: '/category/components/motherboards/server' },
        ]
      },
      {
        id: 'memory',
        title: 'Memory',
        href: '/category/components/memory',
        children: [
          { id: 'desktop', title: 'Desktop Memory', href: '/category/components/memory/desktop' },
          { id: 'laptop', title: 'Laptop Memory', href: '/category/components/memory/laptop' },
          { id: 'server', title: 'Server Memory', href: '/category/components/memory/server' },
        ]
      },
      {
        id: 'storage',
        title: 'Storage',
        href: '/category/components/storage',
        children: [
          { id: 'ssd', title: 'SSDs', href: '/category/components/storage/ssd' },
          { id: 'hdd', title: 'Hard Drives', href: '/category/components/storage/hdd' },
          { id: 'nas', title: 'NAS / RAID Storage', href: '/category/components/storage/nas' },
          { id: 'usb', title: 'USB Flash Drives', href: '/category/components/storage/usb' },
        ]
      },
      {
        id: 'video-cards',
        title: 'Video Cards & GPUs',
        href: '/category/components/video-cards',
        children: [
          { id: 'nvidia', title: 'NVIDIA Graphics Cards', href: '/category/components/video-cards/nvidia' },
          { id: 'amd', title: 'AMD Graphics Cards', href: '/category/components/video-cards/amd' },
          { id: 'workstation', title: 'Workstation Graphics', href: '/category/components/video-cards/workstation' },
        ]
      },
    ]
  },
  {
    id: 'computer-systems',
    title: 'Computer Systems',
    href: '/category/computer-systems',
    children: [
      {
        id: 'desktops',
        title: 'Desktop Computers',
        href: '/category/computer-systems/desktops',
        children: [
          { id: 'gaming', title: 'Gaming Desktops', href: '/category/computer-systems/desktops/gaming' },
          { id: 'business', title: 'Business Desktops', href: '/category/computer-systems/desktops/business' },
          { id: 'all-in-one', title: 'All-in-One Computers', href: '/category/computer-systems/desktops/all-in-one' },
        ]
      },
      {
        id: 'laptops',
        title: 'Laptops / Notebooks',
        href: '/category/computer-systems/laptops',
        featured: true,
        description: 'Gaming laptops, ultrabooks, 2-in-1s and more',
        children: [
          { id: 'gaming', title: 'Gaming Laptops', href: '/category/computer-systems/laptops/gaming' },
          { id: 'business', title: 'Business Laptops', href: '/category/computer-systems/laptops/business' },
          { id: '2-in-1', title: '2-in-1 Laptops', href: '/category/computer-systems/laptops/2-in-1' },
          { id: 'chromebooks', title: 'Chromebooks', href: '/category/computer-systems/laptops/chromebooks' },
        ]
      },
    ]
  },
  {
    id: 'peripherals',
    title: 'Peripherals',
    href: '/category/peripherals',
    children: [
      {
        id: 'monitors',
        title: 'Monitors',
        href: '/category/peripherals/monitors',
        children: [
          { id: 'gaming', title: 'Gaming Monitors', href: '/category/peripherals/monitors/gaming' },
          { id: 'business', title: 'Business Monitors', href: '/category/peripherals/monitors/business' },
          { id: 'ultrawide', title: 'Ultrawide Monitors', href: '/category/peripherals/monitors/ultrawide' },
        ]
      },
      {
        id: 'keyboards',
        title: 'Keyboards',
        href: '/category/peripherals/keyboards',
        children: [
          { id: 'mechanical', title: 'Mechanical Keyboards', href: '/category/peripherals/keyboards/mechanical' },
          { id: 'wireless', title: 'Wireless Keyboards', href: '/category/peripherals/keyboards/wireless' },
        ]
      },
    ]
  },
  {
    id: 'networking',
    title: 'Networking',
    href: '/category/networking',
  },
  {
    id: 'electronics',
    title: 'Electronics',
    href: '/category/electronics',
  },
  {
    id: 'gaming',
    title: 'Gaming & VR',
    href: '/category/gaming',
  },
]

const pages = [
  { id: 'today-deals', title: "Today's Best Deals", href: '/deals' },
  { id: 'shell-shocker', title: 'Shell Shocker Deals', href: '/shell-shocker' },
  { id: 'combo-deals', title: 'Combo Deals', href: '/combo-deals' },
  { id: 'pc-builder', title: 'PC Builder', href: '/pc-builder' },
  { id: 'marketplace', title: 'Marketplace', href: '/seller', icon: Store },
  { id: 'become-seller', title: 'Become a Seller', href: '/seller/register', icon: ShoppingBag },
  { id: 'gift-cards', title: 'Gift Cards', href: '/gift-cards', icon: Gift },
]

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-[var(--newegg-blue-dark)]">
      <div className="container mx-auto">
        <div className="flex items-center h-10">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center h-full">
            {/* Categories dropdown */}
            <div className="relative group h-full">
              <button className="flex items-center h-full px-4 text-white text-sm font-medium hover:bg-[#1a4b91] transition-colors">
                <span>All</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block z-50 bg-white shadow-lg w-64">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      href={category.href}
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.title}
                      {category.children && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main navigation items */}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="h-full flex items-center px-3 text-white text-sm font-medium hover:bg-[#1a4b91] transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>

          {/* Right side links */}
          <div className="ml-auto flex items-center h-full">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className="h-full flex items-center px-3 text-white text-sm font-medium hover:bg-[#1a4b91] transition-colors"
              >
                {page.title}
              </Link>
            ))}
            
            {/* Become a Seller button - orange button on far right */}
            <Link
              href="/seller/register"
              className="h-full flex items-center px-3 bg-[var(--newegg-orange)] text-white text-sm font-medium hover:bg-[#ff6a00] transition-colors"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 bg-[var(--newegg-blue-dark)] shadow-inner">
              {categories.map((category) => (
                <MobileMenuItem key={category.id} item={category} />
              ))}
              
              <div className="pt-2 mt-2 border-t border-[rgba(255,255,255,0.1)]">
                {pages.map((page) => (
                  <Link
                    key={page.id}
                    href={page.href}
                    className="block py-2 text-sm font-medium text-white hover:text-[var(--newegg-yellow)] transition-colors flex items-center"
                  >
                    {page.icon && <page.icon className="w-4 h-4 mr-2" />}
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function MobileMenuItem({ item }: { item: typeof categories[0] }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <Link
          href={item.href || '#'}
          className="text-sm font-medium text-white hover:text-[var(--newegg-yellow)] transition-colors"
        >
          {item.title}
        </Link>
        {item.children && (
          <button
            className="p-1 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      {isOpen && item.children && (
        <div className="pl-4 pb-2">
          {item.children.map((child) => (
            <div key={child.id} className="py-1">
              <Link
                href={child.href || '#'}
                className="text-xs font-medium text-white/75 hover:text-[var(--newegg-yellow)] transition-colors"
              >
                {child.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
