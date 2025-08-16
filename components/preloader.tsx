"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group } from "three"

function NeonCube() {
  return (
    <group>
      {/* Outer cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial wireframe color="#00ffff" transparent opacity={0.8} />
      </mesh>

      {/* Middle cube */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial wireframe color="#ff00ff" transparent opacity={0.6} />
      </mesh>

      {/* Inner cube */}
      <mesh rotation={[1, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial wireframe color="#ffff00" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function AnimatedCube() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.5
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <NeonCube />
    </group>
  )
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500) // Small delay before hiding
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* 3D Neon Cube */}
      <div className="w-64 h-64 mb-8">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <AnimatedCube />
        </Canvas>
      </div>

      {/* Loading Text and Progress */}
      <div className="absolute bottom-32 text-center">
        <div className="text-2xl font-bold text-white mb-4 select-none">
          Summoning HARI
          <span className="animate-pulse">...</span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-sm text-gray-400 mt-2 select-none">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}
