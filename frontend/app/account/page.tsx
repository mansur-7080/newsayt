'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  ShoppingBag,
  Clock,
  Truck,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react'

const customerData = {
  name: 'Alisher Usmanov',
  email: 'alisher@example.com',
  avatar: '/images/avatars/customer1.png',
  memberSince: 'January 2023',
  orders: {
    total: 24,
    pending: 2,
    delivered: 20,
    returned: 2
  },
  wishlist: 12,
  recentOrders: [
    {
      id: 'ORD-7829',
      date: '2023-05-15',
      total: 245000,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-6523',
      date: '2023-04-28',
      total: 189000,
      status: 'delivered',
      items: 2
    },
    {
      id: 'ORD-5291',
      date: '2023-04-10',
      total: 520000,
      status: 'pending',
      items: 4
    }
  ],
  recentlyViewed: [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 120000,
      image: '/images/products/headphones.jpg'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 250000,
      image: '/images/products/smartwatch.jpg'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 85000,
      image: '/images/products/speaker.jpg'
    }
  ]
}

export default function AccountPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          My Account Dashboard
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-500"
        >
          Welcome back, {customerData.name}!
        </motion.div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {customerData.orders.total}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                <span>+12% from last month</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {customerData.orders.pending}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                <span>Awaiting delivery</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {customerData.orders.delivered}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                <Truck className="w-3 h-3 inline mr-1" />
                <span>Successfully delivered</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Truck className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wishlist</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {customerData.wishlist}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                <Heart className="w-3 h-3 inline mr-1" />
                <span>Saved for later</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Orders */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData.recentOrders.map((order, index) => (
                <motion.tr 
                  key={order.id} 
                  className="hover:bg-blue-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items} {order.items === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={`/account/orders/${order.id}`} className="text-blue-600 hover:text-blue-700 flex items-center">
                      Details
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Recently Viewed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recently Viewed</h2>
            <Link href="/account/history" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerData.recentlyViewed.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Product Image</div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm font-bold text-gray-900">{formatCurrency(product.price)}</p>
                <div className="mt-3 flex justify-between">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    View Details
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
