'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: '/images/hero/electronics-sale.jpg',
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 70% OFF on Latest Gadgets',
    cta: 'Shop Now',
    bgColor: 'from-blue-600 to-purple-700',
    link: '/deals/electronics'
  },
  {
    id: 2,
    image: '/images/hero/fashion-week.jpg',
    title: 'Fashion Week Special',
    subtitle: 'New Arrivals with 50% Discount',
    cta: 'Explore Collection',
    bgColor: 'from-pink-500 to-rose-600',
    link: '/deals/fashion'
  },
  {
    id: 3,
    image: '/images/hero/home-decor.jpg',
    title: 'Transform Your Home',
    subtitle: 'Premium Furniture at Wholesale Prices',
    cta: 'Discover More',
    bgColor: 'from-emerald-600 to-teal-700',
    link: '/deals/home'
  },
  {
    id: 4,
    image: '/images/hero/sports-gear.jpg',
    title: 'Sports & Fitness',
    subtitle: 'Professional Equipment for Less',
    cta: 'Get Fit Now',
    bgColor: 'from-orange-500 to-red-600',
    link: '/deals/sports'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const activeSlide = slides[currentSlide]
  if (!activeSlide) return null

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${activeSlide.bgColor}`}>
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                  >
                    {activeSlide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl mb-8 opacity-90"
                  >
                    {activeSlide.subtitle}
                  </motion.p>
                  <motion.a
                    href={activeSlide.link}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {activeSlide.cta}
                  </motion.a>
                </div>
                <div className="hidden md:block">
                  {/* Placeholder for image - in real app, use actual images */}
                  <div className="w-full h-[400px] bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white/60 text-xl">Product Image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}  