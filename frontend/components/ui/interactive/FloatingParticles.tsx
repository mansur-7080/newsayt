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
  count = 4, // Increased from 3 to 4 (33% increase)
  minSize = 1.2, // Increased from 1 to 1.2 (20% increase)
  maxSize = 3.6, // Increased from 3 to 3.6 (20% increase)
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
          className="absolute rounded-full bg-gradient-to-r from-[#4f8eff]/6 to-[#41f1b6]/4 gpu-accelerated" // Increased from /5 and /3
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 3px rgba(79, 142, 255, 0.06)', // Increased from 0.05 to 0.06 (20% increase)
            zIndex: 0, // Ensure it's behind content
          }}
          animate={{
            y: ['0%', '-3%', '1%', '-1%', '0%'], // Further reduced movement
            x: ['0%', '1%', '-1%', '2%', '0%'], // Further reduced movement
            opacity: [0.06, 0.096, 0.072, 0.108, 0.06], // Increased by 20% from [0.05, 0.08, 0.06, 0.09, 0.05]
            scale: [1, 1.024, 0.988, 1.012, 1], // Slightly increased scale changes
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
