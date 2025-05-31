'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Check } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 md:p-8 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-white/80">
              Get the latest updates, deals and exclusive offers directly to your inbox
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full md:w-auto">
            <div className="flex">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-r-lg transition-colors flex items-center"
              >
                {submitted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center"
                  >
                    <Check className="w-5 h-5 mr-1" />
                    Subscribed!
                  </motion.span>
                ) : (
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
