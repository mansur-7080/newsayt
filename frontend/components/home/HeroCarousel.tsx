'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: '/images/hero/electronics-sale.jpg',
    title: 'Tech Deals',
    subtitle: 'Save on the latest electronics and components',
    cta: 'Shop Now',
    bgColor: 'from-blue-600 to-blue-800',
    link: '/deals/electronics'
  },
  {
    id: 2,
    image: '/images/hero/fashion-week.jpg',
    title: 'PC Components',
    subtitle: 'Build your dream setup with premium parts',
    cta: 'Explore Products',
    bgColor: 'from-gray-700 to-gray-900',
    link: '/category/components'
  },
  {
    id: 3,
    image: '/images/hero/home-decor.jpg',
    title: 'Office Solutions',
    subtitle: 'Professional equipment for home and business',
    cta: 'View Selection',
    bgColor: 'from-blue-700 to-blue-900',
    link: '/category/office'
  },
  {
    id: 4,
    image: '/images/hero/sports-gear.jpg',
    title: 'Gaming Essentials',
    subtitle: 'Level up your gaming experience',
    cta: 'Shop Gaming',
    bgColor: 'from-gray-800 to-gray-900',
    link: '/category/gaming'
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
    <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden dark-gradient-bg subtle-grid">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 dark-gradient-bg subtle-dots">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <motion.h1
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold mb-3 gradient-blue-indigo-text"
                  >
                    {activeSlide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl mb-6 text-white/75"
                  >
                    {activeSlide.subtitle}
                  </motion.p>
                  <motion.a
                    href={activeSlide.link}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border-highlight interactive-element"
                  >
                    {activeSlide.cta}
                  </motion.a>
                </div>
                <div className="hidden md:block">
                  {/* Placeholder for image - in real app, use actual images */}
                  <div className="w-full h-[300px] glass-card rounded-xl flex items-center justify-center border border-white/10 shadow-glow">
                    <span className="text-white/70 text-lg">Featured Products</span>
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
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/10"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/10"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-6'
                : 'bg-white/30 hover:bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}        