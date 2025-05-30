'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const brands = [
  { id: 1, name: 'Apple', logo: '/images/brands/apple.svg' },
  { id: 2, name: 'Samsung', logo: '/images/brands/samsung.svg' },
  { id: 3, name: 'Nike', logo: '/images/brands/nike.svg' },
  { id: 4, name: 'Sony', logo: '/images/brands/sony.svg' },
  { id: 5, name: 'Adidas', logo: '/images/brands/adidas.svg' },
  { id: 6, name: 'Dell', logo: '/images/brands/dell.svg' },
]

export function FeaturedBrands() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Featured Brands</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/brand/${brand.name.toLowerCase()}`}>
              <div className="h-16 border border-gray-200 rounded-lg flex items-center justify-center p-2 hover:border-orange-300 hover:shadow-sm transition-all">
                <span className="text-gray-700 font-medium text-sm">{brand.name}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
