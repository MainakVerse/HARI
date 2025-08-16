"use client"

import { useEffect, useState } from "react"

export default function HeroSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      // Only update position occasionally to improve performance
      if (Math.random() > 0.92) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Set initial position to center of screen
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Main spotlight that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-[-1] opacity-70 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.15), transparent 40%)`,
        }}
      />

      {/* Static spotlights for visual interest */}
      <div
        className="pointer-events-none absolute inset-0 z-[-1] opacity-50"
        style={{
          background: `
            radial-gradient(800px circle at 20% 30%, rgba(120, 120, 255, 0.1), transparent 40%),
            radial-gradient(600px circle at 80% 60%, rgba(100, 150, 255, 0.1), transparent 40%)
          `,
        }}
      />

      {/* Subtle animated gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-background/80 opacity-80" />
    </>
  )
}
