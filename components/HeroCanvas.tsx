"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate the star texture outside of React's render cycle
let _starTexture: THREE.CanvasTexture | null = null;
function getStarTexture(): THREE.CanvasTexture {
  if (_starTexture) return _starTexture;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 32, 32);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.quadraticCurveTo(16, 16, 32, 16);
  ctx.quadraticCurveTo(16, 16, 16, 32);
  ctx.quadraticCurveTo(16, 16, 0, 16);
  ctx.quadraticCurveTo(16, 16, 16, 0);
  ctx.fill();
  _starTexture = new THREE.CanvasTexture(canvas);
  return _starTexture;
}

function Starfield() {
  const count = 350;
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  // Generate random positions, velocities, and colors (one-time)
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      vel[i] = Math.random() * 0.015 + 0.005;
      const intensity = Math.random() * 0.6 + 0.2;
      col[i * 3] = intensity;
      col[i * 3 + 1] = intensity;
      col[i * 3 + 2] = intensity;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, []);

  const starTexture = useMemo(() => getStarTexture(), []);

  // Track mouse globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRot.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRot.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !groupRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const dtScaled = delta * 60;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y += velocities[i] * dtScaled;
      if (y > 10) y = -10;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;

    // Slight rotation from cursor
    const tx = (targetRot.current.y * Math.PI) / 20;
    const ty = (targetRot.current.x * Math.PI) / 20;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
    </group>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Starfield />
      </Canvas>
    </div>
  );
}
