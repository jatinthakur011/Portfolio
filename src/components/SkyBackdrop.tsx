import { MissionControlScene } from "./MissionControlScene";

export function SkyBackdrop() {
  return (
    <>
      <MissionControlScene />
      <div className="sky-field-fallback" aria-hidden="true" />
    </>
  );
}
