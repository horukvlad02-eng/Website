import type { CSSProperties, ImgHTMLAttributes } from "react";
import { IMAGE_META, type ImageName } from "@/lib/image-meta";

type Pointer = { url: string };
const pointers = import.meta.glob<Pointer>("../../assets/img/*.webp.asset.json", {
  eager: true,
  import: "default",
});

const URLS: Record<string, string> = {};
for (const [file, p] of Object.entries(pointers)) {
  const name = file.split("/").pop()!.replace(".asset.json", "");
  URLS[name] = p.url;
}

export function imageUrl(name: ImageName, width?: number) {
  const meta = IMAGE_META[name];
  const w = width
    ? (meta.widths.find((x) => x >= width) ?? meta.widths[meta.widths.length - 1])
    : meta.widths[meta.widths.length - 1];
  return URLS[`${name}-${w}.webp`];
}

/** Blurred preview built from the 16px thumbnail; the blur is baked into an SVG, rasterised once. */
const PH_CACHE: Partial<Record<ImageName, string>> = {};
function placeholder(name: ImageName) {
  const cached = PH_CACHE[name];
  if (cached) return cached;
  const m = IMAGE_META[name];
  const h = Math.round((160 * m.h) / m.w);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 ${h}'>` +
    `<filter id='b' x='0' y='0' color-interpolation-filters='sRGB'><feGaussianBlur stdDeviation='7'/>` +
    `<feComponentTransfer><feFuncA type='discrete' tableValues='1 1'/></feComponentTransfer></filter>` +
    `<image width='160' height='${h}' preserveAspectRatio='none' filter='url(#b)' href='data:image/webp;base64,${m.ph}'/></svg>`;
  const url = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
  PH_CACHE[name] = url;
  return url;
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  src: ImageName;
  /** Fill the positioned parent (absolute, full size). */
  fill?: boolean;
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Responsive photo: WebP variants from the CDN, lazy by default, intrinsic size to avoid layout shift.
 * A blurred preview shows instantly; lazy fill photos then fade in once decoded (motion engine sets
 * `data-loaded`), so nothing pops in or paints top-to-bottom.
 */
export function Img({ src, fill, priority, sizes, className, style, alt = "", ...rest }: Props) {
  const meta = IMAGE_META[src];
  const srcSet = meta.widths.map((w) => `${URLS[`${src}-${w}.webp`]} ${w}w`).join(", ");
  const cls = fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className;
  const fade = fill && !priority;
  const ph: CSSProperties = { backgroundImage: placeholder(src) };
  const img = (
    <img
      src={imageUrl(src, 960)}
      srcSet={srcSet}
      sizes={sizes ?? (fill ? "100vw" : "(min-width: 1024px) 50vw, 100vw")}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      data-fade={fade ? "" : undefined}
      className={`${cls ?? ""} img-bg`}
      style={fade ? style : { ...ph, ...style }}
      {...rest}
    />
  );
  if (!fade) return img;
  return (
    <>
      <span className="img-ph" style={ph} aria-hidden="true" />
      {img}
    </>
  );
}
