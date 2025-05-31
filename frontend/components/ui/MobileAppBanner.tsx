'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { QrCode, Smartphone, ArrowRight } from 'lucide-react'

export function MobileAppBanner() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Download the MegaMart App
            </h3>
            <p className="text-gray-300 mb-4">
              Shop faster, track orders easily, and get personalized recommendations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
              >
                <Smartphone className="w-5 h-5" />
                App Store
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
              >
                <Smartphone className="w-5 h-5" />
                Google Play
              </motion.a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg">
              <QrCode className="w-24 h-24 text-gray-900" />
            </div>
            <div className="text-white">
              <p className="font-medium mb-1">Scan to download</p>
              <p className="text-sm text-gray-400">
                QR code works with <br /> your camera app
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
