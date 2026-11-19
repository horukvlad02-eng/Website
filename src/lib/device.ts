/** Phones and tablets (touch-first or narrow screens), where heavy page effects drop frames. */
export function isPhone() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(
      "(max-width: 1023px), (hover: none) and (pointer: coarse), (any-pointer: coarse)",
    ).matches
  );
}
