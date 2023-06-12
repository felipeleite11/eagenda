import React from 'react'

import './styles.scss'

interface ShimmerProps {
  className?: string
}

export function Shimmer({ className = 'w-full h-8' }: ShimmerProps) {
  return (
    <div className="wrapper">
      <div className={`animate ${className}`}></div>
    </div>
  )
}
