'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ChevronRight, Store, Award, ShieldCheck, TrendingUp } from 'lucide-react'

const sellers = [
  {
    id: 1,
    name: 'TechWorld Uzbekistan',
    logo: '/images/sellers/techworld.png', // Placeholder
    rating: 4.8,
    reviews: 1245,
    products: 356,
    category: 'Electronics',
    featured: true,
    verified: true,
    description: 'Leading electronics retailer with the latest gadgets and tech accessories.'
  },
  {
    id: 2,
    name: 'Tashkent Fashion House',
    logo: '/images/sellers/fashion.png', // Placeholder
    rating: 4.7,
    reviews: 892,
    products: 420,
    category: 'Fashion',
    featured: true,
    verified: true,
    description: 'Premium clothing and accessories from local and international designers.'
  },
  {
    id: 3,
    name: 'Samarkand Crafts',
    logo: '/images/sellers/crafts.png', // Placeholder
    rating: 4.9,
    reviews: 567,
    products: 215,
    category: 'Handicrafts',
    featured: true,
    verified: true,
    description: 'Traditional Uzbek crafts and souvenirs made by skilled artisans.'
  },
  {
    id: 4,
    name: 'Fergana Valley Farms',
    logo: '/images/sellers/farms.png', // Placeholder
    rating: 4.6,
    reviews: 423,
    products: 180,
    category: 'Food & Agriculture',
    featured: true,
    verified: false,
    description: 'Fresh organic produce and traditional foods from the Fergana Valley.'
  }
]

export function FeaturedSellers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Sellers</h2>
            <p className="text-gray-600 mt-1">Discover top-rated sellers in our marketplace</p>
          </div>
          <Link href="/seller" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
            View All Sellers <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <motion.div
              key={seller.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <Link href={`/seller/${seller.id}`}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                      <Store className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{seller.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{seller.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({seller.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{seller.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      {seller.category}
                    </div>
                    {seller.featured && (
                      <div className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-md flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    )}
                    {seller.verified && (
                      <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{seller.products} Products</span>
                    <span className="text-blue-600 font-medium">Visit Store →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
