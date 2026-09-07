import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const DESKTOP_METEOR_COUNT = 8;
const MOBILE_METEOR_COUNT = 4;

function useMotionMode() {
  const [mode, setMode] = useState({ mobile: false, reduced: false });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode({ mobile: mobileQuery.matches, reduced: reducedQuery.matches });
    update();
    mobileQuery.addEventListener("change", update);
    reducedQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      reducedQuery.removeEventListener("change", update);
    };
  }, []);

  return mode;
}

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  context.fillStyle = "#12528b";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const continents = [
    [180, 170, 125, 65], [290, 250, 75, 105], [440, 130, 170, 55],
    [530, 265, 140, 75], [720, 150, 120, 70], [825, 295, 150, 82],
    [930, 105, 85, 48], [70, 340, 95, 38],
  ];
  continents.forEach(([x, y, width, height], index) => {
    context.beginPath();
    context.ellipse(x, y, width, height, (index % 3) * 0.35, 0, Math.PI * 2);
    context.fillStyle = index % 3 === 0 ? "#5f7642" : "#88784b";
    context.fill();
  });
  context.globalAlpha = 0.2;
  for (let index = 0; index < 24; index += 1) {
    context.fillStyle = "#c7e6ba";
    context.beginPath();
    context.ellipse(Math.random() * canvas.width, Math.random() * canvas.height, 30 + Math.random() * 70, 5 + Math.random() * 12, Math.random(), 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Earth({ reduced }: { reduced: boolean }) {
  const earth = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture>();

  useEffect(() => {
    setTexture(createEarthTexture());
  }, []);

  useFrame((_, delta) => {
    if (!reduced && earth.current) earth.current.rotation.y += delta * 0.045;
  });

  return (
    <group position={[10, -7, 0]} scale={0.62} rotation={[0.12, -0.35, 0]}>
      <mesh ref={earth}>
        <sphereGeometry args={[9, 48, 48]} />
        <meshStandardMaterial map={texture} color="#718296" roughness={0.98} metalness={0.01} transparent opacity={0.72} />
      </mesh>
      <mesh scale={1.055}>
        <sphereGeometry args={[9, 48, 48]} />
        <meshBasicMaterial color="#4ca8ff" transparent opacity={0.045} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

type MeteorState = { active: boolean; progress: number; start: THREE.Vector3; end: THREE.Vector3; speed: number };

function Meteors({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const count = mobile ? MOBILE_METEOR_COUNT : DESKTOP_METEOR_COUNT;
  const lines = useRef<Array<THREE.Line | null>>([]);
  const states = useRef<MeteorState[]>([]);
  const nextSpawn = useRef(0);

  useMemo(() => {
    states.current = Array.from({ length: count }, () => ({ active: false, progress: 0, start: new THREE.Vector3(), end: new THREE.Vector3(), speed: 0.18 }));
    return states.current;
  }, [count]);

  useFrame((state, delta) => {
    if (reduced) return;
    if (state.clock.elapsedTime > nextSpawn.current) {
      const available = states.current.find((meteor) => !meteor.active);
      if (available) {
        available.active = true;
        available.progress = 0;
        available.start.set((Math.random() - 0.5) * 24, 8 + Math.random() * 8, -5 - Math.random() * 8);
        available.end.set((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, 0);
        available.speed = 0.12 + Math.random() * 0.08;
      }
      nextSpawn.current = state.clock.elapsedTime + (mobile ? 2.2 : 1.15);
    }
    states.current.forEach((meteor, index) => {
      const line = lines.current[index];
      if (!line) return;
      if (!meteor.active) { line.visible = false; return; }
      meteor.progress += delta * meteor.speed;
      if (meteor.progress >= 1) { meteor.active = false; line.visible = false; return; }
      const point = meteor.start.clone().lerp(meteor.end, meteor.progress);
      const tail = meteor.start.clone().lerp(meteor.end, Math.max(0, meteor.progress - 0.1));
      line.geometry.setFromPoints([tail, point]);
      line.visible = true;
      (line.material as THREE.LineBasicMaterial).opacity = 0.8 * (1 - meteor.progress);
    });
  });

  return <>{states.current.map((_, index) => (
    <line key={index} ref={(line) => { lines.current[index] = line; }} visible={false}>
      <bufferGeometry /><lineBasicMaterial color="#d7ecff" transparent opacity={0} linewidth={1} />
    </line>
  ))}</>;
}

function CameraMotion({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();
  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    const parallax = mobile ? 0.04 : 0.12;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(time * 0.06) * 0.35 + mouse.x * parallax, 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.cos(time * 0.05) * 0.18 + mouse.y * parallax, 0.018);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function EarthScene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.08} color="#7895c0" />
      <directionalLight position={[-8, 5, 10]} intensity={0.72} color="#c7d7ed" />
      <Earth reduced={reduced} />
      <Meteors mobile={mobile} reduced={reduced} />
      <CameraMotion mobile={mobile} />
    </>
  );
}

export function MissionControlScene() {
  const { mobile, reduced } = useMotionMode();

  return (
    <div className="mission-control-scene" aria-hidden="true">
      <Canvas className="mission-control-canvas" camera={{ position: [0, 0, 48], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <EarthScene mobile={mobile} reduced={reduced} />
      </Canvas>
    </div>
  );
}