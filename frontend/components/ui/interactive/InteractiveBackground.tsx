'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface InteractiveBackgroundProps {
  children?: React.ReactNode
  className?: string
  particleCount?: number
  particleColor?: string
  particleSize?: number
  particleOpacity?: number
  gradientColors?: string[]
  disabled?: boolean
}

export default function InteractiveBackground({
  children,
  className = '',
  particleCount = 25,
  particleColor = 'rgba(79, 142, 255, 0.3)',
  particleSize = 4,
  particleOpacity = 0.3,
  gradientColors = ['rgba(79, 142, 255, 0.08)', 'rgba(65, 241, 182, 0.05)'],
  disabled = false
}: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    if (disabled) return
    
    const container = containerRef.current
    if (!container) return
    
    const { width, height } = container.getBoundingClientRect()
    setDimensions({ width, height })
    
    const initialParticles = Array.from({ length: particleCount }).map((_, index) => ({
      id: index,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * particleSize + 1,
      opacity: Math.random() * particleOpacity
    }))
    
    setParticles(initialParticles)
  }, [particleCount, particleSize, particleOpacity, disabled])
  
  useEffect(() => {
    if (disabled) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
      
      setParticles(prev => 
        prev.map(particle => {
          const dx = particle.x - x
          const dy = particle.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const maxDistance = 150
          const factor = Math.min(1, Math.max(0, 1 - distance / maxDistance))
          
          let newX = particle.x + dx * factor * 0.05
          let newY = particle.y + dy * factor * 0.05
          
          if (newX < 0) newX = dimensions.width
          if (newX > dimensions.width) newX = 0
          if (newY < 0) newY = dimensions.height
          if (newY > dimensions.height) newY = 0
          
          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: particle.opacity + (factor * 0.1 - 0.05)
          }
        })
      )
    }
    
    const handleResize = () => {
      if (!containerRef.current) return
      
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
    
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dimensions, disabled])
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient background */}
          <div 
            className="absolute inset-0 opacity-40 transition-opacity duration-1000 gpu-accelerated"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, transparent 100%)`,
              filter: 'blur(30px)',
            }}
          />
          
          {/* No grid pattern as per user request */}
          
          {/* Particles */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full gpu-accelerated"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particleColor,
                opacity: particle.opacity,
              }}
              animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.1, 1],
                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      )}
      
      {children}
    </div>
  )
}
