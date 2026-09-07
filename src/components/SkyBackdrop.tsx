import { MissionControlScene } from "./MissionControlScene";
import { useEffect, useState } from "react";

export function SkyBackdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return (
    <MissionControlScene />
  );
}
