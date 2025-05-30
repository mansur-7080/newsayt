'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Award, Zap } from 'lucide-react'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
  rating: number
  products: number
  isVerified: boolean
  isPremium: boolean
  discount?: string
  specialOffer?: string
}

const brands: Brand[] = [
  {
    id: 1,
    name: 'Apple',
    logo: '/images/brands/apple.svg',
    description: 'Premium Electronics & Technology',
    rating: 4.9,
    products: 1250,
    isVerified: true,
    isPremium: true,
    specialOffer: 'Free AirPods with MacBook'
  },
  {
    id: 2,
    name: 'Samsung',
    logo: '/images/brands/samsung.svg',
    description: 'Innovation for Everyone',
    rating: 4.7,
    products: 2340,
    isVerified: true,
    isPremium: true,
    discount: 'Up to 40% OFF'
  },
  {
    id: 3,
    name: 'Nike',
    logo: '/images/brands/nike.svg',
    description: 'Just Do It - Sports & Lifestyle',
    rating: 4.8,
    products: 890,
    isVerified: true,
    isPremium: false,
    specialOffer: 'Buy 2 Get 1 Free'
  },
  {
    id: 4,
    name: 'Sony',
    logo: '/images/brands/sony.svg',
    description: 'Entertainment & Gaming',
    rating: 4.6,
    products: 670,
    isVerified: true,
    isPremium: true,
    discount: 'Save $200 on PS5'
  },
  {
    id: 5,
    name: 'Adidas',
    logo: '/images/brands/adidas.svg',
    description: 'Impossible is Nothing',
    rating: 4.5,
    products: 780,
    isVerified: true,
    isPremium: false,
    specialOffer: 'Extra 20% Student Discount'
  },
  {
    id: 6,
    name: 'Dell',
    logo: '/images/brands/dell.svg',
    description: 'Technology Solutions',
    rating: 4.4,
    products: 450,
    isVerified: true,
    isPremium: false,
    discount: 'Business Deals Available'
  },
  {
    id: 7,
    name: 'LG',
    logo: '/images/brands/lg.svg',
    description: "Life's Good - Home Appliances",
    rating: 4.3,
    products: 560,
    isVerified: true,
    isPremium: false,
    specialOffer: 'Free Installation'
  },
  {
    id: 8,
    name: 'Microsoft',
    logo: '/images/brands/microsoft.svg',
    description: 'Empowering Everyone',
    rating: 4.7,
    products: 980,
    isVerified: true,
    isPremium: true,
    discount: 'Surface Pro Bundle Deals'
  }
]

export default function BrandShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brand, index) => (
        <motion.div
          key={brand.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/brand/${brand.name.toLowerCase()}`}>
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
            >
              {/* Brand logo */}
              <div className="h-16 mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-lg">{brand.name}</span>
                </div>
              </div>

              {/* Brand name and badges */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg text-white">{brand.name}</h3>
                {brand.isVerified && (
                  <span title="Verified Brand">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </span>
                )}
                {brand.isPremium && (
                  <span title="Premium Partner">
                    <Award className="w-4 h-4 text-yellow-400" />
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 mb-3 line-clamp-2">
                {brand.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white">{brand.rating}</span>
                </div>
                <span className="text-white/70">{brand.products} products</span>
              </div>

              {/* Special offer or discount */}
              {(brand.specialOffer || brand.discount) && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-md p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-300 text-sm font-semibold">
                    <Zap className="w-3 h-3" />
                    {brand.specialOffer || brand.discount}
                  </div>
                </div>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-lg transition-all duration-300" />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
} 