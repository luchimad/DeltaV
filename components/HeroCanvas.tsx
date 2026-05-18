"use client";

import { useRef, useMemo, useEffect, useState, Component, type ReactNode } from "react";
import * as THREE from "three";

// ─── WebGL Support Detection ─────────────────────────────────────────────────
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext;
  } catch {
    return false;
  }
}

// ─── Error Boundary (catches Three.js crashes) ──────────────────────────────
class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ─── 2D Canvas Fallback (the original, battle-tested implementation) ────────
function Canvas2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Particles
    const count = 300;
    const particles: { x: number; y: number; r: number; o: number; vy: number }[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.5 + 0.1,
        vy: -(Math.random() * 0.4 + 0.1),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.o;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.vy;
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}

// ─── WebGL 3D Starfield ─────────────────────────────────────────────────────
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

function WebGLStarfield() {
  // Lazy-import react-three-fiber to avoid loading it when WebGL is unavailable
  const [R3FComponents, setR3FComponents] = useState<{
    Canvas: any;
    useFrame: any;
  } | null>(null);

  useEffect(() => {
    import("@react-three/fiber").then((mod) => {
      setR3FComponents({ Canvas: mod.Canvas, useFrame: mod.useFrame });
    });
  }, []);

  if (!R3FComponents) return null;

  return (
    <R3FComponents.Canvas
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
      <StarfieldScene useFrame={R3FComponents.useFrame} />
    </R3FComponents.Canvas>
  );
}

function StarfieldScene({ useFrame }: { useFrame: any }) {
  const count = 350;
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const targetRot = useRef({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRot.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRot.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_: any, delta: number) => {
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

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const [mode, setMode] = useState<"loading" | "webgl" | "2d">("loading");

  useEffect(() => {
    setMode(isWebGLAvailable() ? "webgl" : "2d");
  }, []);

  if (mode === "loading") return null;

  if (mode === "2d") {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas2DFallback />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <CanvasErrorBoundary fallback={<Canvas2DFallback />}>
        <WebGLStarfield />
      </CanvasErrorBoundary>
    </div>
  );
}
