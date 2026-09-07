import { Canvas, useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const DESKTOP_STAR_COUNT = 820;
const MOBILE_STAR_COUNT = 240;
const SHOOTING_STAR_COUNT = 4;

type StarLayerProps = {
  count: number;
  depth: [number, number];
  size: [number, number];
  opacity: [number, number];
  parallax: number;
  color: string;
  drift: number;
};

const starVertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 color;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * (72.0 / max(1.0, -viewPosition.z));
    vAlpha = aAlpha;
    vColor = color;
  }
`;

const starFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float core = 1.0 - smoothstep(0.05, 0.42, distanceFromCenter);
    float glow = 1.0 - smoothstep(0.18, 0.5, distanceFromCenter);
    if (glow <= 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha * (core * 0.8 + glow * 0.2));
  }
`;

function useResponsiveMotionMode() {
  const [mode, setMode] = useState({ mobile: false, reduced: false });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setMode({ mobile: mobileQuery.matches, reduced: reducedQuery.matches });

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

function StarLayer({
  count,
  depth,
  size,
  opacity,
  parallax,
  color,
  drift,
}: StarLayerProps) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const colorValue = new THREE.Color(color);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 22;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[index * 3 + 2] = THREE.MathUtils.lerp(depth[0], depth[1], Math.random());
      sizes[index] = THREE.MathUtils.lerp(size[0], size[1], Math.random());
      alphas[index] = THREE.MathUtils.lerp(opacity[0], opacity[1], Math.random());
      colors[index * 3] = colorValue.r;
      colors[index * 3 + 1] = colorValue.g;
      colors[index * 3 + 2] = colorValue.b;
    }

    return { positions, sizes, alphas, colors };
  }, [color, count, depth, opacity, size]);

  useFrame(({ mouse }, delta) => {
    if (!group.current) return;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      mouse.x * parallax * 0.55,
      0.025,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.y * parallax * 0.35,
      0.025,
    );
    group.current.rotation.y += delta * drift;
    group.current.rotation.x += delta * drift * 0.22;
    group.current.position.y -= delta * drift * 0.04;
    if (group.current.position.y < -0.35) group.current.position.y = 0.35;
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={points.positions} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" count={count} array={points.sizes} itemSize={1} />
          <bufferAttribute attach="attributes-aAlpha" count={count} array={points.alphas} itemSize={1} />
          <bufferAttribute attach="attributes-color" count={count} array={points.colors} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          vertexColors
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Nebula() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta * 0.08;
  });

  return (
    <mesh position={[0, 0, -12]} scale={[1.2, 1.2, 1]}>
      <planeGeometry args={[22, 14]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv - 0.5;
            float wave = sin(uv.x * 6.0 + uTime) * 0.035 + cos(uv.y * 7.0 - uTime * 0.7) * 0.035;
            float blue = exp(-length((uv + vec2(0.22, -0.08) + wave) * vec2(1.0, 1.7)) * 4.0);
            float teal = exp(-length((uv + vec2(-0.25, 0.16) - wave) * vec2(1.2, 1.5)) * 4.4);
            float purple = exp(-length((uv + vec2(0.06, 0.26)) * vec2(1.4, 1.1)) * 5.0);
            vec3 color = vec3(0.18, 0.42, 1.0) * blue + vec3(0.1, 0.9, 0.68) * teal + vec3(0.48, 0.18, 0.9) * purple;
            float alpha = min(0.17, (blue + teal + purple) * 0.08);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function ShootingStar({ index }: { index: number }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const period = 8.5 + index * 0.85;
  const offset = index * 2.45;

  useFrame(({ clock }) => {
    if (!group.current || !core.current) return;
    const phase = ((clock.getElapsedTime() + offset) % period) / period;
    const active = phase < 0.24;
    group.current.visible = active;
    if (!active) return;

    const progress = phase / 0.24;
    const eased = progress * progress * (3 - 2 * progress);
    group.current.position.set(
      THREE.MathUtils.lerp(-9, 9, eased),
      THREE.MathUtils.lerp(5.8, -4.8, eased),
      -2.5 + index * 0.4,
    );
    (core.current.material as THREE.MeshBasicMaterial).opacity = 1 - progress;
  });

  return (
    <group ref={group} visible={false}>
      <Trail width={0.16} length={7} color={index % 2 ? "#8ff4d0" : "#8eb7ff"} attenuation={(value) => value * value}>
        <mesh ref={core}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color={index % 2 ? "#c7ffef" : "#d8e5ff"} transparent opacity={1} />
        </mesh>
      </Trail>
    </group>
  );
}

function StarField({ mobile }: { mobile: boolean }) {
  const count = mobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT;

  return (
    <>
      <Nebula />
      <StarLayer count={Math.round(count * 0.42)} depth={[-20, -10]} size={[0.012, 0.04]} opacity={[0.16, 0.38]} parallax={0.18} color="#9cb7ff" drift={0.002} />
      <StarLayer count={Math.round(count * 0.38)} depth={[-10, -3]} size={[0.025, 0.08]} opacity={[0.28, 0.62]} parallax={0.45} color="#b9d2ff" drift={0.0035} />
      <StarLayer count={Math.round(count * 0.2)} depth={[-3, 2]} size={[0.05, 0.17]} opacity={[0.5, 0.95]} parallax={0.85} color="#d8fff5" drift={0.005} />
      {!mobile && Array.from({ length: SHOOTING_STAR_COUNT }, (_, index) => <ShootingStar key={index} index={index} />)}
    </>
  );
}

export function MissionControlScene() {
  const { mobile, reduced } = useResponsiveMotionMode();

  if (mobile || reduced) return null;

  return (
    <div className="mission-control-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.25]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
        <StarField mobile={mobile} />
      </Canvas>
      <div className="mission-horizon" />
    </div>
  );
}
