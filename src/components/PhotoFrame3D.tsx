import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type React from "react";
import { useRef } from "react";

export function PhotoFrame3D({ photoUrl }: { photoUrl: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const rotateX = useSpring(tiltX, { stiffness: 130, damping: 18, mass: 0.8 });
  const rotateY = useSpring(tiltY, { stiffness: 130, damping: 18, mass: 0.8 });
  const scrollY = useTransform(scrollYProgress, [0, 1], [52, -70]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.04, 0.98]);
  const glowX = useTransform(rotateY, [-10, 10], [18, -18]);
  const glowY = useTransform(rotateX, [-10, 10], [-14, 14]);

  function updateTilt(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -9);
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
  }

  return (
    <motion.div
      ref={frameRef}
      className="photo-frame-3d"
      aria-label="Portrait of Jatin Thakur"
      onPointerMove={updateTilt}
      onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}
      style={{ rotateX, rotateY, y: reducedMotion ? 0 : scrollY, scale: reducedMotion ? 1 : scrollScale, transformPerspective: 1000 }}
    >
      <motion.div className="photo-depth-glow" style={{ x: reducedMotion ? 0 : glowX, y: reducedMotion ? 0 : glowY }} />
      <motion.div
        className="photo-float-layer"
        animate={reducedMotion ? undefined : { y: [0, -18, 0] }}
        transition={reducedMotion ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <img src={photoUrl} alt="" className="photo-cutout" />
      </motion.div>
    </motion.div>
  );
}
