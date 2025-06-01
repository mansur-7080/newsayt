'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Truck, CreditCard, Clock, ShieldCheck } from 'lucide-react'

const promos = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On orders over $50',
    icon: Truck,
    link: '/shipping-policy'
  },
  {
    id: 2,
    title: 'Secure Payments',
    description: '100% protected payments',
    icon: CreditCard,
    link: '/payment-methods'
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'Dedicated support team',
    icon: Clock,
    link: '/contact-us'
  },
  {
    id: 4,
    title: 'Money-Back Guarantee',
    description: '30-day return policy',
    icon: ShieldCheck,
    link: '/return-policy'
  }
]

export function PromoCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {promos.map((promo, index) => (
        <motion.div
          key={promo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={promo.link}>
            <div className="bg-[var(--newegg-card-bg)] border border-[var(--newegg-card-border)] rounded-sm p-4 h-full hover:border-[var(--newegg-blue-light)] transition-colors">
              <div className="flex items-center">
                <div className="text-[var(--newegg-blue-light)] mr-3">
                  <promo.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--newegg-text-primary)] text-sm">{promo.title}</h3>
                  <p className="text-xs text-[var(--newegg-text-secondary)]">{promo.description}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
