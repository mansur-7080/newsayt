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
      className={`group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 ${className}`}
      whileHover={{ y: -3 }}
    >
      <Link href={`/product/${product.slug || product.id}`}>
        <div className="relative">
          {/* Image container */}
          <div className="relative h-56 bg-gray-50 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-xs font-medium">
                  BEST SELLER
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                  SAVE {discount}%
                </span>
              )}
            </div>

            {/* Quick action buttons */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
              <button 
                className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
              <button 
                className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Product image placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
              <ShoppingCart className="w-20 h-20" />
            </div>

            {/* Quick add to cart */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm font-medium flex items-center justify-center gap-1 transition-colors opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="p-3">
            {/* Seller info */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">{product.category}</p>
              {product.stock && product.stock < 10 ? (
                <span className="text-xs text-red-600 font-medium">Only {product.stock} left</span>
              ) : (
                <span className="text-xs text-green-600 font-medium">In Stock</span>
              )}
            </div>

            {/* Product name */}
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
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
                  <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-medium text-green-600">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="flex items-center text-xs text-gray-600 mb-1">
              <span className="mr-2">Free shipping</span>
              <span>Delivery: 1-3 days</span>
            </div>

            {/* Specs & Features - Newegg-style information density */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="truncate">• Fast processor for smooth performance</li>
                <li className="truncate">• High-resolution display for crisp visuals</li>
                <li className="truncate">• Long battery life for all-day use</li>
              </ul>
            </div>

            {/* Additional info */}
            {product.trending && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">{product.trending}% trending</span>
                </div>
                {product.views && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
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
