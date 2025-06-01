'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ComboDeals() {
  const combos = [
    {
      id: 1,
      title: "Gaming PC Combo",
      products: [
        {
          id: 101,
          name: "Intel Core i7-12700K Desktop Processor",
          price: 389.99
        },
        {
          id: 102,
          name: "ASUS ROG Strix Z690-E Gaming WiFi 6E Motherboard",
          price: 469.99
        },
        {
          id: 103,
          name: "G.SKILL Trident Z5 RGB 32GB DDR5 6000 Memory",
          price: 249.99
        }
      ],
      comboPrice: 999.99,
      savings: 109.98
    },
    {
      id: 2,
      title: "Streaming Setup Combo",
      products: [
        {
          id: 201,
          name: "Logitech StreamCam 1080p Webcam",
          price: 169.99
        },
        {
          id: 202,
          name: "Blue Yeti USB Microphone",
          price: 129.99
        },
        {
          id: 203,
          name: "Elgato Stream Deck MK.2",
          price: 149.99
        }
      ],
      comboPrice: 399.99,
      savings: 49.98
    }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--combo-savings-bg)] text-[var(--combo-savings-text)] rounded-full flex items-center justify-center font-bold">C</div>
          <h2 className="text-xl font-bold text-[var(--newegg-text-primary)]">Combo Deals</h2>
        </div>
        <Link 
          href="/combo-deals" 
          className="flex items-center text-sm text-[var(--newegg-blue-light)] hover:text-[var(--newegg-orange)]"
        >
          View All Combo Deals
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combos.map((combo) => (
          <motion.div
            key={combo.id}
            whileHover={{ y: -5 }}
            className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm overflow-hidden hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="bg-[var(--combo-savings-bg)] text-[var(--combo-savings-text)] p-2">
              <div className="font-bold text-sm">{combo.title} - Save ${combo.savings.toFixed(2)}</div>
            </div>

            {/* Products */}
            <div className="p-4">
              {combo.products.map((product, index) => (
                <div key={product.id} className="mb-3">
                  <div className="flex items-start">
                    {/* Product image placeholder */}
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)] line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="text-sm font-medium text-[var(--newegg-text-primary)] mt-1">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {index < combo.products.length - 1 && (
                    <div className="flex items-center justify-center my-2">
                      <Plus className="w-4 h-4 text-[var(--newegg-text-secondary)]" />
                    </div>
                  )}
                </div>
              ))}

              {/* Combo price */}
              <div className="border-t border-[var(--newegg-card-border)] pt-3 mt-3">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-sm text-[var(--newegg-text-secondary)]">Combo Price:</div>
                    <div className="text-xl font-bold text-[var(--newegg-sale-badge)]">
                      ${combo.comboPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-[var(--newegg-sale-badge)] text-white px-2 py-1 rounded-sm text-sm">
                    Save ${combo.savings.toFixed(2)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 bg-[var(--newegg-button-primary)] text-white rounded-sm text-sm font-medium hover:bg-[#ff5722] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-1" />
                    Add All to Cart
                  </button>
                  <button
                    className="px-3 py-2 border border-[var(--newegg-blue-light)] text-[var(--newegg-blue-light)] rounded-sm text-sm font-medium hover:bg-[var(--newegg-blue-light)] hover:text-white transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
