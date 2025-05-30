'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Store, 
  CreditCard, 
  Settings, 
  Bell, 
  Search
} from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

interface AdminLayoutProps {
  children: ReactNode
  activeTab?: string
}

export default function AdminLayout({ 
  children, 
  activeTab = 'dashboard' 
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100">Manage your marketplace platform</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-blue-700 text-white placeholder-blue-300 border border-blue-500 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-300" />
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50">
                Help
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/5">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Main Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/admin"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'dashboard' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/sellers"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'sellers' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Store className="w-5 h-5" />
                      <span className="font-medium">Sellers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/customers"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'customers' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-medium">Customers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/orders"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'orders' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/payments"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'payments' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Payments</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/notifications"
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
                      href="/admin/settings"
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md ${
                        activeTab === 'settings' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-4/5">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
