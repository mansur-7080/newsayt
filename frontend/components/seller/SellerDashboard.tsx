'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Settings, 
  MessageSquare, 
  CreditCard, 
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react'

const dashboardData = {
  summary: {
    sales: {
      value: 12580,
      change: 8.5,
      period: 'vs last month'
    },
    orders: {
      value: 156,
      change: 12.3,
      period: 'vs last month'
    },
    customers: {
      value: 1245,
      change: 5.7,
      period: 'vs last month'
    },
    conversion: {
      value: 3.2,
      change: 0.8,
      period: 'vs last month'
    }
  },
  recentOrders: [
    {
      id: 'ORD-5547',
      customer: 'Alisher Karimov',
      date: '2023-05-28',
      amount: 245.99,
      status: 'completed'
    },
    {
      id: 'ORD-5546',
      customer: 'Dilnoza Rakhimova',
      date: '2023-05-28',
      amount: 189.50,
      status: 'processing'
    },
    {
      id: 'ORD-5545',
      customer: 'Bobur Toshmatov',
      date: '2023-05-27',
      amount: 432.75,
      status: 'completed'
    },
    {
      id: 'ORD-5544',
      customer: 'Gulnora Azimova',
      date: '2023-05-27',
      amount: 76.25,
      status: 'completed'
    },
    {
      id: 'ORD-5543',
      customer: 'Timur Yuldashev',
      date: '2023-05-26',
      amount: 325.00,
      status: 'cancelled'
    }
  ],
  lowStock: [
    {
      id: 'PRD-1234',
      name: 'Intel Core i7-12700K',
      stock: 3,
      threshold: 5
    },
    {
      id: 'PRD-2345',
      name: 'NVIDIA GeForce RTX 3080',
      stock: 2,
      threshold: 5
    },
    {
      id: 'PRD-3456',
      name: 'Samsung 970 EVO Plus 1TB',
      stock: 4,
      threshold: 10
    }
  ]
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/seller/dashboard' },
  { icon: Package, label: 'Products', href: '/seller/products' },
  { icon: ShoppingBag, label: 'Orders', href: '/seller/orders' },
  { icon: Users, label: 'Customers', href: '/seller/customers' },
  { icon: BarChart2, label: 'Analytics', href: '/seller/analytics' },
  { icon: MessageSquare, label: 'Messages', href: '/seller/messages' },
  { icon: CreditCard, label: 'Payments', href: '/seller/payments' },
  { icon: Settings, label: 'Settings', href: '/seller/settings' }
]

export function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen sticky top-0 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Seller Portal</h2>
            <p className="text-sm text-gray-500">Manage your store</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <li key={index}>
                    <Link href={item.href}>
                      <div 
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          activeTab === item.label.toLowerCase() 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { 
                label: 'Total Sales', 
                value: `$${dashboardData.summary.sales.value.toLocaleString()}`, 
                change: dashboardData.summary.sales.change,
                icon: TrendingUp,
                color: 'text-blue-600 bg-blue-100'
              },
              { 
                label: 'Orders', 
                value: dashboardData.summary.orders.value, 
                change: dashboardData.summary.orders.change,
                icon: ShoppingBag,
                color: 'text-green-600 bg-green-100'
              },
              { 
                label: 'Customers', 
                value: dashboardData.summary.customers.value, 
                change: dashboardData.summary.customers.change,
                icon: Users,
                color: 'text-purple-600 bg-purple-100'
              },
              { 
                label: 'Conversion Rate', 
                value: `${dashboardData.summary.conversion.value}%`, 
                change: dashboardData.summary.conversion.change,
                icon: BarChart2,
                color: 'text-orange-600 bg-orange-100'
              }
            ].map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`text-sm font-medium ${card.change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      {card.change >= 0 ? '+' : ''}{card.change}%
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </motion.div>
              )
            })}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Recent Orders</h2>
                <Link href="/seller/orders" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">${order.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'processing' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Low Stock Alert */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Low Stock Alert</h2>
                <Link href="/seller/products" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="p-4">
                {dashboardData.lowStock.map((product) => (
                  <div key={product.id} className="mb-4 last:mb-0 p-3 bg-red-50 border border-red-100 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <div className="mt-1 text-xs text-gray-600">
                          <span className="font-medium text-red-600">Only {product.stock} left in stock</span>
                          <span className="mx-1">•</span>
                          <span>Threshold: {product.threshold}</span>
                        </div>
                        <div className="mt-2">
                          <button className="text-xs bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-50">
                            Restock Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <button className="w-full flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 py-2 border border-blue-200 rounded-md hover:bg-blue-50">
                    <Plus className="w-4 h-4 mr-1" />
                    Add New Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
