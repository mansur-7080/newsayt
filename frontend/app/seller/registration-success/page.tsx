'use client'

import React from 'react'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { CheckCircle, ChevronRight, Store, ArrowRight } from 'lucide-react'

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for applying to become a seller on MegaMart. We've received your application and will review it shortly.
            </p>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">What happens next?</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Application Review</h3>
                    <p className="mt-1 text-gray-600">
                      Our team will review your application and verify the information provided. This typically takes 1-3 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Verification</h3>
                    <p className="mt-1 text-gray-600">
                      We may contact you to verify your business details or request additional information if needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Account Activation</h3>
                    <p className="mt-1 text-gray-600">
                      Once approved, you'll receive an email with instructions to set up your seller account and start listing products.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Store Setup</h3>
                    <p className="mt-1 text-gray-600">
                      Customize your store, add products, and configure payment and shipping options to start selling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Application Reference</h3>
              <p className="text-blue-700 mb-4">
                Your application reference number: <span className="font-semibold">MMS-{Math.floor(Math.random() * 900000) + 100000}</span>
              </p>
              <p className="text-sm text-blue-600">
                Please save this reference number for future correspondence about your application.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link 
                href="/" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
              >
                Return to Homepage
              </Link>
              <Link 
                href="/seller/resources" 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                Seller Resources <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <section className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Prepare for Success</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Seller Guide</h3>
                <p className="text-gray-600 text-center mb-4">
                  Learn how to set up your store, list products, and manage orders effectively.
                </p>
                <div className="text-center">
                  <Link href="/seller/guide" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Policies</h3>
                <p className="text-gray-600 text-center mb-4">
                  Familiarize yourself with our seller policies, fees, and requirements.
                </p>
                <div className="text-center">
                  <Link href="/seller/policies" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    View Policies <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Support</h3>
                <p className="text-gray-600 text-center mb-4">
                  Get help from our seller support team with any questions or issues.
                </p>
                <div className="text-center">
                  <Link href="/seller/support" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    Contact Support <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
