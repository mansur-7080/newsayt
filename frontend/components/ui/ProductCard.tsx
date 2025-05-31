'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye, TrendingUp } from 'lucide-react'
import { formatPrice, generateStarRating } from '../../lib/utils'

interface ProductCardProps {
  product: {
    id: number
    name: string
    slug?: string
    category: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    isNew?: boolean
    isBestSeller?: boolean
    isFeatured?: boolean
    isOnSale?: boolean
    stock?: number
    sold?: number
    views?: number
    trending?: number
  }
  variant?: 'default' | 'compact' | 'horizontal'
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { full: fullStars, half: halfStars, empty: emptyStars } = generateStarRating(product.rating)
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  return (
    <motion.div
      className={`group relative dark-card rounded-lg overflow-hidden border border-opacity-5 border-white hover:border-opacity-0 transition-all duration-500 interactive-element ${className}`}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 0 20px rgba(79, 142, 255, 0.15), 0 0 5px rgba(65, 241, 182, 0.1)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Link href={`/product/${product.slug || product.id}`}>
        <div className="relative">
          {/* Image container */}
          <div className="relative h-56 bg-opacity-10 bg-indigo-900 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-indigo-700 text-white px-2 py-0.5 rounded text-xs font-medium">
                  BEST SELLER
                </span>
              )}
              {discount > 0 && (
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  SAVE {discount}%
                </span>
              )}
            </div>

            {/* Quick action buttons */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
              <motion.button 
                className="w-8 h-8 bg-opacity-10 bg-black backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 10px rgba(79, 142, 255, 0.3)'
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <Heart className="w-4 h-4 text-white" />
              </motion.button>
              <motion.button 
                className="w-8 h-8 bg-opacity-10 bg-black backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 10px rgba(79, 142, 255, 0.3)'
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <Eye className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* Product image placeholder */}
            <motion.div 
              className="w-full h-full flex items-center justify-center text-white/20 group-hover:scale-105 transition-all duration-500"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="relative">
                <ShoppingCart className="w-20 h-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f8eff]/10 to-[#41f1b6]/10 blur-xl rounded-full" />
              </div>
            </motion.div>

            {/* Quick add to cart */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <motion.button 
                className="w-full bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] text-white py-1.5 px-3 rounded text-sm font-medium flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 15px rgba(79, 142, 255, 0.4)'
                }}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
            </div>
          </div>

          {/* Product info */}
          <div className="p-4">
            {/* Seller info */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-white/50 font-light">{product.category}</p>
              {product.stock && product.stock < 10 ? (
                <span className="text-xs text-red-400 font-medium">Only {product.stock} left</span>
              ) : (
                <span className="text-xs text-[#41f1b6] font-medium">In Stock</span>
              )}
            </div>

            {/* Product name */}
            <h3 className="font-medium text-white mb-2 line-clamp-2 text-sm group-hover:text-[#4f8eff] transition-all duration-300">
              {product.name}
            </h3>

            {/* Rating and reviews */}
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={`full-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(halfStars)].map((_, i) => (
                  <Star key={`half-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={`empty-${i}`} className="w-3 h-3 text-white/30" />
                ))}
              </div>
              <span className="text-xs text-white/60">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-bold bg-gradient-to-r from-[#4f8eff] to-[#41f1b6] bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-medium text-[#41f1b6]">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="flex items-center text-xs text-white/60 mb-1">
              <span className="mr-2">Free shipping</span>
              <span>Delivery: 1-3 days</span>
            </div>

            {/* Specs & Features - Newegg-style information density with minimalist design */}
            <div className="mt-2 pt-2 border-t border-white/5">
              <ul className="text-xs text-white/50 space-y-1.5">
                <li className="truncate flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#4f8eff]"></span>
                  Fast processor for smooth performance
                </li>
                <li className="truncate flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#41f1b6]"></span>
                  High-resolution display for crisp visuals
                </li>
                <li className="truncate flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gradient-to-r from-[#4f8eff] to-[#41f1b6]"></span>
                  Long battery life for all-day use
                </li>
              </ul>
            </div>

            {/* Additional info */}
            {product.trending && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1 text-xs text-[#41f1b6]">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">{product.trending}% trending</span>
                </div>
                {product.views && (
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Eye className="w-3 h-3" />
                    <span>{(product.views / 1000).toFixed(1)}k views</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
