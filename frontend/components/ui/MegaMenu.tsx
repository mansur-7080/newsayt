'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface MegaMenuItem {
  id: string
  title: string
  href?: string
  description?: string
  featured?: boolean
  children?: MegaMenuItem[]
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  className?: string
}

export function MegaMenu({ items, className = '' }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <nav className={`relative ${className}`}>
      <ul className="flex items-center gap-1">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors interactive-element border-highlight ${
                activeItem === item.id
                  ? 'bg-opacity-10 bg-[#4f8eff] text-[#4f8eff]'
                  : 'hover:bg-opacity-5 hover:bg-black text-black'
              }`}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              onMouseEnter={() => item.children && setActiveItem(item.id)}
            >
              {item.title}
              {item.children && (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {activeItem === item.id && item.children && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 z-50 mt-1 w-screen max-w-screen-lg bg-opacity-5 bg-black rounded-lg shadow-sm border border-opacity-10 border-black mouse-tracking-container backdrop-blur-sm"
                  style={{ width: '800px' }}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="grid grid-cols-4 gap-6 p-6">
                    {item.children.map((child) => (
                      <div key={child.id} className={`${child.featured ? 'col-span-2 bg-opacity-5 bg-[#4f8eff] p-4 rounded-lg' : ''}`}>
                        <Link
                          href={child.href || '#'}
                          className="block font-medium text-black hover:text-[#4f8eff] mb-2 interactive-element border-highlight"
                        >
                          {child.title}
                        </Link>
                        {child.description && (
                          <p className="text-sm text-black/60 mb-4">{child.description}</p>
                        )}
                        {child.children && (
                          <ul className="space-y-2">
                            {child.children.map((subChild) => (
                              <li key={subChild.id}>
                                <Link
                                  href={subChild.href || '#'}
                                  className="flex items-center text-sm text-black/75 hover:text-[#4f8eff] interactive-element border-highlight"
                                >
                                  <ChevronRight className="w-3 h-3 mr-1" />
                                  {subChild.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  )
}
