import { useEffect, useMemo, useState } from "react";
import { MissionControlScene } from "./MissionControlScene";

type Star = { left: string; top: string; size: string; delay: string };
type Meteor = { left: string; delay: string; duration: string };

/**
 * Fixed night-sky backdrop: twinkling starfield, falling meteors and the
 * glowing earth curve at the bottom of the page.
 */
export function SkyBackdrop() {
  // Random positions are generated client-side only, to avoid SSR mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    const updateParallax = () => {
      document.documentElement.style.setProperty(
        "--sky-scroll",
        `${Math.min(window.scrollY * 0.045, 32)}px`,
      );
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 110 }, () => {
        const size = Math.random() * 1.6 + 0.6;
        return {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          size: `${size}px`,
          delay: `${Math.random() * 4}s`,
        };
      }),
    [],
  );

  const meteors = useMemo<Meteor[]>(
    () =>
      Array.from({ length: 3 }, () => ({
        left: `${Math.random() * 90 - 10}vw`,
        delay: `${Math.random() * 7 + 8}s`,
        duration: `${Math.random() * 1.5 + 2.8}s`,
      })),
    [],
  );

  return (
    <>
      <MissionControlScene />
      <div className="sky-field sky-field-fallback" aria-hidden="true">
        <div className="sky-parallax-layer absolute inset-0">
          {mounted && stars.map((star, i) => (
            <span
              key={`star-${i}`}
              className="star-dot"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0">
          {mounted && meteors.map((meteor, i) => (
            <span
              key={`meteor-${i}`}
              className="meteor-streak"
              style={{
                left: meteor.left,
                animationDelay: meteor.delay,
                animationDuration: meteor.duration,
              }}
            />
          ))}
        </div>
      </div>
      <div className="earth-glow" aria-hidden="true" />
    </>
  );
}
