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
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#1a5c8a";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const continents = [
    [[120, 90], [190, 62], [280, 82], [330, 135], [270, 190], [190, 170], [135, 215], [92, 160]],
    [[310, 205], [390, 168], [450, 215], [430, 315], [365, 350], [320, 290], [270, 260]],
    [[65, 315], [140, 280], [225, 310], [260, 375], [190, 420], [105, 398]],
    [[470, 92], [540, 72], [600, 112], [570, 170], [500, 160]],
  ];
  continents.forEach((points, index) => {
    context.beginPath();
    points.forEach(([x, y], pointIndex) => pointIndex ? context.lineTo(x, y) : context.moveTo(x, y));
    context.closePath();
    context.fillStyle = index === 2 ? "#9a784c" : index === 1 ? "#527b45" : "#718d4d";
    context.fill();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createMoonTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillStyle = "#aeb5b5";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#626a6d";
  [[62, 42, 13], [139, 78, 10], [188, 34, 8], [90, 98, 6]].forEach(([x, y, radius]) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function EarthWebGLScene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const earth = useRef<THREE.Mesh>(null);
  const moonPivot = useRef<THREE.Group>(null);
  const earthTexture = useMemo(createEarthTexture, []);
  const moonTexture = useMemo(createMoonTexture, []);
  const segments = mobile ? 32 : 64;

  useFrame(({ clock, mouse, camera }, delta) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.45, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.3, 0.025);
    camera.lookAt(0, 0, 0);
    if (reduced) return;
    if (earth.current) earth.current.rotation.y += delta * 0.035;
    if (moonPivot.current) moonPivot.current.rotation.y += delta * 0.16;
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#8aaed0" />
      <directionalLight position={[-10, 8, 14]} intensity={2.2} color="#fff3d1" />
      <mesh ref={earth}>
        <sphereGeometry args={[9, segments, segments]} />
        <meshStandardMaterial map={earthTexture ?? undefined} roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[9, mobile ? 24 : 40, mobile ? 24 : 40]} />
        <meshBasicMaterial color="#42b9ff" transparent opacity={0.12} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <group ref={moonPivot}>
        <mesh position={[13.5, 0.8, 1.5]}>
          <sphereGeometry args={[1.8, mobile ? 20 : 32, mobile ? 20 : 32]} />
          <meshStandardMaterial map={moonTexture ?? undefined} roughness={0.9} metalness={0} />
        </mesh>
      </group>
    </>
  );
}

function Earth({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <div className="earth-orbit" aria-hidden="true">
      <Canvas className="earth-webgl-canvas" camera={{ position: [0, 0, 29], fov: 38 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <EarthWebGLScene mobile={mobile} reduced={reduced} />
      </Canvas>
    </div>
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
      <Meteors mobile={mobile} reduced={reduced} />
      <CameraMotion mobile={mobile} />
    </>
  );
}

export function MissionControlScene() {
  const { mobile, reduced } = useMotionMode();

  return (
    <div className="mission-control-scene" aria-hidden="true">
      <Earth mobile={mobile} reduced={reduced} />
      <Canvas className="mission-control-canvas" camera={{ position: [0, 0, 48], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <EarthScene mobile={mobile} reduced={reduced} />
      </Canvas>
    </div>
  );
}