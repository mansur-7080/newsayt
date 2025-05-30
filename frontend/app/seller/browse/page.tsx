'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { motion } from 'framer-motion'
import { 
  Store, 
  Search, 
  MapPin, 
  Star, 
  Shield, 
  ChevronDown, 
  Users,
  ShoppingBag
} from 'lucide-react'

const sellers = [
  {
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
    category: 'Electronics',
    products: 1245,
    featured: true
  },
  {
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
    category: 'Groceries',
    products: 356,
    featured: true
  },
  {
    id: 3,
    name: 'Crafters Workshop',
    logo: '/images/sellers/crafters.png',
    banner: '/images/sellers/crafters-banner.jpg',
    rating: 4.7,
    reviews: 542,
    followers: 2150,
    since: '2022',
    verified: false,
    description: 'Handcrafted items made by local artisans. From home decor to jewelry, we offer unique pieces that showcase Uzbek craftsmanship and tradition.',
    location: 'Bukhara, Uzbekistan',
    category: 'Handmade',
    products: 789,
    featured: true
  },
  {
    id: 4,
    name: 'Fashion Forward',
    logo: '/images/sellers/fashion.png',
    banner: '/images/sellers/fashion-banner.jpg',
    rating: 4.6,
    reviews: 921,
    followers: 4567,
    since: '2021',
    verified: true,
    description: 'Trendy clothing and accessories for all seasons. We curate the latest fashion trends from local and international designers at affordable prices.',
    location: 'Tashkent, Uzbekistan',
    category: 'Clothing',
    products: 2150,
    featured: false
  },
  {
    id: 5,
    name: 'Bookworm Haven',
    logo: '/images/sellers/bookworm.png',
    banner: '/images/sellers/bookworm-banner.jpg',
    rating: 4.9,
    reviews: 432,
    followers: 1890,
    since: '2023',
    verified: true,
    description: 'A paradise for book lovers. We offer a wide selection of books in multiple languages, from bestsellers to rare finds and educational materials.',
    location: 'Namangan, Uzbekistan',
    category: 'Books',
    products: 5670,
    featured: false
  },
  {
    id: 6,
    name: 'Home Essentials',
    logo: '/images/sellers/home.png',
    banner: '/images/sellers/home-banner.jpg',
    rating: 4.5,
    reviews: 678,
    followers: 2340,
    since: '2022',
    verified: true,
    description: 'Everything you need for your home, from furniture to kitchenware. Quality products that combine functionality with style.',
    location: 'Andijan, Uzbekistan',
    category: 'Home & Garden',
    products: 1876,
    featured: false
  },
  {
    id: 7,
    name: 'Fergana Valley Farms',
    logo: '/images/sellers/fergana.png',
    banner: '/images/sellers/fergana-banner.jpg',
    rating: 4.8,
    reviews: 345,
    followers: 1560,
    since: '2021',
    verified: false,
    description: 'Direct from the fertile Fergana Valley, we bring you the freshest fruits, nuts, and traditional foods. Support local farmers and enjoy premium quality.',
    location: 'Fergana, Uzbekistan',
    category: 'Food & Agriculture',
    products: 423,
    featured: true
  },
  {
    id: 8,
    name: 'Samarkand Crafts',
    logo: '/images/sellers/samarkand.png',
    banner: '/images/sellers/samarkand-banner.jpg',
    rating: 4.9,
    reviews: 567,
    followers: 2780,
    since: '2020',
    verified: true,
    description: 'Traditional Uzbek crafts and souvenirs made by skilled artisans. Our products showcase the rich cultural heritage of Samarkand.',
    location: 'Samarkand, Uzbekistan',
    category: 'Handicrafts',
    products: 912,
    featured: true
  }
]

const categories = [
  'All Categories',
  'Electronics',
  'Groceries',
  'Clothing',
  'Handmade',
  'Books',
  'Home & Garden',
  'Food & Agriculture',
  'Handicrafts'
]

const locations = [
  'All Locations',
  'Tashkent',
  'Samarkand',
  'Bukhara',
  'Namangan',
  'Andijan',
  'Fergana'
]

export default function SellerBrowsePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [sortBy, setSortBy] = useState('featured')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          seller.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All Categories' || seller.category === selectedCategory
    
    const matchesLocation = selectedLocation === 'All Locations' || 
                            seller.location.includes(selectedLocation)
    
    const matchesVerified = !verifiedOnly || seller.verified
    
    return matchesSearch && matchesCategory && matchesLocation && matchesVerified
  })
  
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'products') return b.products - a.products
    if (sortBy === 'newest') return a.since.localeCompare(b.since)
    return 0
  })
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Sellers</h1>
            <p className="text-gray-600">Discover and shop from thousands of sellers across Uzbekistan</p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search sellers by name or description..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                    <option value="products">Most Products</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly(!verifiedOnly)}
                />
                <span className="ml-2">Verified Sellers Only</span>
              </label>
              
              <div className="ml-auto text-sm text-gray-500">
                Showing {sortedSellers.length} of {sellers.length} sellers
              </div>
            </div>
          </div>
          
          {/* Sellers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSellers.map((seller) => (
              <Link href={`/seller/${seller.id}`} key={seller.id}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Banner */}
                  <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-900 relative">
                    {seller.banner && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-50" 
                        style={{ backgroundImage: `url(${seller.banner})` }}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 pt-10 relative">
                    {/* Logo */}
                    <div className="absolute -top-8 left-4 w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center border-2 border-white overflow-hidden">
                      {seller.logo ? (
                        <div 
                          className="w-full h-full bg-cover bg-center" 
                          style={{ backgroundImage: `url(${seller.logo})` }}
                        />
                      ) : (
                        <Store className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="ml-16">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-gray-900">{seller.name}</h3>
                        {seller.verified && (
                          <div className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{seller.category}</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{seller.description}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{seller.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{seller.rating}</span>
                        <span className="ml-1 text-gray-500">({seller.reviews})</span>
                      </div>
                      <div className="flex items-center">
                        <ShoppingBag className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{seller.products} products</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{seller.followers} followers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          
          {/* Empty State */}
          {sortedSellers.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sellers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All Categories')
                  setSelectedLocation('All Locations')
                  setVerifiedOnly(false)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {sortedSellers.length > 0 && (
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
