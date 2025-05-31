'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../../components/ui/ProductCard'
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react'

interface Product {
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

interface SellerProductGridProps {
  products: Product[]
  categories?: string[]
  className?: string
}

export function SellerProductGrid({ products, categories = [], className = '' }: SellerProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase())
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 mr-2">Category:</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`text-xs px-3 py-1.5 rounded-md ${
                  activeCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              {categories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveCategory(category.toLowerCase())}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    activeCategory === category.toLowerCase() 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <SlidersHorizontal className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-4">
              <span className="text-sm font-medium text-gray-700 mr-2">View:</span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
        : 'space-y-4'
      }>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {sortedProducts.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">3</button>
            <span className="px-2 text-gray-600">...</span>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">10</button>
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
