'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface FloatingParticlesProps {
  count?: number
  minSize?: number
  maxSize?: number
  className?: string
  backgroundOnly?: boolean // New prop to control where effects appear
}

export default function FloatingParticles({
  count = 3, // Further reduced count for minimalist design
  minSize = 1, // Smaller particles
  maxSize = 3, // Smaller max size
  className = '',
  backgroundOnly = true // Default to background-only effects
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: string
    y: string
    size: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 15 + 15, // 15-30 seconds (slower)
      delay: Math.random() * 5 // 0-5 seconds delay
    }))
    
    setParticles(newParticles)
  }, [count, minSize, maxSize])

  const [isOverUIElement, setIsOverUIElement] = useState(false)
  
  useEffect(() => {
    if (backgroundOnly) {
      const handleMouseMove = (e: MouseEvent) => {
        const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
        const isOverInteractive = elementUnderMouse?.closest('.interactive-element, a, button, input, select, textarea')
        setIsOverUIElement(!!isOverInteractive)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
    
    return () => {}; // Return empty cleanup function when backgroundOnly is false
  }, [backgroundOnly])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {(!backgroundOnly || !isOverUIElement) && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#4f8eff]/5 to-[#41f1b6]/3 gpu-accelerated"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 2px rgba(79, 142, 255, 0.05)', // Even more subtle shadow
            zIndex: 0, // Ensure it's behind content
          }}
          animate={{
            y: ['0%', '-3%', '1%', '-1%', '0%'], // Further reduced movement
            x: ['0%', '1%', '-1%', '2%', '0%'], // Further reduced movement
            opacity: [0.05, 0.08, 0.06, 0.09, 0.05], // Even lower opacity
            scale: [1, 1.02, 0.99, 1.01, 1], // Further reduced scale changes
          }}
          transition={{
            duration: particle.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
