import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const STAR_COUNT = 900;
const METEOR_COUNT = 12;

function StarField() {
  const group = useRef<THREE.Group>(null);
  const stars = useRef<THREE.Points>(null);
  const meteorPositions = useRef(
    Array.from({ length: METEOR_COUNT }, (_, index) => ({
      x: ((index * 37) % 100) / 50 - 1,
      y: ((index * 61) % 100) / 50 - 1,
      z: -((index * 17) % 16),
      speed: 0.3 + (index % 4) * 0.12,
    })),
  );

  const positions = new Float32Array(STAR_COUNT * 3);
  for (let index = 0; index < STAR_COUNT; index += 1) {
    const depth = Math.random() * 18 - 9;
    positions[index * 3] = (Math.random() - 0.5) * 20;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 13;
    positions[index * 3 + 2] = depth;
  }

  useFrame(({ mouse, camera }, delta) => {
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -mouse.y * 0.045,
        0.025,
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.07,
        0.025,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -window.scrollY * 0.00012,
        0.025,
      );
    }
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.02);
    if (stars.current) stars.current.rotation.y += delta * 0.003;
    for (const meteor of meteorPositions.current) {
      meteor.y -= delta * meteor.speed;
      if (meteor.y < -1.2) meteor.y = 1.2;
    }
  });

  return (
    <group ref={group}>
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={STAR_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#b8d3ff" size={0.035} sizeAttenuation transparent opacity={0.82} />
      </points>
      {meteorPositions.current.map((meteor, index) => (
        <mesh key={index} position={[meteor.x * 7, meteor.y * 5, meteor.z]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color={index % 3 === 0 ? "#8ff4d0" : "#79aaff"} />
        </mesh>
      ))}
      <Sparkles count={90} scale={[18, 10, 12]} size={1.2} speed={0.12} color="#4f8dfd" opacity={0.35} />
    </group>
  );
}

export function MissionControlScene() {
  return (
    <div className="mission-control-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <StarField />
      </Canvas>
      <div className="mission-horizon" />
    </div>
  );
}
