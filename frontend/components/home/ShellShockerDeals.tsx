'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Timer, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ShellShockerDeals() {
  const deals = [
    {
      id: 1,
      name: 'AMD Ryzen 7 5800X 8-Core 3.8 GHz Socket AM4 105W Desktop Processor',
      image: '/images/products/cpu.jpg',
      originalPrice: 449.99,
      discountPrice: 299.99,
      discount: 33,
      rating: 4.8,
      reviews: 1245,
      timeLeft: '05:23:14',
      stock: 100,
      sold: 78,
      specs: [
        '8 Cores / 16 Threads',
        '3.8 GHz Base / 4.7 GHz Max Boost',
        'Socket AM4 / 105W TDP',
        'PCIe 4.0 Support'
      ]
    },
    {
      id: 2,
      name: 'ASUS ROG Strix GeForce RTX 3080 10GB GDDR6X Gaming Graphics Card',
      image: '/images/products/gpu.jpg',
      originalPrice: 899.99,
      discountPrice: 699.99,
      discount: 22,
      rating: 4.9,
      reviews: 876,
      timeLeft: '11:45:32',
      stock: 50,
      sold: 42,
      specs: [
        '10GB GDDR6X Memory',
        'PCIe 4.0 Interface',
        'HDMI 2.1, DisplayPort 1.4a',
        'Ray Tracing Cores'
      ]
    },
    {
      id: 3,
      name: 'Samsung 980 PRO 1TB PCIe 4.0 NVMe M.2 Internal SSD',
      image: '/images/products/ssd.jpg',
      originalPrice: 229.99,
      discountPrice: 149.99,
      discount: 35,
      rating: 4.7,
      reviews: 2341,
      timeLeft: '08:12:45',
      stock: 200,
      sold: 156,
      specs: [
        'Sequential Read: Up to 7,000 MB/s',
        'Sequential Write: Up to 5,000 MB/s',
        'PCIe Gen 4.0 x4, NVMe 1.3c',
        'Samsung Magician Software Support'
      ]
    }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-[var(--newegg-orange)]" />
          <h2 className="text-xl font-bold text-[var(--newegg-text-primary)]">Shell Shocker Deals</h2>
        </div>
        <Link 
          href="/shell-shocker" 
          className="flex items-center text-sm text-[var(--newegg-blue-light)] hover:text-[var(--newegg-orange)]"
        >
          View All Shell Shocker Deals
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <motion.div
            key={deal.id}
            whileHover={{ y: -5 }}
            className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm overflow-hidden hover:shadow-md transition-all"
          >
            {/* Header with Shell Shocker logo */}
            <div className="bg-[var(--shell-shocker-bg)] text-[var(--shell-shocker-text)] p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="font-bold text-sm">SHELL SHOCKER</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Timer className="w-3 h-3" />
                <span className="font-mono">{deal.timeLeft}</span>
              </div>
            </div>

            {/* Product image */}
            <div className="relative h-48 bg-white p-4 flex items-center justify-center">
              {/* Discount badge */}
              <div className="absolute top-2 right-2 bg-[var(--discount-badge-bg)] text-[var(--discount-badge-text)] px-2 py-1 rounded-sm text-xs font-bold">
                {deal.discount}% OFF
              </div>
              
              {/* Product image placeholder */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ShoppingCart className="w-16 h-16" />
              </div>
            </div>

            {/* Product info */}
            <div className="p-4">
              {/* Product name */}
              <h3 className="font-medium text-[var(--newegg-text-primary)] mb-2 line-clamp-2 text-sm hover:text-[var(--newegg-blue-light)]">
                {deal.name}
              </h3>

              {/* Specs */}
              <ul className="mb-3 text-xs text-[var(--newegg-text-secondary)] space-y-1">
                {deal.specs.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-[var(--newegg-text-secondary)] mt-1.5 mr-2"></span>
                    {spec}
                  </li>
                ))}
              </ul>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[var(--newegg-yellow)]">
                  {'★'.repeat(Math.floor(deal.rating))}
                  {'☆'.repeat(5 - Math.floor(deal.rating))}
                </div>
                <span className="text-xs text-[var(--newegg-text-secondary)]">({deal.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-[var(--newegg-sale-badge)]">
                  ${deal.discountPrice}
                </span>
                <span className="text-xs text-[var(--newegg-text-secondary)] line-through">
                  ${deal.originalPrice}
                </span>
                <span className="text-xs bg-[var(--newegg-sale-badge)] text-white px-1 py-0.5 rounded-sm">
                  Save ${(deal.originalPrice - deal.discountPrice).toFixed(2)}
                </span>
              </div>

              {/* Stock progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-[var(--newegg-text-secondary)] mb-1">
                  <span>{Math.round((deal.sold / deal.stock) * 100)}% Claimed</span>
                  <span>{deal.stock - deal.sold} Available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-sm h-1.5">
                  <div
                    className="bg-[var(--newegg-blue-light)] h-1.5 rounded-sm transition-all duration-300"
                    style={{ width: `${(deal.sold / deal.stock) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 bg-[var(--newegg-button-primary)] text-white rounded-sm text-sm font-medium hover:bg-[#ff5722] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 inline mr-1" />
                  Add to Cart
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-4 h-4 text-[var(--newegg-text-secondary)]" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
