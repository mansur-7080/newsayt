'use client'

import React from 'react'
import Link from 'next/link'
import { Star, TrendingUp, Eye, ShoppingCart, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface TrendingProduct {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  views: number
  trending: number // trending score
  image: string
  isNew?: boolean
  isBestSeller?: boolean
}

const trendingProducts: TrendingProduct[] = [
  {
    id: 1,
    name: 'Ultra HD 4K Smart TV 55"',
    category: 'Electronics',
    price: 599.99,
    originalPrice: 899.99,
    rating: 4.8,
    reviews: 1234,
    views: 15420,
    trending: 95,
    image: '/images/products/tv.jpg',
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Professional DSLR Camera Bundle',
    category: 'Photography',
    price: 1299.99,
    rating: 4.9,
    reviews: 567,
    views: 8930,
    trending: 88,
    image: '/images/products/camera.jpg',
    isNew: true
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair Pro',
    category: 'Furniture',
    price: 349.99,
    originalPrice: 499.99,
    rating: 4.6,
    reviews: 892,
    views: 12340,
    trending: 92,
    image: '/images/products/chair.jpg'
  },
  {
    id: 4,
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Audio',
    price: 249.99,
    rating: 4.7,
    reviews: 2341,
    views: 18950,
    trending: 97,
    image: '/images/products/headphones.jpg',
    isBestSeller: true
  },
  {
    id: 5,
    name: 'Smart Home Security System',
    category: 'Smart Home',
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.5,
    reviews: 432,
    views: 7650,
    trending: 85,
    image: '/images/products/security.jpg',
    isNew: true
  },
  {
    id: 6,
    name: 'Premium Yoga Mat Set',
    category: 'Sports',
    price: 79.99,
    rating: 4.8,
    reviews: 1876,
    views: 9870,
    trending: 90,
    image: '/images/products/yoga.jpg'
  },
  {
    id: 7,
    name: 'Stainless Steel Cookware Set',
    category: 'Kitchen',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 654,
    views: 6540,
    trending: 82,
    image: '/images/products/cookware.jpg'
  },
  {
    id: 8,
    name: 'Gaming Laptop RTX 4060',
    category: 'Computers',
    price: 1599.99,
    rating: 4.9,
    reviews: 234,
    views: 11230,
    trending: 94,
    image: '/images/products/laptop.jpg',
    isBestSeller: true
  }
]

export default function TrendingProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {trendingProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/product/${product.id}`}>
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
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
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Wishlist button */}
                <button className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Product image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-20 h-20" />
                </div>

                {/* Quick add to cart */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full flex items-center justify-center gap-2 font-semibold">
                    <ShoppingCart className="w-4 h-4" />
                    Quick Add to Cart
                  </button>
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
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Trending info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{product.trending}% trending</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{(product.views / 1000).toFixed(1)}k views</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}  