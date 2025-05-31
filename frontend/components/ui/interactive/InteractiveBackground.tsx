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
  particleCount = 6, // Further reduced particle count
  particleColor = 'rgba(79, 142, 255, 0.08)', // Even more subtle color
  particleSize = 1.5, // Smaller particles
  particleOpacity = 0.08, // Lower opacity
  gradientColors = ['rgba(79, 142, 255, 0.03)', 'rgba(65, 241, 182, 0.01)'], // Even more subtle gradient
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
          {/* Gradient background - only visible on hover */}
          <div 
            className="absolute inset-0 opacity-20 transition-opacity duration-1000 gpu-accelerated"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, transparent 100%)`,
              filter: 'blur(30px)',
            }}
          />
          
          {/* Minimal static particles */}
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
                x: [0, Math.random() * 10 - 5, 0], // Reduced movement
                y: [0, Math.random() * 10 - 5, 0], // Reduced movement
                scale: [1, 1.05, 1], // Reduced scale change
                opacity: [particle.opacity, particle.opacity * 1.2, particle.opacity] // Reduced opacity change
              }}
              transition={{
                duration: 8 + Math.random() * 4, // Slower animation
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
