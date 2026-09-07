import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const DESKTOP_GALAXY_COUNT = 12_000;
const MOBILE_GALAXY_COUNT = 2_600;
const DUST_COUNT = 420;

const particleVertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (92.0 / max(1.0, -viewPosition.z));
    vAlpha = aAlpha;
    vColor = aColor;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float softDisc = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
    if (softDisc <= 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha * softDisc);
  }
`;

type ParticleData = {
  positions: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  colors: Float32Array;
};

function useMotionMode() {
  const [mode, setMode] = useState({ mobile: false, reduced: false });
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode({ mobile: mobile.matches, reduced: reduced.matches });
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => { mobile.removeEventListener("change", update); reduced.removeEventListener("change", update); };
  }, []);
  return mode;
}

function createParticles(count: number, positionAt: (index: number) => THREE.Vector3, colorAt: (position: THREE.Vector3) => THREE.Color, size: [number, number], alpha: [number, number]): ParticleData {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const position = positionAt(index);
    const color = colorAt(position);
    positions.set([position.x, position.y, position.z], index * 3);
    sizes[index] = THREE.MathUtils.lerp(size[0], size[1], Math.random());
    alphas[index] = THREE.MathUtils.lerp(alpha[0], alpha[1], Math.random());
    colors.set([color.r, color.g, color.b], index * 3);
  }
  return { positions, sizes, alphas, colors };
}

function Points({ data }: { data: ParticleData }) {
  const count = data.sizes.length;
  return <points frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" count={count} array={data.positions} itemSize={3} />
      <bufferAttribute attach="attributes-aSize" count={count} array={data.sizes} itemSize={1} />
      <bufferAttribute attach="attributes-aAlpha" count={count} array={data.alphas} itemSize={1} />
      <bufferAttribute attach="attributes-aColor" count={count} array={data.colors} itemSize={3} />
    </bufferGeometry>
    <shaderMaterial vertexShader={particleVertexShader} fragmentShader={particleFragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
  </points>;
}

function Galaxy({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const count = mobile ? MOBILE_GALAXY_COUNT : DESKTOP_GALAXY_COUNT;
  const data = useMemo(() => createParticles(count, (index) => {
    const radius = Math.pow(Math.random(), 0.72) * 5.8;
    const branchAngle = (index % 5) * ((Math.PI * 2) / 5);
    const angle = branchAngle + radius * 1.45 + (Math.random() - 0.5) * (0.08 + radius * 0.055);
    return new THREE.Vector3(Math.cos(angle) * radius, (Math.random() - 0.5) * (0.08 + radius * 0.045), Math.sin(angle) * radius * 0.58);
  }, (position) => {
    const ratio = THREE.MathUtils.clamp(position.length() / 5.8, 0, 1);
    return new THREE.Color("#fff4cc").lerp(new THREE.Color("#806dff"), ratio).lerp(new THREE.Color("#75bfff"), ratio * 0.45);
  }, [0.02, 0.05], [0.08, 0.34]), [count]);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.018;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.28 + state.mouse.y * 0.035, 0.018);
  });
  return <group ref={group} rotation={[0.28, -0.35, 0]} position={[0, 0.15, -2.3]}><Points data={data} /></group>;
}

function Dust({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const data = useMemo(() => createParticles(mobile ? 230 : DUST_COUNT, () => new THREE.Vector3((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 8, Math.random() * 4 - 0.5), () => new THREE.Color(Math.random() > 0.6 ? "#c5b5ff" : "#8fcfff"), [0.06, 0.16], [0.16, 0.55]), [mobile]);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.008;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * (mobile ? 0 : 0.18), 0.025);
  });
  return <group ref={group}><Points data={data} /></group>;
}

function CameraDrift({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();
  useFrame(({ clock, mouse }) => {
    const drift = mobile ? 0 : 0.16;
    const time = clock.getElapsedTime();
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(time * 0.08) * 0.16 + mouse.x * drift, 0.012);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.cos(time * 0.065) * 0.1 + mouse.y * drift * 0.7, 0.012);
    camera.lookAt(0, 0, -2.4);
  });
  return null;
}

export function MissionControlScene() {
  const { mobile, reduced } = useMotionMode();
  if (reduced) return null;
  return <div className="mission-control-scene" aria-hidden="true">
    <Canvas className="mission-control-canvas" camera={{ position: [0, 0.1, 8.5], fov: 53 }} dpr={mobile ? [1, 1] : [1, 1.35]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
      <color attach="background" args={["#030514"]} />
      <Galaxy mobile={mobile} />
      <Dust mobile={mobile} />
      <CameraDrift mobile={mobile} />
    </Canvas>
  </div>;
}