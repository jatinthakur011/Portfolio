export function PhotoFrame3D({ photoUrl }: { photoUrl: string }) {
  return (
    <div className="photo-frame-3d" aria-label="Portrait of Jatin Thakur">
      <img src={photoUrl} alt="" className="photo-cutout" />
    </div>
  );
}
