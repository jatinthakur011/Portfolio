import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshTransmissionMaterial, Stars } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function SceneObject() {
  const mesh = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ mouse }, delta) => {
    if (!mesh.current || reducedMotion) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.35, 0.04);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.5, 0.04);
    mesh.current.rotation.z += delta * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
      <Icosahedron ref={mesh} args={[1.45, 2]}>
        <MeshTransmissionMaterial
          color="#2dd4bf"
          emissive="#073b4c"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.5}
          thickness={0.65}
          wireframe
          transparent
          opacity={0.68}
        />
      </Icosahedron>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 2, 4]} intensity={4} color="#2dd4bf" />
        <pointLight position={[-3, -1, 2]} intensity={2.5} color="#4f8dfd" />
        <Stars radius={7} depth={4} count={90} factor={1.4} saturation={0} fade speed={0.25} />
        <SceneObject />
      </Canvas>
    </div>
  );
}