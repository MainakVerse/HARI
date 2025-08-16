"use client"

import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.7
      meshRef.current.rotation.z += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#2465ed" wireframe transparent opacity={0.8} />
      {/* Inner glowing cube */}
      <mesh scale={0.8}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Core cube */}
      <mesh scale={0.6}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.2} />
      </mesh>
    </mesh>
  )
}

interface NeonCubeLoaderProps {
  className?: string
}

export default function NeonCubeLoader({ className = "" }: NeonCubeLoaderProps) {
  return (
    <div className={`w-32 h-32 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
      <div className="text-center mt-4">
        <div className="inline-flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 select-none">Loading HARI...</p>
      </div>
    </div>
  )
}
