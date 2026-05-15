"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield() {
  const count = 400;
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  // Generate random positions, velocities, and opacities
  const [positions, velocities, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const op = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z spread
      vel[i] = Math.random() * 0.015 + 0.005; // speed going up
      const intensity = Math.random() * 0.6 + 0.2;
      op[i * 3] = intensity; // R
      op[i * 3 + 1] = intensity; // G
      op[i * 3 + 2] = intensity; // B
    }
    return [pos, vel, op];
  }, []);

  // Create a 4-point star texture for the particles
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.quadraticCurveTo(16, 16, 32, 16);
      ctx.quadraticCurveTo(16, 16, 16, 32);
      ctx.quadraticCurveTo(16, 16, 0, 16);
      ctx.quadraticCurveTo(16, 16, 16, 0);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Track mouse globally since the canvas has pointer-events-none
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetRot.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRot.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !groupRef.current) return;
    
    // Animate particles going up
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = positionsAttr.getY(i);
      y += velocities[i] * (delta * 60);
      if (y > 10) y = -10; // loop back to bottom
      positionsAttr.setY(i, y);
    }
    positionsAttr.needsUpdate = true;

    // Slight and limited rotation mapped to cursor movement
    const targetRotX = (targetRot.current.y * Math.PI) / 20; // inverted for natural feel
    const targetRotY = (targetRot.current.x * Math.PI) / 20;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={opacities.length / 3}
            array={opacities}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.12}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
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
        gl={{ alpha: true, antialias: true }}
      >
        <Starfield />
      </Canvas>
    </div>
  );
}
