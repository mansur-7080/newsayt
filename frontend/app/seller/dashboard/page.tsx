'use client'

import React, { useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs'
import { 
  Store, 
  Package, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  BarChart2, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Today's Sales</h3>
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${sellerData.stats.sales.today.toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{Math.round((sellerData.stats.sales.today - sellerData.stats.sales.yesterday) / sellerData.stats.sales.yesterday * 100)}% from yesterday
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {Object.values(sellerData.stats.orders).reduce((a, b) => a + b, 0)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {sellerData.stats.orders.pending} pending
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Products</h3>
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{sellerData.stats.products.total}</p>
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {sellerData.stats.products.outOfStock} out of stock
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Customers</h3>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{sellerData.stats.customers.total}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {sellerData.stats.customers.new} new this week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sellerData.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                              {statusIcons[order.status as keyof typeof statusIcons]}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Process</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sellerData.topProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
                                ) : (
                                  <Package className="h-6 w-6 m-2 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sold} units</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.revenue.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="w-4 h-4 inline" />
                            </a>
                            <a href="#" className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4 inline" />
                            </a>
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Settings</h2>
                <p className="text-gray-600 mb-4">Customize your store appearance, shipping options, and account settings.</p>
                
                {/* Store Customization Section */}
                <div className="border border-gray-200 rounded-lg mb-6">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Store Appearance</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Store Banner */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Store Banner</label>
                        <div className="bg-gray-100 h-32 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mt-1 flex justify-center">
                              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                Upload Banner
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Recommended size: 1200 x 300 px</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Store Logo */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Store Logo</label>
                        <div className="bg-gray-100 h-32 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mt-1 flex justify-center">
                              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                Upload Logo
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Recommended size: 400 x 400 px</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Store Name */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input 
                          type="text" 
                          value="TechWorld Uzbekistan"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      {/* Store Description */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Store Description</label>
                        <textarea 
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="Your one-stop shop for all electronics and computer components. We offer a wide range of products from leading brands at competitive prices with excellent customer service."
                        />
                      </div>
                      
                      {/* Store Categories */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Store Categories</label>
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                            Electronics
                            <button className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                            Computers
                            <button className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                            Smartphones
                            <button className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                          </div>
                          <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                            + Add Category
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Shipping Settings */}
                <div className="border border-gray-200 rounded-lg mb-6">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Shipping Settings</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                          <p className="text-xs text-gray-500">Offer free shipping on orders above a certain amount</p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Minimum Order Amount for Free Shipping</label>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">$</span>
                          <input 
                            type="number" 
                            value="50"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Methods</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                              <label className="ml-2 text-sm text-gray-700">Standard Shipping (3-5 days)</label>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">$</span>
                              <input 
                                type="number" 
                                value="5.99"
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                              <label className="ml-2 text-sm text-gray-700">Express Shipping (1-2 days)</label>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-500 mr-2">$</span>
                              <input 
                                type="number" 
                                value="12.99"
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Account Settings */}
                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Account Settings</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                          type="email" 
                          value="info@techworld.uz"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                          type="tel" 
                          value="+998 71 123 4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                          type="password" 
                          value="••••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input 
                          type="password" 
                          value="••••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
