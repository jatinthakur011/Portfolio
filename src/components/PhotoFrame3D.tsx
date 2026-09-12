import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type React from "react";
import { useRef } from "react";
import * as THREE from "three";

function PhotoPlane({ photoUrl }: { photoUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, photoUrl);

  useFrame(({ mouse }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * -0.08, 0.08);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.12, 0.08);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3.05, 4.05, 1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0.04} />
    </mesh>
  );
}

export function PhotoFrame3D({ photoUrl }: { photoUrl: string }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 170, damping: 20, mass: 0.6 });
  const springY = useSpring(tiltY, { stiffness: 170, damping: 20, mass: 0.6 });
  const reducedMotion = useReducedMotion();
  const photoX = useTransform(springY, [-10, 10], [-5, 5]);
  const photoY = useTransform(springX, [-10, 10], [5, -5]);

  function updateTilt(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
  }

  return (
    <motion.div
      className="photo-frame-3d"
      aria-label="Portrait of Jatin Thakur"
      onPointerMove={updateTilt}
      onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
    >
      <motion.div className="photo-frame-rim" style={{ x: useTransform(springY, [-12, 12], [-8, 8]), y: useTransform(springX, [-12, 12], [8, -8]) }} />
      <motion.div className="photo-frame-photo-layer" style={{ x: photoX, y: photoY }}>
        <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
          <CinematicCamera reducedMotion={Boolean(reducedMotion)} />
          <ambientLight intensity={1.25} color="#173d58" />
          <pointLight position={[2.4, 1.4, 3]} intensity={6.5} color="#1689a5" />
          <pointLight position={[-2.2, 0.4, 2.4]} intensity={5.4} color="#ff9c58" />
          <spotLight position={[0, 2.5, 4]} angle={0.45} penumbra={0.9} intensity={2.8} color="#fff1dc" />
          <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.05} floatIntensity={reducedMotion ? 0 : 0.1}>
            <PhotoPlane photoUrl={photoUrl} />
          </Float>
        </Canvas>
      </motion.div>
    </motion.div>
  );
}

function CinematicCamera({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame(({ camera, clock }) => {
    if (reducedMotion) return;
    const orbit = clock.getElapsedTime() * ((Math.PI * 2) / 3);
    camera.position.x = Math.sin(orbit) * 0.16;
    camera.position.y = -0.2 + Math.sin(orbit * 0.5) * 0.04;
    camera.position.z = 4.4 + Math.cos(orbit) * 0.05;
    camera.lookAt(0, 0.16, 0);
  });

  return null;
}
