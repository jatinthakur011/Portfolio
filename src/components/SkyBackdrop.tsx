import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

type TwinkleStar = {
  id: number;
  left: string;
  top: string;
  size: string;
  color: string;
  duration: string;
  delay: string;
  depth: "far" | "mid" | "near";
  tier: "small" | "medium" | "feature";
};

type ShootingStar = {
  id: number;
  top: string;
  left: string;
  angle: string;
  duration: string;
};

function AmbientStars() {
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [stars, setStars] = useState<TwinkleStar[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMobile(mobileQuery.matches);
      setReduced(reducedQuery.matches);
    };
    update();
    mobileQuery.addEventListener("change", update);
    reducedQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      reducedQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const count = mobile ? 100 : 210;
    const colors = ["#ffffff", "#d9eaff", "#b9f6ff"];
    setStars(Array.from({ length: count }, (_, id) => {
      const tier = id % 17 === 0 ? "feature" : Math.random() < 0.7 ? "small" : "medium";
      return {
        id,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: tier === "feature" ? `${3 + Math.random()}px` : tier === "small" ? "1px" : "2px",
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#ffffff",
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * -5}s`,
        depth: id % 3 === 0 ? "far" : id % 3 === 1 ? "mid" : "near",
        tier,
      };
    }));
  }, [mobile]);

  useEffect(() => {
    if (reduced) {
      setShootingStars([]);
      return;
    }

    let nextId = 0;
    let timer: number | undefined;
    const spawn = () => {
      const shootingStar = {
        id: nextId++,
        top: `${Math.random() * 52 - 8}%`,
        left: `${Math.random() * 82 - 12}%`,
        angle: `${Math.random() > 0.5 ? 32 : 148 + Math.random() * 18}deg`,
        duration: `${1 + Math.random() * 0.5}s`,
      };
      setShootingStars((current) => [...current.slice(-1), shootingStar]);
      window.setTimeout(() => {
        setShootingStars((current) => current.filter((item) => item.id !== shootingStar.id));
      }, 1700);
      timer = window.setTimeout(spawn, (mobile ? 5000 : 3000) + Math.random() * (mobile ? 2000 : 3000));
    };

    timer = window.setTimeout(spawn, mobile ? 5000 : 3000);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [mobile, reduced]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !backgroundRef.current) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    backgroundRef.current.style.setProperty("--mouse-x", `${x}`);
    backgroundRef.current.style.setProperty("--mouse-y", `${y}`);
  }

  useEffect(() => {
    const updateScrollDepth = () => {
      backgroundRef.current?.style.setProperty("--scroll-y", `${window.scrollY * 0.16}px`);
    };
    updateScrollDepth();
    window.addEventListener("scroll", updateScrollDepth, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDepth);
  }, []);

  return (
    <div ref={backgroundRef} className="sky-background" onPointerMove={handlePointerMove} aria-hidden="true">
      <div className="sky-glow sky-glow-left" />
      <div className="sky-glow sky-glow-right" />
      <div className="star-layer star-layer-far">
        {stars.filter((star) => star.depth === "far").map((star) => <Star key={star.id} star={star} />)}
      </div>
      <div className="star-layer star-layer-mid">
        {stars.filter((star) => star.depth === "mid").map((star) => <Star key={star.id} star={star} />)}
      </div>
      <div className="star-layer star-layer-near">
        {stars.filter((star) => star.depth === "near").map((star) => <Star key={star.id} star={star} />)}
      </div>
      <div className="shooting-star-layer">
        {shootingStars.map((star) => (
          <span key={star.id} className="shooting-star" style={{ "--star-top": star.top, "--star-left": star.left, "--star-angle": star.angle, animationDuration: star.duration } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

function Star({ star }: { star: TwinkleStar }) {
  return <span className={`ambient-star ambient-star-${star.tier}`} style={{ left: star.left, top: star.top, width: star.size, height: star.size, background: star.color, animationDuration: star.duration, animationDelay: star.delay } as CSSProperties} />;
}

export function SkyBackdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return <AmbientStars />;
}
