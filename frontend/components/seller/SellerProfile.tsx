'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Star, 
  Shield, 
  Users,
  MessageSquare
} from 'lucide-react'

interface SellerProfileProps {
  seller: {
    id: number | string
    name: string
    logo?: string
    banner?: string
    rating: number
    reviews: number
    followers: number
    since: string
    verified: boolean
    description: string
    location: string
    contact: {
      phone: string
      email: string
      website: string
      hours: string
    }
    categories: string[]
    stats: {
      products: number
      orders: number
      satisfaction: number
    }
  }
}

export function SellerProfile({ seller }: SellerProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Banner and Logo */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 h-32 relative">
        {seller.banner && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50" 
            style={{ backgroundImage: `url(${seller.banner})` }}
          />
        )}
        <div className="absolute -bottom-12 left-6 w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border-4 border-white">
          {seller.logo ? (
            <div 
              className="w-full h-full bg-cover bg-center rounded-md" 
              style={{ backgroundImage: `url(${seller.logo})` }}
            />
          ) : (
            <Store className="w-12 h-12 text-blue-600" />
          )}
        </div>
      </div>
      
      {/* Seller Info */}
      <div className="pt-16 px-6 pb-6">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">{seller.name}</h2>
              {seller.verified && (
                <div className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </div>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <div className="flex items-center mr-3">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{seller.rating}</span>
                <span className="ml-1">({seller.reviews} reviews)</span>
              </div>
              <div className="flex items-center mr-3">
                <Users className="w-4 h-4 mr-1" />
                <span>{seller.followers} followers</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Since {seller.since}</span>
              </div>
            </div>
          </div>
          
          <div className="flex mt-2 sm:mt-0 space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center"
            >
              <Users className="w-4 h-4 mr-1" />
              Follow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium flex items-center"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Contact
            </motion.button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{seller.description}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-blue-600">{seller.stats.products}</div>
            <div className="text-xs text-gray-500">Products</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-blue-600">{seller.stats.orders}+</div>
            <div className="text-xs text-gray-500">Orders</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-blue-600">{seller.stats.satisfaction}%</div>
            <div className="text-xs text-gray-500">Satisfaction</div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Location</div>
                <div className="text-sm text-gray-600">{seller.location}</div>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Phone</div>
                <div className="text-sm text-gray-600">{seller.contact.phone}</div>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Email</div>
                <div className="text-sm text-gray-600">{seller.contact.email}</div>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Website</div>
                <div className="text-sm text-gray-600">{seller.contact.website}</div>
              </div>
            </div>
            <div className="flex items-start md:col-span-2">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Business Hours</div>
                <div className="text-sm text-gray-600">{seller.contact.hours}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {seller.categories.map((category, index) => (
              <Link key={index} href={`/category/${category.toLowerCase()}`}>
                <div className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm">
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
