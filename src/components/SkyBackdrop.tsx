import { useEffect, useRef } from "react";

export function SkyBackdrop() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const updateParallax = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      background.style.setProperty("--mx", `${x.toFixed(3)}`);
      background.style.setProperty("--my", `${y.toFixed(3)}`);
    };

    window.addEventListener("pointermove", updateParallax, { passive: true });
    return () => window.removeEventListener("pointermove", updateParallax);
  }, []);

  return (
    <div ref={backgroundRef} className="mesh-background" aria-hidden="true">
      <span className="mesh-orb mesh-orb-blue" />
      <span className="mesh-orb mesh-orb-teal" />
      <span className="mesh-orb mesh-orb-purple" />
      <span className="mesh-orb mesh-orb-cyan" />
      <span className="mesh-orb mesh-orb-indigo" />
    </div>
  );
}
