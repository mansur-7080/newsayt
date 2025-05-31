'use client'

import React from 'react'
import CustomerLayout from '../../components/layout/CustomerLayout'

export default function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CustomerLayout>{children}</CustomerLayout>
}
