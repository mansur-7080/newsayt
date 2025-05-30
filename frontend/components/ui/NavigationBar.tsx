'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { MegaMenu } from './MegaMenu'

const categories = [
  {
    id: 'electronics',
    title: 'Electronics',
    href: '/category/electronics',
    children: [
      {
        id: 'smartphones',
        title: 'Smartphones & Accessories',
        href: '/category/electronics/smartphones',
        featured: true,
        description: 'Latest smartphones, cases, and accessories',
        children: [
          { id: 'apple', title: 'Apple', href: '/category/electronics/smartphones/apple' },
          { id: 'samsung', title: 'Samsung', href: '/category/electronics/smartphones/samsung' },
          { id: 'xiaomi', title: 'Xiaomi', href: '/category/electronics/smartphones/xiaomi' },
          { id: 'cases', title: 'Cases & Covers', href: '/category/electronics/smartphones/cases' },
          { id: 'chargers', title: 'Chargers & Cables', href: '/category/electronics/smartphones/chargers' },
        ]
      },
      {
        id: 'computers',
        title: 'Computers & Tablets',
        href: '/category/electronics/computers',
        children: [
          { id: 'laptops', title: 'Laptops', href: '/category/electronics/computers/laptops' },
          { id: 'desktops', title: 'Desktop PCs', href: '/category/electronics/computers/desktops' },
          { id: 'tablets', title: 'Tablets', href: '/category/electronics/computers/tablets' },
          { id: 'monitors', title: 'Monitors', href: '/category/electronics/computers/monitors' },
        ]
      },
      {
        id: 'tv-audio',
        title: 'TV & Audio',
        href: '/category/electronics/tv-audio',
        children: [
          { id: 'tvs', title: 'Televisions', href: '/category/electronics/tv-audio/tvs' },
          { id: 'speakers', title: 'Speakers', href: '/category/electronics/tv-audio/speakers' },
          { id: 'headphones', title: 'Headphones', href: '/category/electronics/tv-audio/headphones' },
        ]
      },
      {
        id: 'wearables',
        title: 'Wearable Technology',
        href: '/category/electronics/wearables',
        children: [
          { id: 'smartwatches', title: 'Smartwatches', href: '/category/electronics/wearables/smartwatches' },
          { id: 'fitness', title: 'Fitness Trackers', href: '/category/electronics/wearables/fitness' },
        ]
      },
    ]
  },
  {
    id: 'fashion',
    title: 'Fashion',
    href: '/category/fashion',
    children: [
      {
        id: 'mens',
        title: "Men's Fashion",
        href: '/category/fashion/mens',
        children: [
          { id: 'shirts', title: 'Shirts', href: '/category/fashion/mens/shirts' },
          { id: 'pants', title: 'Pants', href: '/category/fashion/mens/pants' },
          { id: 'shoes', title: 'Shoes', href: '/category/fashion/mens/shoes' },
        ]
      },
      {
        id: 'womens',
        title: "Women's Fashion",
        href: '/category/fashion/womens',
        featured: true,
        description: 'Latest trends in women\'s clothing and accessories',
        children: [
          { id: 'dresses', title: 'Dresses', href: '/category/fashion/womens/dresses' },
          { id: 'tops', title: 'Tops', href: '/category/fashion/womens/tops' },
          { id: 'shoes', title: 'Shoes', href: '/category/fashion/womens/shoes' },
          { id: 'bags', title: 'Bags', href: '/category/fashion/womens/bags' },
        ]
      },
    ]
  },
  {
    id: 'home',
    title: 'Home & Garden',
    href: '/category/home',
  },
  {
    id: 'sports',
    title: 'Sports & Fitness',
    href: '/category/sports',
  },
  {
    id: 'beauty',
    title: 'Beauty & Health',
    href: '/category/beauty',
  },
]

const pages = [
  { id: 'deals', title: 'Deals', href: '/deals' },
  { id: 'new', title: 'New Arrivals', href: '/new-arrivals' },
  { id: 'bestsellers', title: 'Bestsellers', href: '/bestsellers' },
]

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <MegaMenu items={categories} />
            
            <div className="flex items-center space-x-6">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={page.href}
                  className="text-sm font-medium text-gray-700 hover:text-orange-600"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/gift-cards"
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-orange-600"
            >
              Gift Cards
            </Link>
            <Link
              href="/become-seller"
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-orange-600"
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
            <div className="px-4 py-3 space-y-1 bg-gray-50">
              {categories.map((category) => (
                <MobileMenuItem key={category.id} item={category} />
              ))}
              
              <div className="pt-2 mt-2 border-t border-gray-200">
                {pages.map((page) => (
                  <Link
                    key={page.id}
                    href={page.href}
                    className="block py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
              
              <div className="pt-2 mt-2 border-t border-gray-200">
                <Link
                  href="/gift-cards"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                >
                  Gift Cards
                </Link>
                <Link
                  href="/become-seller"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-orange-600"
                >
                  Become a Seller
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenuItem({ item }: { item: typeof categories[0] }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <Link
          href={item.href || '#'}
          className="text-base font-medium text-gray-700 hover:text-orange-600"
        >
          {item.title}
        </Link>
        {item.children && (
          <button
            className="p-1 rounded-md hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
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
                className="text-sm font-medium text-gray-600 hover:text-orange-600"
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
