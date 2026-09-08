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

function Earth() {
  return (
    <div className="earth-orbit" aria-hidden="true">
      <div className="earth-moon">
        <div className="moon-surface" />
        <div className="moon-craters" />
      </div>
      <div className="earth-sphere">
        <div className="earth-surface" />
        <div className="earth-continents" />
        <div className="earth-night" />
        <div className="earth-rim" />
        <div className="earth-highlight" />
      </div>
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
      <Earth />
      <Canvas className="mission-control-canvas" camera={{ position: [0, 0, 48], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <EarthScene mobile={mobile} reduced={reduced} />
      </Canvas>
    </div>
  );
}