'use client'

import React, { useState, useRef } from 'react'
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
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-opacity-20 bg-indigo-900 backdrop-blur-sm shadow-glow rounded-full flex items-center justify-center hover:bg-opacity-30 text-white interactive-element border-highlight"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-opacity-20 bg-indigo-900 backdrop-blur-sm shadow-glow rounded-full flex items-center justify-center hover:bg-opacity-30 text-white interactive-element border-highlight"
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
              className="flex-shrink-0 w-[300px] dark-card border border-opacity-10 border-white rounded-lg overflow-hidden hover:shadow-glow transition-all interactive-element border-highlight"
            >
              {/* Image container */}
              <div className="relative h-[200px] bg-opacity-10 bg-indigo-900">
                {/* Discount badge */}
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-sm text-xs font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {product.discount}% OFF
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-2 right-2 w-7 h-7 bg-opacity-20 bg-indigo-900 backdrop-blur-sm rounded-sm flex items-center justify-center hover:bg-opacity-30 border border-opacity-10 border-white interactive-element border-highlight">
                  <Heart className="w-4 h-4 text-indigo-300" />
                </button>

                {/* Product image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-indigo-300/50">
                  <ShoppingCart className="w-16 h-16" />
                </div>
              </div>

              {/* Product info */}
              <div className="p-3">
                <h3 className="font-medium text-white mb-1 text-sm line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium ml-1 text-white">{product.rating}</span>
                  </div>
                  <span className="text-xs text-white/60">({product.sold} sold)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-indigo-300">
                    ${product.discountPrice}
                  </span>
                  <span className="text-xs text-white/50 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Stock progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Available: {product.stock - product.sold}</span>
                    <span>{Math.round((product.sold / product.stock) * 100)}% claimed</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-sm h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-sm transition-all duration-300"
                      style={{ width: `${(product.sold / product.stock) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Time left */}
                <div className="flex items-center gap-1 text-xs text-white/70 mb-2">
                  <Timer className="w-3 h-3" />
                  <span>Ends in: </span>
                  <span className="font-mono font-medium text-indigo-300">{product.timeLeft}</span>
                </div>

                {/* Add to cart button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-1.5 rounded-sm text-sm font-medium transition-colors interactive-element ${
                    hoveredId === product.id
                      ? 'bg-[var(--primary-blue)] text-white'
                      : 'bg-[var(--hover-blue)] text-white hover:bg-[var(--selection-bg)] border border-[var(--border-highlight)]'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3 inline mr-1" />
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