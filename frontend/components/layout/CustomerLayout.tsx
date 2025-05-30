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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* User Profile Summary */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
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
                  <li>
                    <Link
                      href="/account"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'dashboard' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Package className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/orders"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'orders' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/wishlist"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'wishlist' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Wishlist</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/payment"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'payment' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Payment Methods</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/addresses"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'addresses' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Addresses</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/notifications"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'notifications' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Notifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/settings"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'settings' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Account Settings</span>
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-red-600 hover:bg-red-50">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
