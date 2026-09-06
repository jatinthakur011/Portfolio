import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Skill = { name: string; variant: "primary" | "signal" };

function SphereSkills({ skills }: { skills: Skill[] }) {
  const group = useRef<THREE.Group>(null);
  const [paused, setPaused] = useState(false);
  const placements = useMemo(() => {
    const radius = 2.35;
    return skills.map((skill, index) => {
      const y = 1 - (index / Math.max(skills.length - 1, 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * index;
      return {
        ...skill,
        position: [Math.cos(angle) * ring * radius, y * radius, Math.sin(angle) * ring * radius] as [number, number, number],
      };
    });
  }, [skills]);

  useFrame((_, delta) => {
    if (group.current && !paused) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {placements.map((skill) => (
        <group key={skill.name} position={skill.position}>
          <Html center distanceFactor={7} style={{ pointerEvents: "auto" }}>
            <span
              className={`sphere-skill-pill ${skill.variant === "signal" ? "chip-signal" : ""}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {skill.name}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function SkillsSphere({ groups }: { groups: { title: string; variant: "primary" | "signal"; items: string[] }[] }) {
  const skills = groups.flatMap((group) =>
    group.items.map((name) => ({ name, variant: group.variant })),
  );

  return (
    <div className="skills-sphere-wrap">
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[3, 3, 4]} intensity={3} color="#4f8dfd" />
        <SphereSkills skills={skills} />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.5} dampingFactor={0.08} enableDamping />
      </Canvas>
      <div className="skills-sphere-legend" aria-hidden="true">
        {groups.map((group) => (
          <span key={group.title} className={group.variant === "signal" ? "legend-signal" : ""}>
            {group.title}
          </span>
        ))}
      </div>
    </div>
  );
}
