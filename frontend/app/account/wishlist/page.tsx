'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Search, 
  Filter, 
  Trash2, 
  ShoppingCart,
  ArrowUpRight,
  Star
} from 'lucide-react'

const wishlistData = {
  items: [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 120000,
      image: '/images/products/headphones.jpg',
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 250000,
      image: '/images/products/smartwatch.jpg',
      rating: 4.8,
      reviews: 94,
      inStock: true
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 85000,
      image: '/images/products/speaker.jpg',
      rating: 4.2,
      reviews: 76,
      inStock: false
    },
    {
      id: 4,
      name: 'Laptop Backpack',
      price: 65000,
      image: '/images/products/backpack.jpg',
      rating: 4.7,
      reviews: 52,
      inStock: true
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      price: 180000,
      image: '/images/products/keyboard.jpg',
      rating: 4.9,
      reviews: 112,
      inStock: true
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      price: 45000,
      image: '/images/products/mouse.jpg',
      rating: 4.4,
      reviews: 89,
      inStock: true
    }
  ]
}

export default function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  const filteredItems = wishlistData.items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStock = showOutOfStock ? true : item.inStock
      return matchesSearch && matchesStock
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'price-low') {
        return a.price - b.price
      } else if (sortBy === 'price-high') {
        return b.price - a.price
      } else if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          My Wishlist
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-500"
        >
          {wishlistData.items.length} items saved
        </motion.div>
      </div>
      
      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search wishlist items"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showOutOfStock"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={showOutOfStock}
              onChange={(e) => setShowOutOfStock(e.target.checked)}
            />
            <label htmlFor="showOutOfStock" className="ml-2 block text-sm text-gray-700">
              Show out of stock items
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* Wishlist Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all relative"
            >
              {!item.inStock && (
                <div className="absolute top-0 right-0 left-0 bg-gray-800 bg-opacity-70 text-white text-xs font-medium py-1 text-center">
                  Out of Stock
                </div>
              )}
              <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                <div className="text-gray-400">Product Image</div>
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 shadow-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-medium text-gray-700 ml-1">{item.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({item.reviews} reviews)</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm font-bold text-gray-900 mb-3">{formatCurrency(item.price)}</p>
                
                <div className="flex justify-between">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    View Details
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
                  <button 
                    className={`text-xs px-3 py-1.5 rounded font-medium flex items-center ${
                      item.inStock 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-400 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Browse our products and add items to your wishlist</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Explore Products
          </button>
        </div>
      )}
    </div>
  )
}
