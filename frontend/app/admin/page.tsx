'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Store, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  UserCheck
} from 'lucide-react'

const dashboardData = {
  stats: {
    totalSales: 12500000,
    totalOrders: 1250,
    totalCustomers: 850,
    totalSellers: 120,
    pendingApprovals: 15,
    recentOrders: 48
  },
  recentSellers: [
    {
      id: 1,
      name: 'Electronics Hub',
      owner: 'Aziz Karimov',
      products: 156,
      sales: 2450000,
      status: 'active',
      joined: '2023-03-15'
    },
    {
      id: 2,
      name: 'Fashion World',
      owner: 'Nilufar Rakhimova',
      products: 89,
      sales: 1850000,
      status: 'active',
      joined: '2023-04-22'
    },
    {
      id: 3,
      name: 'Home Decor',
      owner: 'Rustam Khasanov',
      products: 64,
      sales: 980000,
      status: 'pending',
      joined: '2023-05-10'
    }
  ],
  recentOrders: [
    {
      id: 'ORD-9876',
      customer: 'Dilshod Umarov',
      date: '2023-05-18',
      total: 345000,
      status: 'delivered'
    },
    {
      id: 'ORD-9875',
      customer: 'Malika Azizova',
      date: '2023-05-18',
      total: 128000,
      status: 'processing'
    },
    {
      id: 'ORD-9874',
      customer: 'Timur Rakhimov',
      date: '2023-05-17',
      total: 560000,
      status: 'pending'
    },
    {
      id: 'ORD-9873',
      customer: 'Zarina Karimova',
      date: '2023-05-17',
      total: 275000,
      status: 'delivered'
    }
  ]
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'inactive':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen">
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
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'dashboard' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('dashboard')}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'sellers' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('sellers')}
                    >
                      <Store className="w-5 h-5" />
                      <span className="font-medium">Sellers</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'customers' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('customers')}
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-medium">Customers</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'orders' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('orders')}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'payments' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('payments')}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Payments</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'notifications' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left ${
                        activeTab === 'settings' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-4/5">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(dashboardData.stats.totalSales)}
                        </h3>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">+12.5% from last month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {dashboardData.stats.totalOrders.toLocaleString()}
                        </h3>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">+8.2% from last month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Customers</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {dashboardData.stats.totalCustomers.toLocaleString()}
                        </h3>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">+5.3% from last month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Sellers</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {dashboardData.stats.totalSellers.toLocaleString()}
                        </h3>
                        <div className="flex items-center mt-2 text-green-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">+15.8% from last month</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <Store className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pending Approvals</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {dashboardData.stats.pendingApprovals.toLocaleString()}
                        </h3>
                        <div className="flex items-center mt-2 text-yellow-600">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Requires attention</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <UserCheck className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Recent Orders (24h)</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                          {dashboardData.stats.recentOrders.toLocaleString()}
                        </h3>
                        <div className="flex items-center mt-2 text-red-600">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">-2.3% from yesterday</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Recent Sellers */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Sellers</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        View All
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seller
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Products
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sales
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentSellers.map((seller) => (
                          <tr key={seller.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                                  <Store className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {seller.owner}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {seller.products}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(seller.sales)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(seller.status)}`}>
                                {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(seller.joined).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-700">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        View All
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </button>
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
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
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
                        {dashboardData.recentOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
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
                              <button className="text-blue-600 hover:text-blue-700">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'sellers' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Manage Sellers</h2>
                  <p className="text-sm text-gray-600 mt-1">View and manage all sellers on your platform</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Seller management interface will be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'customers' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Manage Customers</h2>
                  <p className="text-sm text-gray-600 mt-1">View and manage all customers on your platform</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Customer management interface will be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Manage Orders</h2>
                  <p className="text-sm text-gray-600 mt-1">View and manage all orders on your platform</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Order management interface will be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'payments' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Manage Payments</h2>
                  <p className="text-sm text-gray-600 mt-1">View and manage all payments on your platform</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Payment management interface will be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage system notifications and alerts</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Notification management interface will be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Platform Settings</h2>
                  <p className="text-sm text-gray-600 mt-1">Configure your marketplace platform</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600">Platform settings interface will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
