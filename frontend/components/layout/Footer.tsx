'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  Mail, Phone, MapPin, Shield, CreditCard, Truck,
  HeadphonesIcon, ChevronRight, Apple, Play
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-gray-400">Get special offers and exclusive deals</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 rounded-l-lg w-full md:w-80 focus:outline-none focus:bg-gray-600"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">MegaMart</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted global marketplace for quality products at unbeatable prices. 
              Shop with confidence from millions of sellers worldwide.
            </p>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {/* Mobile Apps */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Download Our App</p>
              <div className="flex gap-2">
                <button className="bg-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <Play className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Careers</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Press Center</Link></li>
              <li><Link href="/investors" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Investors</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Partners</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Help Center</Link></li>
              <li><Link href="/track-order" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Track Order</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Returns</Link></li>
              <li><Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Size Guide</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-4 h-4" />Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-white">+1 (800) MEGAMART</p>
                  <p className="text-sm">Mon-Fri 9AM-8PM EST</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <div>
                  <p className="text-white">support@megamart.com</p>
                  <p className="text-sm">24/7 Online Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <p className="text-white">MegaMart HQ</p>
                  <p className="text-sm">123 Commerce Street<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <p className="font-semibold">Secure Shopping</p>
                <p className="text-sm text-gray-400">256-bit SSL Encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-gray-400">Free over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-purple-500" />
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-gray-400">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HeadphonesIcon className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-sm text-gray-400">Ready to Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} MegaMart. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <span className="text-gray-600">|</span>
              <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
              <span className="text-gray-600">|</span>
              <Link href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/images/payment/paypal.svg" alt="PayPal" className="h-6" />
              <img src="/images/payment/amex.svg" alt="Amex" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 