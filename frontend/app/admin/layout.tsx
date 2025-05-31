'use client'

import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}
