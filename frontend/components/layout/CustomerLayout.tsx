'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut,
  ShoppingBag
} from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

interface CustomerLayoutProps {
  children: ReactNode
  activeTab?: string
}

export default function CustomerLayout({ 
  children, 
  activeTab = 'dashboard' 
}: CustomerLayoutProps) {
  const customerData = {
    name: 'Alisher Usmanov',
    email: 'alisher@example.com',
    avatar: '/images/avatars/customer1.png',
    memberSince: 'January 2023'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* User Profile Summary */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{customerData.name}</h2>
                    <p className="text-sm text-gray-600">{customerData.email}</p>
                    <p className="text-xs text-gray-500 mt-1">Member since {customerData.memberSince}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-1">
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/account"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'dashboard' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/account/orders"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'orders' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/account/wishlist"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'wishlist' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Wishlist</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/account/payment"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'payment' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Payment Methods</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href="/account/addresses"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'addresses' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Addresses</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      href="/account/notifications"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'notifications' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Notifications</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Link
                      href="/account/settings"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                        activeTab === 'settings' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Account Settings</span>
                    </Link>
                  </motion.li>
                </ul>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-red-600 hover:bg-red-50 transition-colors duration-200">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-3/4"
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
