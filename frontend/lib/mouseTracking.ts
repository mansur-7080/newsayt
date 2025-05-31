/**
 * Mouse tracking utility for interactive elements
 * Inspired by Devin.ai hover effects
 */

export function initMouseTracking() {
  if (typeof window === 'undefined') return
  
  const handleMouseMove = (e: MouseEvent) => {
    document.querySelectorAll('.interactive-element').forEach((element) => {
      const rect = (element as HTMLElement).getBoundingClientRect()
      const x = ((e.clientX - rect.left) / (element as HTMLElement).offsetWidth) * 100
      const y = ((e.clientY - rect.top) / (element as HTMLElement).offsetHeight) * 100
      
      ;(element as HTMLElement).style.setProperty('--mouse-x', `${x}%`)
      ;(element as HTMLElement).style.setProperty('--mouse-y', `${y}%`)
    })
  }
  
  const handleMouseEnter = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement
    
    const softLine = document.createElement('div')
    softLine.classList.add('soft-line', 'soft-line-appear')
    softLine.style.width = '0'
    softLine.style.bottom = '0'
    softLine.style.left = '0'
    
    element.appendChild(softLine)
  }
  
  const handleMouseLeave = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement
    const softLines = element.querySelectorAll('.soft-line')
    
    softLines.forEach(line => {
      line.classList.remove('soft-line-appear')
      line.classList.add('soft-line-fade')
      
      setTimeout(() => {
        if (line.parentNode === element) {
          element.removeChild(line)
        }
      }, 500)
    })
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  
  document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('mouseenter', handleMouseEnter as EventListener)
    element.addEventListener('mouseleave', handleMouseLeave as EventListener)
  })
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
    
    document.querySelectorAll('.interactive-element').forEach(element => {
      element.removeEventListener('mouseenter', handleMouseEnter as EventListener)
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener)
    })
  }
}
