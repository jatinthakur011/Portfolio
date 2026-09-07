import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
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
    float hotCore = 1.0 - smoothstep(0.0, 0.23, distanceFromCenter);
    if (softDisc <= 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha * (softDisc * 0.62 + hotCore * 0.38));
  }
`;

type ParticleData = {
  positions: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  colors: Float32Array;
};

function useResponsiveMotionMode() {
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

function makeParticleData(
  count: number,
  createPosition: (index: number) => THREE.Vector3,
  sizeRange: [number, number],
  alphaRange: [number, number],
  colorAt: (position: THREE.Vector3) => THREE.Color,
): ParticleData {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const position = createPosition(index);
    const color = colorAt(position);
    positions[index * 3] = position.x;
    positions[index * 3 + 1] = position.y;
    positions[index * 3 + 2] = position.z;
    sizes[index] = THREE.MathUtils.lerp(sizeRange[0], sizeRange[1], Math.random());
    alphas[index] = THREE.MathUtils.lerp(alphaRange[0], alphaRange[1], Math.random());
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  return { positions, sizes, alphas, colors };
}

function ParticlePoints({ data }: { data: ParticleData }) {
  const count = data.sizes.length;

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={count} array={data.sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aAlpha" count={count} array={data.alphas} itemSize={1} />
        <bufferAttribute attach="attributes-aColor" count={count} array={data.colors} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Galaxy({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const count = mobile ? MOBILE_GALAXY_COUNT : DESKTOP_GALAXY_COUNT;
  const data = useMemo(
    () => makeParticleData(
      count,
      (index) => {
        const radius = Math.pow(Math.random(), 0.72) * 5.8;
        const branchAngle = (index % 5) * ((Math.PI * 2) / 5);
        const spinAngle = radius * 1.45;
        const angle = branchAngle + spinAngle;
        const armScatter = (Math.random() - 0.5) * (0.08 + radius * 0.055);
        const thickness = (Math.random() - 0.5) * (0.08 + radius * 0.045);
        return new THREE.Vector3(
          Math.cos(angle + armScatter) * radius,
          thickness,
          Math.sin(angle + armScatter) * radius * 0.58,
        );
      },
      [0.02, 0.05],
      [0.08, 0.34],
      (position) => {
        const radiusRatio = THREE.MathUtils.clamp(position.length() / 5.8, 0, 1);
        const color = new THREE.Color("#fff4cc");
        color.lerp(new THREE.Color("#806dff"), radiusRatio);
        color.lerp(new THREE.Color("#75bfff"), radiusRatio * 0.45);
        return color;
      },
    ),
    [count],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.018;
    group.current.rotation.z += delta * 0.002;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.28 + state.mouse.y * 0.035, 0.018);
  });

  return (
    <group ref={group} rotation={[0.28, -0.35, 0]} position={[0, 0.15, -2.3]}>
      <ParticlePoints data={data} />
    </group>
  );
}

function ForegroundDust({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dust = useMemo(
    () => makeParticleData(
      mobile ? Math.round(DUST_COUNT * 0.55) : DUST_COUNT,
      () => new THREE.Vector3((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 8, Math.random() * 4 - 0.5),
      [0.06, 0.16],
      [0.16, 0.55],
      () => new THREE.Color(Math.random() > 0.6 ? "#c5b5ff" : "#8fcfff"),
    ),
    [mobile],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y -= delta * 0.008;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * (mobile ? 0 : 0.18), 0.025);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.mouse.y * (mobile ? 0 : 0.12), 0.025);
  });

  return <group ref={group}><ParticlePoints data={dust} /></group>;
}

function CameraDrift({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    const parallax = mobile ? 0 : 0.16;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(time * 0.08) * 0.16 + mouse.x * parallax, 0.012);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.cos(time * 0.065) * 0.1 + mouse.y * parallax * 0.7, 0.012);
    camera.lookAt(0, 0, -2.4);
  });

  return null;
}

function GalaxyScene({ mobile }: { mobile: boolean }) {
  return (
    <>
      <color attach="background" args={["#030514"]} />
      <Galaxy mobile={mobile} />
      <ForegroundDust mobile={mobile} />
      {!mobile ? <EffectComposer><Bloom luminanceThreshold={0.24} mipmapBlur intensity={1.2} radius={0.72} /></EffectComposer> : null}
      <CameraDrift mobile={mobile} />
    </>
  );
}

export function MissionControlScene() {
  const { mobile, reduced } = useResponsiveMotionMode();

  if (reduced) return null;

  return (
    <div className="mission-control-scene" aria-hidden="true">
      <Canvas
        className="mission-control-canvas"
        camera={{ position: [0, 0.1, 8.5], fov: 53 }}
        dpr={mobile ? [1, 1] : [1, 1.35]}
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
      >
        <GalaxyScene mobile={mobile} />
      </Canvas>
    </div>
  );
}