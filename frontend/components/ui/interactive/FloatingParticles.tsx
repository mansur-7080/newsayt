'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface FloatingParticlesProps {
  count?: number
  minSize?: number
  maxSize?: number
  className?: string
}

export default function FloatingParticles({
  count = 8, // Reduced count for minimalist design
  minSize = 2, // Smaller particles
  maxSize = 6, // Smaller max size
  className = ''
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

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#4f8eff]/10 to-[#41f1b6]/5 gpu-accelerated"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 4px rgba(79, 142, 255, 0.1)', // More subtle shadow
          }}
          animate={{
            y: ['0%', '-5%', '2%', '-2%', '0%'], // Reduced movement
            x: ['0%', '2%', '-2%', '4%', '0%'], // Reduced movement
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1], // Lower opacity
            scale: [1, 1.05, 0.98, 1.02, 1], // Reduced scale changes
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
