import { lazy, Suspense, useEffect, useState } from "react";

const MissionControlScene = lazy(() => import("./MissionControlScene").then(({ MissionControlScene: scene }) => ({ default: scene })));

type TwinkleStar = {
  id: number;
  left: string;
  top: string;
  size: string;
  color: string;
  duration: string;
  delay: string;
};

type Meteor = {
  id: number;
  top: string;
  side: "left" | "right";
  duration: string;
};

function AmbientStars() {
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [stars, setStars] = useState<TwinkleStar[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

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
    const count = mobile ? 125 : 280;
    const colors = ["#ffffff", "#d9eaff", "#b9f6ff"];
    setStars(Array.from({ length: count }, (_, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "#ffffff",
      duration: `${2 + Math.random() * 2}s`,
      delay: `${Math.random() * -4}s`,
    })));
  }, [mobile]);

  useEffect(() => {
    if (reduced) {
      setMeteors([]);
      return;
    }

    let nextId = 0;
    let timer: number | undefined;
    const spawn = () => {
      const meteor = {
        id: nextId++,
        top: `${Math.random() * 48 - 8}%`,
        side: Math.random() > 0.5 ? "left" as const : "right" as const,
        duration: `${1 + Math.random() * 0.5}s`,
      };
      setMeteors((current) => [...current.slice(-1), meteor]);
      window.setTimeout(() => {
        setMeteors((current) => current.filter((item) => item.id !== meteor.id));
      }, 1700);
      timer = window.setTimeout(spawn, (mobile ? 4000 : 2200) + Math.random() * (mobile ? 1800 : 2200));
    };

    timer = window.setTimeout(spawn, mobile ? 2500 : 1800);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [mobile, reduced]);

  return (
    <>
      <div className="ambient-starfield" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="ambient-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: star.color,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      <div className="meteor-layer" aria-hidden="true">
        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            className={`falling-star falling-star-${meteor.side}`}
            style={{ top: meteor.top, animationDuration: meteor.duration }}
          />
        ))}
      </div>
    </>
  );
}

export function SkyBackdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return (
    <>
      <AmbientStars />
      <Suspense fallback={null}>
        <MissionControlScene />
      </Suspense>
      <div className="mission-control-dim" aria-hidden="true" />
    </>
  );
}
