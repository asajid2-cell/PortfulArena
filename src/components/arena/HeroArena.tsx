import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

function ArenaScene({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const topGroupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>>(null);

  const driftOffsets = useMemo(() => {
    const random = Math.random();
    return {
      x: 0.04 + random * 0.02,
      z: 0.06 + random * 0.03
    };
  }, []);

  useFrame((state, delta) => {
    if (!prefersReducedMotion && topGroupRef.current) {
      topGroupRef.current.rotation.y += delta * 1.2;
      topGroupRef.current.position.x = Math.sin(state.clock.elapsedTime * driftOffsets.x) * 0.08;
      topGroupRef.current.position.z = Math.cos(state.clock.elapsedTime * driftOffsets.z) * 0.08;
    }

    if (glowRef.current) {
      const material = glowRef.current.material;
      material.opacity = prefersReducedMotion ? 0.15 : 0.25 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 7, 6]} intensity={1.1} color="#A95E5E" castShadow />
      <directionalLight position={[-4, 3, -5]} intensity={0.6} color="#752037" />

      <group rotation-x={-Math.PI / 2}>
        <mesh receiveShadow>
          <cylinderGeometry args={[2.6, 2.6, 0.16, 64]} />
          <meshStandardMaterial color="#4A0404" metalness={0.18} roughness={0.86} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <ringGeometry args={[1.9, 2.3, 64]} />
          <meshBasicMaterial color="#A95E5E" opacity={0.32} transparent />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <ringGeometry args={[1.3, 1.7, 64]} />
          <meshBasicMaterial color="#752037" opacity={0.24} transparent />
        </mesh>
      </group>

      <group ref={topGroupRef} position={[0, 0.38, 0]} rotation-x={Math.PI * 0.08}>
        <mesh castShadow>
          <cylinderGeometry args={[0.55, 0.45, 0.16, 48]} />
          <meshStandardMaterial color="#A95E5E" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.4, 0.24, 32]} />
          <meshStandardMaterial color="#1A222E" metalness={0.15} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.12, 24]} />
          <meshStandardMaterial color="#A95E5E" metalness={0.7} roughness={0.42} />
        </mesh>
      </group>

      <mesh ref={glowRef} rotation-x={-Math.PI / 2} position={[0, 0.2, 0]}>
        <ringGeometry args={[0.6, 0.95, 64]} />
        <meshBasicMaterial color="#A95E5E" transparent opacity={0.24} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 32]} />
        <meshStandardMaterial color="#3A080F" metalness={0.3} roughness={0.7} />
      </mesh>
    </>
  );
}

export function HeroArena() {
  const prefersReducedMotion = useReducedMotion();
  const [supportsWebGL, setSupportsWebGL] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        setSupportsWebGL(true);
      }
    } catch {
      setSupportsWebGL(false);
    }
  }, []);

  const shouldRenderCanvas = supportsWebGL && !prefersReducedMotion;

  return (
    <div className="relative h-72 shrink-0 overflow-hidden rounded-[24px] border border-[color:var(--line-1)] bg-[color:rgba(11,16,22,0.92)] shadow-ambient lg:h-[420px] lg:w-[420px]">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(117,32,55,0.42),transparent_65%),radial-gradient(circle_at_78%_62%,rgba(169,94,94,0.32),transparent_58%)]"
        aria-hidden="true"
      />
      {shouldRenderCanvas ? (
        <Canvas
          className="pointer-events-none absolute inset-0"
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 3.2, 6], fov: 42 }}
        >
          <Suspense fallback={null}>
            <ArenaScene prefersReducedMotion={prefersReducedMotion} />
          </Suspense>
        </Canvas>
      ) : null}
      <div className="absolute inset-8 rounded-[20px] border border-[color:rgba(169,94,94,0.28)] bg-[color:rgba(11,16,22,0.82)] backdrop-blur">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-3)]">Project Telemetry</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-[color:var(--text-2)]">
              <div>
                <p className="text-xs uppercase text-[color:var(--text-3)]">Velocity</p>
                <p className="font-mono text-2xl font-semibold text-[color:var(--pri-300)]">0.94</p>
              </div>
              <div>
                <p className="text-xs uppercase text-[color:var(--text-3)]">Spin Rate</p>
                <p className="font-mono text-2xl font-semibold text-[color:var(--sec-400)]">318 rpm</p>
              </div>
            </div>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:var(--text-3)]">
            Crafted momentum - friction managed
          </p>
        </div>
      </div>
    </div>
  );
}

