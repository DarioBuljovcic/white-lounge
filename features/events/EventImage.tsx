type EventImageProps = {
  src: string;
  alt: string;
  className?: string;
};

// Event images are SVG files. next/image would need dangerouslyAllowSVG, so a
// plain img with explicit dimensions is used instead.
const EventImage = ({ src, alt, className }: EventImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} width={640} height={360} className={className} />
);

export default EventImage;
