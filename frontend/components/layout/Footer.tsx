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
    <footer className="bg-opacity-30 bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] to-[#0a061a]"></div>
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-opacity-40 bg-black py-8 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-white/60">Get special offers and exclusive deals</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-opacity-20 bg-black border border-opacity-20 border-white rounded-l-lg w-full md:w-80 focus:outline-none focus:border-indigo-500 text-white placeholder-white placeholder-opacity-60"
              />
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg font-semibold transition-colors border-highlight">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 interactive-element dark-gradient-glow">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">MegaMart</span>
            </Link>
            <p className="text-white/60 mb-4">
              Your trusted global marketplace for quality products at unbeatable prices. 
              Shop with confidence from millions of sellers worldwide.
            </p>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors border-highlight">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors border-highlight">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors border-highlight">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors border-highlight">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-opacity-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors border-highlight">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {/* Mobile Apps */}
            <div>
              <p className="text-sm text-white/60 mb-2">Download Our App</p>
              <div className="flex gap-2">
                <button className="bg-opacity-30 bg-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-40 transition-colors border-highlight">
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-white/60">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-opacity-30 bg-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-40 transition-colors border-highlight">
                  <Play className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-white/60">Get it on</div>
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
              <li><Link href="/about" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />About Us</Link></li>
              <li><Link href="/careers" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Careers</Link></li>
              <li><Link href="/press" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Press Center</Link></li>
              <li><Link href="/investors" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Investors</Link></li>
              <li><Link href="/partners" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Partners</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Help Center</Link></li>
              <li><Link href="/track-order" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Track Order</Link></li>
              <li><Link href="/shipping" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Shipping Info</Link></li>
              <li><Link href="/returns" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Returns</Link></li>
              <li><Link href="/size-guide" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Size Guide</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-indigo-300 transition-colors flex items-center gap-1 border-highlight"><ChevronRight className="w-4 h-4" />Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-white">+1 (800) MEGAMART</p>
                  <p className="text-sm">Mon-Fri 9AM-8PM EST</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5" />
                <div>
                  <p className="text-white">support@megamart.com</p>
                  <p className="text-sm">24/7 Online Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-white/60">
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
        <div className="border-t border-opacity-10 border-white mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 bg-opacity-10 bg-white p-4 rounded-lg border-highlight">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-semibold">Secure Shopping</p>
                <p className="text-sm text-white/60">256-bit SSL Encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-opacity-10 bg-white p-4 rounded-lg border-highlight">
              <Truck className="w-8 h-8 text-indigo-400" />
              <div>
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-white/60">Free over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-opacity-10 bg-white p-4 rounded-lg border-highlight">
              <CreditCard className="w-8 h-8 text-purple-400" />
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-white/60">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-opacity-10 bg-white p-4 rounded-lg border-highlight">
              <HeadphonesIcon className="w-8 h-8 text-blue-400" />
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-sm text-white/60">Ready to Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-opacity-50 bg-black py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} MegaMart. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-indigo-300 border-highlight">Privacy Policy</Link>
              <span className="text-white/30">|</span>
              <Link href="/terms" className="text-white/60 hover:text-indigo-300 border-highlight">Terms of Service</Link>
              <span className="text-white/30">|</span>
              <Link href="/cookies" className="text-white/60 hover:text-indigo-300 border-highlight">Cookie Policy</Link>
              <span className="text-white/30">|</span>
              <Link href="/sitemap" className="text-white/60 hover:text-indigo-300 border-highlight">Sitemap</Link>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <img src="/images/payment/visa.svg" alt="Visa" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/paypal.svg" alt="PayPal" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/amex.svg" alt="Amex" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}  