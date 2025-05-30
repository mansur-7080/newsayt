'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Timer, ShoppingCart, Heart, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface DealProduct {
  id: number
  name: string
  image: string
  originalPrice: number
  discountPrice: number
  discount: number
  rating: number
  sold: number
  stock: number
  timeLeft: string
}

const dealProducts: DealProduct[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earbuds Pro',
    image: '/images/products/earbuds.jpg',
    originalPrice: 149.99,
    discountPrice: 59.99,
    discount: 60,
    rating: 4.5,
    sold: 234,
    stock: 300,
    timeLeft: '02:45:30'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    image: '/images/products/smartwatch.jpg',
    originalPrice: 299.99,
    discountPrice: 199.99,
    discount: 33,
    rating: 4.8,
    sold: 156,
    stock: 200,
    timeLeft: '03:15:45'
  },
  {
    id: 3,
    name: '4K Webcam for Streaming',
    image: '/images/products/webcam.jpg',
    originalPrice: 129.99,
    discountPrice: 79.99,
    discount: 38,
    rating: 4.3,
    sold: 89,
    stock: 150,
    timeLeft: '01:30:00'
  },
  {
    id: 4,
    name: 'Gaming Mechanical Keyboard RGB',
    image: '/images/products/keyboard.jpg',
    originalPrice: 159.99,
    discountPrice: 89.99,
    discount: 44,
    rating: 4.7,
    sold: 312,
    stock: 400,
    timeLeft: '04:00:00'
  },
  {
    id: 5,
    name: 'Portable Power Bank 20000mAh',
    image: '/images/products/powerbank.jpg',
    originalPrice: 79.99,
    discountPrice: 39.99,
    discount: 50,
    rating: 4.6,
    sold: 567,
    stock: 600,
    timeLeft: '05:20:15'
  },
  {
    id: 6,
    name: 'Wireless Gaming Mouse',
    image: '/images/products/mouse.jpg',
    originalPrice: 99.99,
    discountPrice: 49.99,
    discount: 50,
    rating: 4.4,
    sold: 189,
    stock: 250,
    timeLeft: '02:10:30'
  }
]

export default function FlashDeals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Products scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 pb-4">
          {dealProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="flex-shrink-0 w-[300px] bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image container */}
              <div className="relative h-[200px] bg-gray-100">
                {/* Discount badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md font-bold text-sm flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {product.discount}% OFF
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Product image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ShoppingCart className="w-16 h-16" />
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.sold} sold)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Stock progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Available: {product.stock - product.sold}</span>
                    <span>{Math.round((product.sold / product.stock) * 100)}% claimed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(product.sold / product.stock) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Time left */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <Timer className="w-4 h-4" />
                  <span>Ends in: </span>
                  <span className="font-mono font-bold text-red-600">{product.timeLeft}</span>
                </div>

                {/* Add to cart button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    hoveredId === product.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
} 