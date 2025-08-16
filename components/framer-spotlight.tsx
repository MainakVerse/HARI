"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, animate } from "framer-motion"
import { useTheme } from "next-themes"

export default function FramerSpotlight() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMouseInHero, setIsMouseInHero] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const defaultPositionRef = useRef({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Motion values for the spotlight position with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  // Define multiple spotlight colors
  const spotlightColors = [
    { color: "rgba(36, 101, 237, 0.2)", darkColor: "rgba(36, 101, 237, 0.25)" }, // Blue (primary)
    { color: "rgba(236, 72, 153, 0.15)", darkColor: "rgba(236, 72, 153, 0.2)" }, // Pink
    { color: "rgba(16, 185, 129, 0.15)", darkColor: "rgba(16, 185, 129, 0.2)" }, // Green
  ]

  // Update default position without causing re-renders
  const updateDefaultPosition = () => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect()
      const centerX = heroRect.left + heroRect.width / 2
      const centerY = heroRect.top + heroRect.height / 3

      defaultPositionRef.current = { x: centerX, y: centerY }

      // Set initial position
      mouseX.set(centerX)
      mouseY.set(centerY)
    }
  }

  // Handle mouse enter/leave for hero section
  const handleMouseEnter = () => {
    setIsMouseInHero(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInHero(false)

    // Animate back to default position
    animate(mouseX, defaultPositionRef.current.x, {
      duration: 1.2,
      ease: "easeInOut",
    })

    animate(mouseY, defaultPositionRef.current.y, {
      duration: 1.2,
      ease: "easeInOut",
    })
  }

  // Handle mouse movement only when inside hero
  const handleMouseMove = (e: MouseEvent) => {
    if (isMouseInHero) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
  }

  // Setup effect - runs once on mount and cleans up on unmount
  useEffect(() => {
    setIsMounted(true)

    // Find the hero section element
    heroRef.current = document.getElementById("hero")

    // Initial setup
    updateDefaultPosition()

    // Event listeners
    window.addEventListener("resize", updateDefaultPosition)
    window.addEventListener("mousemove", handleMouseMove)

    if (heroRef.current) {
      heroRef.current.addEventListener("mouseenter", handleMouseEnter)
      heroRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDefaultPosition)
      window.removeEventListener("mousemove", handleMouseMove)

      if (heroRef.current) {
        heroRef.current.removeEventListener("mouseenter", handleMouseEnter)
        heroRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMouseInHero]) // Only depend on isMouseInHero

  if (!isMounted) {
    return null
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary spotlight that follows mouse/animation */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[0].darkColor : spotlightColors[0].color
          } 0%, transparent 70%)`,
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Secondary spotlights with independent animations */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "10%", "5%", "0%"],
          y: ["0%", "5%", "10%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[1].darkColor : spotlightColors[1].color
          } 0%, transparent 70%)`,
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          left: "20%",
          top: "30%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-10%", "-5%", "0%"],
          y: ["0%", "-5%", "-10%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[2].darkColor : spotlightColors[2].color
          } 0%, transparent 70%)`,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          right: "20%",
          bottom: "30%",
        }}
      />

      {/* Additional colored spotlights */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.15)"
          } 0%, transparent 70%)`,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          left: "60%",
          top: "20%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? "rgba(251, 191, 36, 0.2)" : "rgba(251, 191, 36, 0.15)"
          } 0%, transparent 70%)`,
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          left: "30%",
          bottom: "15%",
        }}
      />
    </div>
  )
}
