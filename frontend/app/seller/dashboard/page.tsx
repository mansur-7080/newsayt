'use client'

import React, { useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'
import { 
  Package, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  BarChart2, 
  DollarSign, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Lock,
  Shield,
  User,
  Upload,
  Image,
  X,
  Save
} from 'lucide-react'

const sellerData = {
  name: 'TechWorld Uzbekistan',
  logo: '/images/sellers/techworld.png',
  storeUrl: '/seller/1',
  stats: {
    sales: {
      today: 1250,
      yesterday: 980,
      thisWeek: 8750,
      thisMonth: 32500
    },
    orders: {
      pending: 12,
      processing: 8,
      shipped: 15,
      delivered: 120,
      cancelled: 3
    },
    products: {
      total: 356,
      outOfStock: 15,
      lowStock: 28
    },
    customers: {
      total: 1850,
      new: 45
    }
  },
  recentOrders: [
    {
      id: 'ORD-12345',
      customer: 'Alisher Karimov',
      date: '2025-05-30',
      amount: 349.99,
      status: 'pending',
      items: 2
    },
    {
      id: 'ORD-12344',
      customer: 'Nodira Malikova',
      date: '2025-05-29',
      amount: 1299.99,
      status: 'processing',
      items: 1
    },
    {
      id: 'ORD-12343',
      customer: 'Rustam Tashmatov',
      date: '2025-05-29',
      amount: 129.99,
      status: 'shipped',
      items: 3
    },
    {
      id: 'ORD-12342',
      customer: 'Dilshod Rakhimov',
      date: '2025-05-28',
      amount: 499.99,
      status: 'delivered',
      items: 2
    },
    {
      id: 'ORD-12341',
      customer: 'Gulnora Azizova',
      date: '2025-05-28',
      amount: 79.99,
      status: 'delivered',
      items: 1
    }
  ],
  topProducts: [
    {
      id: 1,
      name: 'Samsung Galaxy S23 Ultra',
      price: 1199.99,
      sold: 42,
      revenue: 50399.58,
      image: '/images/products/galaxy-s23.jpg'
    },
    {
      id: 2,
      name: 'MacBook Pro 16" M2 Pro',
      price: 2499.99,
      sold: 18,
      revenue: 44999.82,
      image: '/images/products/macbook-pro.jpg'
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5 Headphones',
      price: 349.99,
      sold: 35,
      revenue: 12249.65,
      image: '/images/products/sony-headphones.jpg'
    },
    {
      id: 4,
      name: 'Apple AirPods Pro 2',
      price: 249.99,
      sold: 47,
      revenue: 11749.53,
      image: '/images/products/airpods-pro.jpg'
    }
  ]
}

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  
  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    processing: <TrendingUp className="w-4 h-4" />,
    shipped: <Package className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
    cancelled: <AlertCircle className="w-4 h-4" />
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your store, products, and orders</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <a 
                href={sellerData.storeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Store
              </a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
          
          {/* Dashboard Navigation */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 border-b border-gray-200">
                <TabsTrigger value="overview" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="customers" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <Users className="w-4 h-4 mr-2" />
                  Customers
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Dashboard Content */}
            <TabsContent value="overview" className="mt-0">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Today's Sales Card */}
                <div className="group bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:scale-[1.02] overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-600 opacity-5 blur-xl"></div>
                  <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-blue-400 opacity-5 blur-xl"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative">
                    <h3 className="text-blue-800 text-sm font-medium uppercase tracking-wider">Today's Sales</h3>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">${sellerData.stats.sales.today.toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center mt-2 font-medium bg-green-50 px-2 py-1 rounded-full shadow-sm inline-flex">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{Math.round((sellerData.stats.sales.today - sellerData.stats.sales.yesterday) / sellerData.stats.sales.yesterday * 100)}% from yesterday
                      </p>
                    </div>
                    <div className="h-16 w-24 bg-gradient-to-t from-blue-100 to-transparent rounded-md flex items-end overflow-hidden group-hover:opacity-80 transition-opacity">
                      <div className="flex items-end h-full w-full px-1">
                        <div className="bg-blue-500 bg-opacity-20 w-2 h-8 rounded-t-sm mx-0.5 group-hover:h-10 transition-all duration-500"></div>
                        <div className="bg-blue-500 bg-opacity-30 w-2 h-6 rounded-t-sm mx-0.5 group-hover:h-8 transition-all duration-700"></div>
                        <div className="bg-blue-500 bg-opacity-40 w-2 h-10 rounded-t-sm mx-0.5 group-hover:h-12 transition-all duration-300"></div>
                        <div className="bg-blue-500 bg-opacity-50 w-2 h-7 rounded-t-sm mx-0.5 group-hover:h-9 transition-all duration-600"></div>
                        <div className="bg-blue-500 bg-opacity-60 w-2 h-9 rounded-t-sm mx-0.5 group-hover:h-11 transition-all duration-400"></div>
                        <div className="bg-blue-500 bg-opacity-70 w-2 h-12 rounded-t-sm mx-0.5 group-hover:h-14 transition-all duration-500"></div>
                        <div className="bg-blue-600 w-2 h-16 rounded-t-sm mx-0.5 group-hover:h-16 transition-all duration-300 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Orders Card */}
                <div className="group bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-xl shadow-md border border-purple-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-300 hover:scale-[1.02] overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-purple-600 opacity-5 blur-xl"></div>
                  <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-purple-400 opacity-5 blur-xl"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative">
                    <h3 className="text-purple-800 text-sm font-medium uppercase tracking-wider">Orders</h3>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                        {Object.values(sellerData.stats.orders).reduce((a, b) => a + b, 0)}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 shadow-sm border border-yellow-200">
                          {sellerData.stats.orders.pending} pending
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm border border-blue-200">
                          {sellerData.stats.orders.processing} processing
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center h-16 w-16">
                      <div className="relative w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center shadow-inner group-hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-300 animate-spin" style={{ animationDuration: '3s' }}></div>
                        <span className="text-xs font-bold text-purple-800">{Math.round(sellerData.stats.orders.delivered / Object.values(sellerData.stats.orders).reduce((a, b) => a + b, 0) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products Card */}
                <div className="group bg-gradient-to-br from-white via-green-50 to-green-100 rounded-xl shadow-md border border-green-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-green-300 hover:scale-[1.02] overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-green-600 opacity-5 blur-xl"></div>
                  <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-green-400 opacity-5 blur-xl"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative">
                    <h3 className="text-green-800 text-sm font-medium uppercase tracking-wider">Products</h3>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 group-hover:text-green-900 transition-colors">{sellerData.stats.products.total}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 shadow-sm border border-red-200">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {sellerData.stats.products.outOfStock} out of stock
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 shadow-sm border border-yellow-200">
                          {sellerData.stats.products.lowStock} low stock
                        </span>
                      </div>
                    </div>
                    <div className="h-16 w-16 flex items-center justify-center">
                      <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 rounded-full border-8 border-gray-100 shadow-inner"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500 transition-all duration-1000" 
                          style={{ 
                            transform: `rotate(${Math.round((sellerData.stats.products.total - sellerData.stats.products.outOfStock) / sellerData.stats.products.total * 360)}deg)` 
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-800">{Math.round((sellerData.stats.products.total - sellerData.stats.products.outOfStock) / sellerData.stats.products.total * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customers Card */}
                <div className="group bg-gradient-to-br from-white via-indigo-50 to-indigo-100 rounded-xl shadow-md border border-indigo-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 hover:scale-[1.02] overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-indigo-600 opacity-5 blur-xl"></div>
                  <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-indigo-400 opacity-5 blur-xl"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative">
                    <h3 className="text-indigo-800 text-sm font-medium uppercase tracking-wider">Customers</h3>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative">
                    <div>
                      <p className="text-3xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors">{sellerData.stats.customers.total}</p>
                      <p className="text-sm text-green-600 flex items-center mt-2 font-medium bg-green-50 px-2 py-1 rounded-full shadow-sm inline-flex">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {sellerData.stats.customers.new} new this week
                      </p>
                    </div>
                    <div className="h-16 w-16 flex items-center justify-center">
                      <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                        <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E0E0E0"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="3"
                            strokeDasharray={`${sellerData.stats.customers.new / sellerData.stats.customers.total * 100}, 100`}
                            className="transition-all duration-1000"
                          />
                          <text x="18" y="20.5" textAnchor="middle" className="text-xs font-bold fill-indigo-800">
                            {Math.round(sellerData.stats.customers.new / sellerData.stats.customers.total * 100)}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-white p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md mr-4">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                      <p className="text-sm text-gray-600 mt-1">Track and manage your latest customer orders</p>
                    </div>
                  </div>
                  <a href="#" className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-white">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-blue-800 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sellerData.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{order.id}</span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                                {order.customer.split(' ').map(name => name[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                <p className="text-xs text-gray-500">Customer since 2023</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm text-gray-700 font-medium">{order.date}</div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-gray-400" />
                              3 days ago
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">${order.amount.toFixed(2)}</div>
                            <div className="text-xs text-gray-500 mt-1">USD • Paid</div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${statusColors[order.status as keyof typeof statusColors]}`}>
                              {statusIcons[order.status as keyof typeof statusIcons]}
                              <span className="ml-1.5 capitalize">{order.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-blue-100 text-blue-800 h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium shadow-sm">
                                {order.items}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">items</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm hover:shadow-md">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors shadow-sm hover:shadow-md">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-indigo-100 via-indigo-50 to-white p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md mr-4">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
                      <p className="text-sm text-gray-600 mt-1">Your best performing products by sales volume</p>
                    </div>
                  </div>
                  <a href="#" className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-white">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Sold</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-indigo-800 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sellerData.topProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-indigo-50 transition-colors">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-14 w-14 bg-gradient-to-br from-indigo-50 to-white rounded-lg overflow-hidden shadow-sm border border-indigo-200 group-hover:border-indigo-300 transition-colors">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="h-14 w-14 object-cover" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <Package className="h-7 w-7 text-indigo-400" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 hover:text-indigo-700 transition-colors">{product.name}</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center">
                                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium mr-2">
                                    PROD-{product.id.toString().padStart(5, '0')}
                                  </span>
                                  <span className="text-gray-400">Added 2 months ago</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</div>
                            <div className="text-xs text-green-600 mt-1 flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                              {Math.round(product.price * 0.2)} loyalty points
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                                <div 
                                  className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded-full transition-all duration-500" 
                                  style={{ width: `${Math.min(100, (product.sold / 50) * 100)}%` }}
                                ></div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">{product.sold} units</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {product.sold > 30 ? 'High demand' : product.sold > 15 ? 'Medium demand' : 'Low demand'}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">${product.revenue.toFixed(2)}</div>
                            <div className="flex items-center text-xs mt-1">
                              <div className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                                {Math.round((product.revenue / sellerData.stats.sales.thisMonth) * 100)}% of monthly
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm hover:shadow-md">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm hover:shadow-md">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shadow-sm hover:shadow-md">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Product Management</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Product
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">Manage your product catalog, update inventory, and set pricing.</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    This section is under development. Check back soon for full product management functionality.
                  </p>
                </div>
                
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Product Management Hub</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Add, edit, and manage your products. Track inventory, set pricing, and organize your catalog.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Management</h2>
                <p className="text-gray-600 mb-4">Track, process, and manage all your customer orders.</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    This section is under development. Check back soon for full order management functionality.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="customers" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Management</h2>
                <p className="text-gray-600 mb-4">View and manage your customer database.</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    This section is under development. Check back soon for full customer management functionality.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Management</h2>
                <p className="text-gray-600 mb-4">Track revenue, manage payment methods, and view transaction history.</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    This section is under development. Check back soon for full payment management functionality.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <span className="bg-blue-600 w-1 h-8 rounded-full mr-3 inline-block"></span>
                      Store Settings
                    </h2>
                    <p className="text-gray-600 mt-2 ml-4">Customize your store appearance, shipping options, and account settings.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center shadow-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Store
                    </button>
                  </div>
                </div>
                
                {/* Store Customization Section */}
                <div className="border border-blue-100 rounded-xl mb-8 overflow-hidden shadow-md">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 backdrop-blur-sm">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Store Appearance</h3>
                    </div>
                    <span className="text-xs font-medium text-white bg-white bg-opacity-20 px-3 py-1.5 rounded-full backdrop-blur-sm">Basic Settings</span>
                  </div>
                  
                  <div className="p-8 bg-gradient-to-b from-blue-50/30 to-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Store Banner */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center">
                          <span className="bg-blue-600 w-1 h-4 rounded-full mr-2 inline-block"></span>
                          Store Banner
                        </label>
                        <div className="bg-white h-48 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden group relative shadow-inner">
                          <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                          <div className="text-center">
                            <div className="flex justify-center mb-3">
                              <div className="p-3 bg-blue-100 rounded-full">
                                <Upload className="h-8 w-8 text-blue-600" />
                              </div>
                            </div>
                            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                              Upload Banner
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                              Recommended size: 1200 x 300 px (Max 2MB)
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Store Logo */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center">
                          <span className="bg-blue-600 w-1 h-4 rounded-full mr-2 inline-block"></span>
                          Store Logo
                        </label>
                        <div className="bg-white h-48 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden group relative shadow-inner">
                          <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                          <div className="text-center">
                            <div className="flex justify-center mb-3">
                              <div className="p-3 bg-blue-100 rounded-full">
                                <Image className="h-8 w-8 text-blue-600" />
                              </div>
                            </div>
                            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                              Upload Logo
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                              Recommended size: 400 x 400 px (Max 1MB)
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Store Name */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center">
                          <span className="bg-blue-600 w-1 h-4 rounded-full mr-2 inline-block"></span>
                          Store Name
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value="TechWorld Uzbekistan"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12 shadow-sm"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <div className="p-1.5 bg-blue-100 rounded-md">
                              <ShoppingBag className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 ml-2">This name will be displayed to customers on your store page</p>
                      </div>
                      
                      {/* Store Description */}
                      <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center">
                          <span className="bg-blue-600 w-1 h-4 rounded-full mr-2 inline-block"></span>
                          Store Description
                        </label>
                        <div className="relative">
                          <textarea 
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12 shadow-sm"
                            defaultValue="Your one-stop shop for all electronics and computer components. We offer a wide range of products from leading brands at competitive prices with excellent customer service."
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <div className="p-1.5 bg-blue-100 rounded-md">
                              <BarChart2 className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 ml-2">Briefly describe your store and what you offer (max 250 characters)</p>
                      </div>
                      
                      {/* Store Categories */}
                      <div className="space-y-4 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center">
                          <span className="bg-blue-600 w-1 h-4 rounded-full mr-2 inline-block"></span>
                          Store Categories
                        </label>
                        <div className="p-5 bg-white rounded-lg border border-blue-100 shadow-sm">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm hover:bg-blue-100 transition-colors">
                              Electronics
                              <button className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none bg-white rounded-full p-1">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm hover:bg-blue-100 transition-colors">
                              Computers
                              <button className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none bg-white rounded-full p-1">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm hover:bg-blue-100 transition-colors">
                              Smartphones
                              <button className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none bg-white rounded-full p-1">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="relative flex-grow">
                              <input 
                                type="text" 
                                placeholder="Add a category..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                              />
                            </div>
                            <button className="bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                              Add
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-3 ml-2">Select up to 5 categories that best describe your store</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Shipping Settings */}
                <div className="border border-green-100 rounded-xl mb-8 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-green-50 to-white px-6 py-4 border-b border-green-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 bg-opacity-10 flex items-center justify-center mr-3">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Shipping Settings</h3>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Delivery Options</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                        <div>
                          <h4 className="text-base font-semibold text-gray-900">Free Shipping</h4>
                          <p className="text-sm text-gray-600 mt-1">Offer free shipping on orders above a certain amount</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pl-6 space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Minimum Order Amount for Free Shipping</label>
                        <div className="flex items-center">
                          <div className="relative flex-grow max-w-xs">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input 
                              type="number" 
                              value="50"
                              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div className="ml-4 text-sm text-gray-600">
                            Customers who spend at least this amount will get free shipping
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">Shipping Methods</h4>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-green-200 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input type="checkbox" className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded" checked />
                                <div className="ml-3">
                                  <label className="text-base font-medium text-gray-900">Standard Shipping (3-5 days)</label>
                                  <p className="text-sm text-gray-500 mt-1">Regular delivery option for most orders</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">$</span>
                                  </div>
                                  <input 
                                    type="number" 
                                    value="5.99"
                                    className="w-24 pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-green-200 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input type="checkbox" className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded" checked />
                                <div className="ml-3">
                                  <label className="text-base font-medium text-gray-900">Express Shipping (1-2 days)</label>
                                  <p className="text-sm text-gray-500 mt-1">Faster delivery for urgent orders</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">$</span>
                                  </div>
                                  <input 
                                    type="number" 
                                    value="12.99"
                                    className="w-24 pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Shipping Method
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Account Settings */}
                <div className="border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-purple-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-600 bg-opacity-10 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                    </div>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Security &amp; Privacy</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            value="info@techworld.uz"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pl-10"
                          />
                          <div className="absolute left-3 top-3.5 text-gray-400">
                            <Mail className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">We'll use this email for order notifications and account updates</p>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            value="+998 71 123 4567"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pl-10"
                          />
                          <div className="absolute left-3 top-3.5 text-gray-400">
                            <Phone className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">For delivery coordination and security verification</p>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            value="••••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pl-10"
                          />
                          <div className="absolute left-3 top-3.5 text-gray-400">
                            <Lock className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Use a strong password with at least 8 characters</p>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            value="••••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pl-10"
                          />
                          <div className="absolute left-3 top-3.5 text-gray-400">
                            <Shield className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Re-enter your password to confirm</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm font-medium">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
