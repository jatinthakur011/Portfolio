import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function PhotoPlane({ photoUrl }: { photoUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, photoUrl);

  useFrame(({ mouse }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * -0.18, 0.08);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.24, 0.08);
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[1.35, 64]} />
      <meshStandardMaterial map={texture} roughness={0.72} metalness={0.08} />
    </mesh>
  );
}

export function PhotoFrame3D({ photoUrl }: { photoUrl: string }) {
  return (
    <div className="photo-frame-3d" aria-label="Portrait of Jatin Thakur">
      <div className="photo-frame-rim" />
      <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.6} />
        <pointLight position={[2, 2, 3]} intensity={4} color="#4f8dfd" />
        <pointLight position={[-2, -1, 2]} intensity={2.5} color="#8ff4d0" />
        <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.14}>
          <PhotoPlane photoUrl={photoUrl} />
        </Float>
      </Canvas>
    </div>
  );
}
