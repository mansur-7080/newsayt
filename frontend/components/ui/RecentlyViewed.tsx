'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'

const recentlyViewedProducts = [
  {
    id: 101,
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Audio',
    price: 249.99,
    rating: 4.7,
    reviews: 2341,
    image: '/images/products/headphones.jpg',
  },
  {
    id: 102,
    name: 'Ultra HD 4K Smart TV 55"',
    category: 'Electronics',
    price: 599.99,
    originalPrice: 899.99,
    rating: 4.8,
    reviews: 1234,
    image: '/images/products/tv.jpg',
    isBestSeller: true
  },
  {
    id: 103,
    name: 'Professional DSLR Camera Bundle',
    category: 'Photography',
    price: 1299.99,
    rating: 4.9,
    reviews: 567,
    image: '/images/products/camera.jpg',
    isNew: true
  },
  {
    id: 104,
    name: 'Ergonomic Office Chair Pro',
    category: 'Furniture',
    price: 349.99,
    originalPrice: 499.99,
    rating: 4.6,
    reviews: 892,
    image: '/images/products/chair.jpg'
  }
]

export function RecentlyViewed() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recently Viewed</h3>
        <a href="/history" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {recentlyViewedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} variant="compact" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
