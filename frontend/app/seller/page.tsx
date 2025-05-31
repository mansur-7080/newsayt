import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { Store, ShoppingBag, BarChart3, Users, Shield, TrendingUp, ChevronRight } from 'lucide-react'

const featuredSellers = [
  {
    id: 1,
    name: 'TechHub Electronics',
    logo: '/images/sellers/techhub.png',
    rating: 4.8,
    products: 1245,
    category: 'Electronics',
    description: 'Premium electronics and gadgets for tech enthusiasts'
  },
  {
    id: 2,
    name: 'FreshFarm Produce',
    logo: '/images/sellers/freshfarm.png',
    rating: 4.9,
    products: 356,
    category: 'Groceries',
    description: 'Farm-fresh fruits, vegetables and organic products'
  },
  {
    id: 3,
    name: 'Crafters Workshop',
    logo: '/images/sellers/crafters.png',
    rating: 4.7,
    products: 789,
    category: 'Handmade',
    description: 'Handcrafted items made by local artisans'
  },
  {
    id: 4,
    name: 'Fashion Forward',
    logo: '/images/sellers/fashion.png',
    rating: 4.6,
    products: 2150,
    category: 'Clothing',
    description: 'Trendy clothing and accessories for all seasons'
  }
]

const sellerBenefits = [
  {
    icon: ShoppingBag,
    title: 'Expand Your Reach',
    description: 'Access millions of customers across Uzbekistan'
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Track sales, inventory, and customer behavior'
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Build relationships with tools for customer engagement'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Safe payment processing and fraud protection'
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Marketing tools to help your business thrive'
  }
]

export default function SellerMarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Grow Your Business with MegaMart
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Join thousands of sellers on Uzbekistan's largest digital marketplace platform
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/seller/register">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold text-lg"
                    >
                      Apply Now
                    </motion.button>
                  </Link>
                  <Link href="/seller/learn-more">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold text-lg"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 p-8 rounded-lg border border-white/20">
                  <Store className="w-32 h-32 mx-auto text-white mb-4" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">Start selling today</p>
                    <p className="text-blue-100">Low commission fees for new sellers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Sell on MegaMart?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our marketplace and take advantage of powerful tools designed to help your business succeed
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sellerBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Sellers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Sellers</h2>
                <p className="text-gray-600">Discover our top-rated marketplace vendors</p>
              </div>
              <Link href="/seller/browse" className="text-blue-600 hover:text-blue-800 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSellers.map((seller) => (
                <Link href={`/seller/${seller.id}`} key={seller.id}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <Store className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{seller.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{seller.category}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="font-medium">{seller.rating}</span>
                        <div className="flex ml-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2">({seller.products} products)</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{seller.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Getting started as a seller on MegaMart is simple
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Apply',
                  description: 'Complete our simple application form with your business details'
                },
                {
                  step: 2,
                  title: 'Set Up Your Store',
                  description: 'Customize your storefront and upload your products'
                },
                {
                  step: 3,
                  title: 'Start Selling',
                  description: 'Receive orders, fulfill them, and grow your business'
                }
              ].map((step) => (
                <motion.div 
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: step.step * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Join thousands of successful sellers on MegaMart and take your business to the next level
            </p>
            <Link href="/seller/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-md font-semibold text-lg"
              >
                Apply Now
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
