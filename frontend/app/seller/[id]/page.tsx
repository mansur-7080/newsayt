'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Star, 
  Shield, 
  Award, 
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Filter,
  SlidersHorizontal
} from 'lucide-react'

const sellerData = {
  1: {
    id: 1,
    name: 'TechHub Electronics',
    logo: '/images/sellers/techhub.png',
    banner: '/images/sellers/techhub-banner.jpg',
    rating: 4.8,
    reviews: 1245,
    followers: 5678,
    since: '2020',
    verified: true,
    description: 'TechHub Electronics is your one-stop shop for all electronics and computer components. We offer a wide range of products from leading brands at competitive prices with excellent customer service.',
    location: 'Tashkent, Uzbekistan',
    contact: {
      phone: '+998 71 123 4567',
      email: 'info@techhub.uz',
      website: 'www.techhub.uz',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM'
    },
    categories: ['Computers', 'Laptops', 'Components', 'Peripherals', 'Networking', 'Software'],
    stats: {
      products: 1245,
      orders: 25000,
      satisfaction: 98
    }
  },
  2: {
    id: 2,
    name: 'FreshFarm Produce',
    logo: '/images/sellers/freshfarm.png',
    banner: '/images/sellers/freshfarm-banner.jpg',
    rating: 4.9,
    reviews: 876,
    followers: 3421,
    since: '2021',
    verified: true,
    description: 'FreshFarm delivers farm-fresh fruits, vegetables, and organic products directly from local farms to your doorstep. We support sustainable farming practices and local farmers.',
    location: 'Samarkand, Uzbekistan',
    contact: {
      phone: '+998 66 987 6543',
      email: 'hello@freshfarm.uz',
      website: 'www.freshfarm.uz',
      hours: 'Mon-Sun: 8:00 AM - 8:00 PM'
    },
    categories: ['Fruits', 'Vegetables', 'Organic', 'Dairy', 'Meat', 'Bakery'],
    stats: {
      products: 356,
      orders: 12000,
      satisfaction: 99
    }
  }
}

const products = [
  {
    id: 1,
    name: 'Intel Core i7-12700K Desktop Processor',
    slug: 'intel-core-i7-12700k',
    price: 349.99,
    originalPrice: 419.99,
    rating: 4.8,
    reviews: 256,
    inStock: true,
    badge: 'bestseller',
    image: '/images/products/cpu.jpg',
    category: 'Components'
  },
  {
    id: 2,
    name: 'NVIDIA GeForce RTX 3080 Graphics Card',
    slug: 'nvidia-rtx-3080',
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.9,
    reviews: 189,
    inStock: true,
    badge: 'new',
    image: '/images/products/gpu.jpg',
    category: 'Components'
  },
  {
    id: 3,
    name: 'Samsung 970 EVO Plus 1TB NVMe SSD',
    slug: 'samsung-970-evo-plus-1tb',
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviews: 320,
    inStock: true,
    image: '/images/products/ssd.jpg',
    category: 'Storage'
  },
  {
    id: 4,
    name: 'Corsair Vengeance RGB Pro 32GB DDR4 RAM',
    slug: 'corsair-vengeance-rgb-pro-32gb',
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviews: 178,
    inStock: true,
    image: '/images/products/ram.jpg',
    category: 'Components'
  },
  {
    id: 5,
    name: 'ASUS ROG Strix Z690-E Gaming Motherboard',
    slug: 'asus-rog-strix-z690e',
    price: 469.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 142,
    inStock: true,
    badge: 'bestseller',
    image: '/images/products/motherboard.jpg',
    category: 'Components'
  },
  {
    id: 6,
    name: 'Corsair RM850x 850W Power Supply',
    slug: 'corsair-rm850x',
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 210,
    inStock: true,
    image: '/images/products/psu.jpg',
    category: 'Components'
  },
  {
    id: 7,
    name: 'NZXT H510 Elite Mid-Tower Case',
    slug: 'nzxt-h510-elite',
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.5,
    reviews: 165,
    inStock: true,
    image: '/images/products/case.jpg',
    category: 'Components'
  },
  {
    id: 8,
    name: 'Logitech G Pro X Mechanical Gaming Keyboard',
    slug: 'logitech-g-pro-x-keyboard',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviews: 198,
    inStock: true,
    image: '/images/products/keyboard.jpg',
    category: 'Peripherals'
  }
]

export default function SellerStorePage() {
  const params = useParams()
  const sellerId = params.id as string
  const seller = sellerData[sellerId as keyof typeof sellerData] || sellerData[1]
  
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab.toLowerCase())
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Store Banner with Customization */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 h-48 md:h-64 relative overflow-hidden">
          {/* Customizable Banner Background */}
          {seller.banner && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70" 
              style={{ backgroundImage: `url(${seller.banner})` }}
            />
          )}
          
          {/* Banner Content */}
          <div className="container mx-auto px-4 h-full flex items-end relative z-10">
            <div className="bg-white p-4 rounded-t-lg shadow-md flex items-center space-x-4 relative -mb-6">
              {/* Seller Logo */}
              <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden border-2 border-gray-100">
                {seller.logo ? (
                  <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url(${seller.logo})` }}
                  />
                ) : (
                  <Store className="w-12 h-12 text-blue-600" />
                )}
              </div>
              
              {/* Seller Info */}
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                  {seller.verified && (
                    <div className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </div>
                  )}
                  <div className="ml-2 flex">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center"
                    >
                      Follow Store
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="flex items-center mr-3">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{seller.rating}</span>
                    <span className="ml-1">({seller.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <Award className="w-4 h-4 text-blue-500 mr-1" />
                    <span>Top Seller</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Since {seller.since}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Banner Customization Button - Only visible to store owner */}
          <button className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium flex items-center shadow-sm transition-colors z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Customize Banner
          </button>
        </div>
        
        {/* Store Info */}
        <div className="container mx-auto px-4 pt-12 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About {seller.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{seller.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{seller.location}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Phone className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{seller.contact.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Mail className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{seller.contact.email}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Globe className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{seller.contact.website}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{seller.contact.hours}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Categories</h2>
                <ul className="space-y-2">
                  {seller.categories.map((category, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => setActiveTab(category.toLowerCase())}
                        className={`text-sm w-full text-left px-3 py-2 rounded-md ${
                          activeTab === category.toLowerCase() 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Stats</h2>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-blue-600">{seller.stats.products}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-blue-600">{seller.stats.orders}+</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold text-blue-600">{seller.stats.satisfaction}%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === 'all' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All Products
                  </button>
                  
                  {seller.categories.map((category, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveTab(category.toLowerCase())}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === category.toLowerCase() 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                    <div className="ml-2 flex flex-wrap gap-2">
                      <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md flex items-center">
                        In Stock
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>
                      <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center">
                        Price Range
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>
                      <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center">
                        Rating
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                  
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
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
