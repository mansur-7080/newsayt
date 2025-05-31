'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MouseTrackerProps {
  children?: React.ReactNode
  className?: string
  lineColor?: string
  lineWidth?: number
  lineCount?: number
  lineOpacity?: number
  disabled?: boolean
  backgroundOnly?: boolean // New prop to control where effects appear
}

export default function MouseTracker({
  children,
  className = '',
  lineColor = 'rgba(79, 142, 255, 0.3)', // Reduced opacity
  lineWidth = 1.5, // Thinner lines
  lineCount = 6, // Fewer lines
  lineOpacity = 0.4, // Lower opacity
  disabled = false,
  backgroundOnly = true // Default to background-only effects
}: MouseTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isOverUIElement, setIsOverUIElement] = useState(false)
  const [lines, setLines] = useState<Array<{ id: number; x1: number; y1: number; x2: number; y2: number; opacity: number }>>([])
  
  useEffect(() => {
    if (disabled) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
      
      if (backgroundOnly) {
        const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
        const isOverInteractive = elementUnderMouse?.closest('.interactive-element, a, button, input, select, textarea')
        setIsOverUIElement(!!isOverInteractive)
      }
      
      if (isHovering && (!backgroundOnly || !isOverUIElement)) {
        const newLines = [...lines]
        
        if (newLines.length < lineCount) {
          newLines.push({
            id: Date.now(),
            x1: x,
            y1: y,
            x2: x + Math.random() * 60 - 30, // Reduced movement range
            y2: y + Math.random() * 60 - 30, // Reduced movement range
            opacity: lineOpacity
          })
        } else {
          newLines.shift()
          newLines.push({
            id: Date.now(),
            x1: x,
            y1: y,
            x2: x + Math.random() * 60 - 30, // Reduced movement range
            y2: y + Math.random() * 60 - 30, // Reduced movement range
            opacity: lineOpacity
          })
        }
        
        newLines.forEach((line, index) => {
          if (index < newLines.length - 1) {
            line.opacity = line.opacity * 0.85 // Faster fade out
          }
        })
        
        setLines(newLines)
      }
    }
    
    const handleMouseEnter = () => {
      setIsHovering(true)
      setLines([])
    }
    
    const handleMouseLeave = () => {
      setIsHovering(false)
      setLines([])
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isHovering, lines, lineCount, lineOpacity, disabled])
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      
      {!disabled && (
        <svg
          className="absolute inset-0 pointer-events-none z-0" // Lower z-index to ensure it's behind content
          style={{ width: '100%', height: '100%' }}
        >
          <AnimatePresence>
            {isHovering && (!backgroundOnly || !isOverUIElement) && lines.map((line) => (
              <motion.line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={lineColor}
                strokeWidth={lineWidth}
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: line.opacity, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} // Faster animation
              />
            ))}
          </AnimatePresence>
        </svg>
      )}
    </div>
  )
}
