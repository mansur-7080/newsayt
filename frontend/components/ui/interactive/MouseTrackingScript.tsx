'use client'

import { useEffect } from 'react'
import { initMouseTracking } from '@/lib/mouseTracking'

export default function MouseTrackingScript() {
  useEffect(() => {
    const cleanup = initMouseTracking()
    
    return cleanup
  }, [])
  
  return null
}
