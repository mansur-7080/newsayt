'use client'

import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { Store, ShieldCheck, CheckCircle, AlertCircle, ChevronRight, Upload, MapPin } from 'lucide-react'

export default function SellerRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  interface FormData {
    businessName: string;
    businessType: string;
    category: string;
    description: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    taxId: string;
    bankAccount: string;
    logo: File | null;
    banner: File | null;
    idDocument: File | null;
    businessLicense: File | null;
    termsAccepted: boolean;
  }
  
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: '',
    category: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    taxId: '',
    bankAccount: '',
    logo: null,
    banner: null,
    idDocument: null,
    businessLicense: null,
    termsAccepted: false
  })
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    }
  }
  
  const nextStep = () => {
    setStep(prev => prev + 1)
    window.scrollTo(0, 0)
  }
  
  const prevStep = () => {
    setStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    router.push('/seller/registration-success')
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Tracker */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    1
                  </div>
                  <span className="text-sm font-medium">Business Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Store Details</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    3
                  </div>
                  <span className="text-sm font-medium">Verification</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    4
                  </div>
                  <span className="text-sm font-medium">Review</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Become a Seller on MegaMart</h1>
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Business Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
                    <p className="text-gray-600 mb-6">Tell us about your business so we can set up your seller account correctly.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select business type</option>
                          <option value="individual">Individual / Sole Proprietor</option>
                          <option value="llc">Limited Liability Company (LLC)</option>
                          <option value="corporation">Corporation</option>
                          <option value="partnership">Partnership</option>
                          <option value="cooperative">Cooperative</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Primary Category *</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select primary category</option>
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="home">Home & Garden</option>
                          <option value="beauty">Beauty & Health</option>
                          <option value="sports">Sports & Fitness</option>
                          <option value="food">Food & Beverages</option>
                          <option value="handicrafts">Handicrafts</option>
                          <option value="agriculture">Agriculture</option>
                          <option value="automotive">Automotive</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Business Description *</label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Describe your business, products, and what makes you unique (100-500 characters)</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue <ChevronRight className="inline-block w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Store Details */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Store Details</h2>
                    <p className="text-gray-600 mb-6">Provide contact information and details about your store.</p>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region/Province *</label>
                          <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">Store Logo</label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="logo" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  <span>Upload a file</span>
                                  <input id="logo" name="logo" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-1">Store Banner</label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="banner" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  <span>Upload a file</span>
                                  <input id="banner" name="banner" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue <ChevronRight className="inline-block w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Verification */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Documents</h2>
                    <p className="text-gray-600 mb-6">We need to verify your business to ensure the security of our marketplace.</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                      <div className="flex">
                        <ShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-blue-800">Why we need verification</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            Verification helps us maintain a trusted marketplace. Your documents are securely stored and only used for verification purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">Tax ID / Business Registration Number *</label>
                        <input
                          type="text"
                          id="taxId"
                          name="taxId"
                          value={formData.taxId}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-1">Bank Account Information *</label>
                        <input
                          type="text"
                          id="bankAccount"
                          name="bankAccount"
                          value={formData.bankAccount}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">This is where your payments will be deposited</p>
                      </div>
                      
                      <div>
                        <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700 mb-1">ID Document (Owner/Representative) *</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="idDocument" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="idDocument" name="idDocument" type="file" className="sr-only" onChange={handleFileChange} accept="image/*, application/pdf" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700 mb-1">Business License/Registration *</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="businessLicense" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="businessLicense" name="businessLicense" type="file" className="sr-only" onChange={handleFileChange} accept="image/*, application/pdf" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue <ChevronRight className="inline-block w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h2>
                    <p className="text-gray-600 mb-6">Please review your information before submitting your application.</p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Business Name</p>
                            <p className="text-sm font-medium">{formData.businessName || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Business Type</p>
                            <p className="text-sm font-medium">{formData.businessType || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Primary Category</p>
                            <p className="text-sm font-medium">{formData.category || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tax ID</p>
                            <p className="text-sm font-medium">{formData.taxId || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-sm font-medium">{formData.phone || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm font-medium">{formData.email || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="text-sm font-medium">{formData.website || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="text-sm font-medium">
                              {formData.address ? `${formData.address}, ${formData.city}, ${formData.region}, ${formData.postalCode}` : 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Uploaded Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Store Logo</p>
                            <p className="text-sm font-medium">{formData.logo ? formData.logo.name : 'Not uploaded'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Store Banner</p>
                            <p className="text-sm font-medium">{formData.banner ? formData.banner.name : 'Not uploaded'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">ID Document</p>
                            <p className="text-sm font-medium">{formData.idDocument ? formData.idDocument.name : 'Not uploaded'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Business License</p>
                            <p className="text-sm font-medium">{formData.businessLicense ? formData.businessLicense.name : 'Not uploaded'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                          <div>
                            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              By submitting this application, you agree to MegaMart's Seller Terms and Conditions. Your application will be reviewed within 1-3 business days.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="termsAccepted"
                            name="termsAccepted"
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                            I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.termsAccepted}
                        className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          formData.termsAccepted 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Why Sell on MegaMart?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Store className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-md font-medium text-gray-900">Reach Millions</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Connect with customers across Uzbekistan and beyond through our growing marketplace.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-md font-medium text-gray-900">Easy to Use</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Our seller tools make it simple to list products, manage inventory, and process orders.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-md font-medium text-gray-900">Local & Global</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Sell to local customers or expand your business internationally with our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
