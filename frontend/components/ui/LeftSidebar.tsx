'use client'

import React from 'react'
import Link from 'next/link'
// import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Cpu, 
  Laptop, 
  HardDrive, 
  Gamepad, 
  Wifi, 
  Printer, 
  Wrench, 
  Home,
  ShoppingBag,
  ShieldCheck,
  HelpCircle,
  Gift
}from 'lucide-react'

export function LeftSidebar() {
  return (
    <div className="bg-white border border-[var(--newegg-card-border)] rounded-sm">
      {/* Categories Section */}
      <div className="border-b border-[var(--newegg-card-border)] p-3">
        <h3 className="font-bold text-sm text-[var(--newegg-text-primary)] mb-2">Categories</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/components-storage" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Cpu className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Components &amp; Storage
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/computer-systems" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Laptop className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Computer Systems
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/electronics" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <HardDrive className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Electronics
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/gaming-vr" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Gamepad className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Gaming &amp; VR
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/networking" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Wifi className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Networking
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/office-solutions" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Printer className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Office Solutions
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/automotive-tools" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Wrench className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Automotive &amp; Tools
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
          <li>
            <Link href="/home-outdoors" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Home className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Home &amp; Outdoors
              <ChevronRight className="w-3 h-3 ml-auto text-[var(--newegg-text-secondary)]" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Brands Section */}
      <div className="border-b border-[var(--newegg-card-border)] p-3">
        <h3 className="font-bold text-sm text-[var(--newegg-text-primary)] mb-2">Shop By Brand</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/brand/asus" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              ASUS
            </Link>
          </li>
          <li>
            <Link href="/brand/msi" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              MSI
            </Link>
          </li>
          <li>
            <Link href="/brand/gigabyte" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              GIGABYTE
            </Link>
          </li>
          <li>
            <Link href="/brand/intel" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              Intel
            </Link>
          </li>
          <li>
            <Link href="/brand/amd" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              AMD
            </Link>
          </li>
          <li>
            <Link href="/brand/nvidia" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              NVIDIA
            </Link>
          </li>
          <li>
            <Link href="/brand/samsung" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              Samsung
            </Link>
          </li>
          <li>
            <Link href="/brand/corsair" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              Corsair
            </Link>
          </li>
          <li>
            <Link href="/brands" className="flex items-center text-sm text-[var(--newegg-blue-light)] font-medium">
              View All Brands
              <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Customer Service Section */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-[var(--newegg-text-primary)] mb-2">Customer Service</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/help-center" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <HelpCircle className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Help Center
            </Link>
          </li>
          <li>
            <Link href="/track-order" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <ShoppingBag className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Track Order
            </Link>
          </li>
          <li>
            <Link href="/return-policy" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <ShieldCheck className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Return Policy
            </Link>
          </li>
          <li>
            <Link href="/gift-cards" className="flex items-center text-sm text-[var(--newegg-text-primary)] hover:text-[var(--newegg-blue-light)]">
              <Gift className="w-4 h-4 mr-2 text-[var(--newegg-text-secondary)]" />
              Gift Cards
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
