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
  count = 25,
  minSize = 8,
  maxSize = 30,
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
      duration: Math.random() * 10 + 10, // 10-20 seconds
      delay: Math.random() * 5 // 0-5 seconds delay
    }))
    
    setParticles(newParticles)
  }, [count, minSize, maxSize])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#4f8eff]/20 to-[#41f1b6]/15 gpu-accelerated"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 8px rgba(79, 142, 255, 0.2)',
          }}
          animate={{
            y: ['0%', '-10%', '5%', '-5%', '0%'],
            x: ['0%', '5%', '-5%', '10%', '0%'],
            opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
            scale: [1, 1.1, 0.95, 1.05, 1],
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
