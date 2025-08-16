"use client"

import { useState, useEffect } from "react"

interface AnimatedTextCycleProps {
  texts: string[]
  className?: string
}

export default function AnimatedTextCycle({ texts, className = "" }: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsVisible(true)
      }, 300) // Half of transition duration for smooth effect
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <span
      className={`transition-opacity duration-600 select-none ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {texts[currentIndex]}
    </span>
  )
}
