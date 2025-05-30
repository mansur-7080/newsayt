'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye, Award, TrendingUp } from 'lucide-react'
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

export function ProductCard({ product, variant = 'default', className = '' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { full: fullStars, half: halfStars, empty: emptyStars } = generateStarRating(product.rating)
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0

  return (
    <motion.div
      className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <Link href={`/product/${product.slug || product.id}`}>
        <div className="relative">
          {/* Image container */}
          <div className="relative h-64 bg-gray-100 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  BEST SELLER
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button 
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Product image placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-20 h-20" />
            </div>

            {/* Quick actions */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <button 
                  className="flex items-center gap-1 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
                <button 
                  className="flex items-center gap-1 text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>

            {/* Product name */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {product.name}
            </h3>

            {/* Rating and reviews */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(halfStars)].map((_, i) => (
                  <Star key={`half-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Additional info */}
            {product.trending && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">{product.trending}% trending</span>
                </div>
                {product.views && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
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
