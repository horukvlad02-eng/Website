import { clsx, type ClassValue } from "clsx";

/** Join class names (no merging: the site relies on exact class lists). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
