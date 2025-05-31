'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Smartphone, Shirt, Home, Dumbbell, Sparkles, Car,
  Baby, Heart, Book, Pizza, Gem, Wrench
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Category {
  id: number
  name: string
  icon: React.ElementType
  count: string
  color: string
  bgColor: string
  href: string
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    icon: Smartphone,
    count: '125K+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    href: '/category/electronics'
  },
  {
    id: 2,
    name: 'Fashion',
    icon: Shirt,
    count: '98K+',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    href: '/category/fashion'
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: Home,
    count: '87K+',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    href: '/category/home-garden'
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    icon: Dumbbell,
    count: '65K+',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    href: '/category/sports'
  },
  {
    id: 5,
    name: 'Beauty & Health',
    icon: Sparkles,
    count: '54K+',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    href: '/category/beauty'
  },
  {
    id: 6,
    name: 'Automotive',
    icon: Car,
    count: '43K+',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    href: '/category/automotive'
  },
  {
    id: 7,
    name: 'Toys & Baby',
    icon: Baby,
    count: '38K+',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    href: '/category/toys'
  },
  {
    id: 8,
    name: 'Health Care',
    icon: Heart,
    count: '31K+',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    href: '/category/health'
  },
  {
    id: 9,
    name: 'Books & Media',
    icon: Book,
    count: '28K+',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    href: '/category/books'
  },
  {
    id: 10,
    name: 'Food & Beverage',
    icon: Pizza,
    count: '25K+',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    href: '/category/food'
  },
  {
    id: 11,
    name: 'Jewelry',
    icon: Gem,
    count: '22K+',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    href: '/category/jewelry'
  },
  {
    id: 12,
    name: 'Tools & Hardware',
    icon: Wrench,
    count: '19K+',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    href: '/category/tools'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function CategoryGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
    >
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <motion.div key={category.id} variants={item}>
            <Link href={category.href}>
              <motion.div
                className="dark-card p-4 text-center cursor-pointer interactive-element border-highlight transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-opacity-20 bg-indigo-900 rounded-md flex items-center justify-center mb-2 transition-colors">
                    <Icon className="w-6 h-6 text-indigo-300" />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/60">
                    {category.count} products
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}      