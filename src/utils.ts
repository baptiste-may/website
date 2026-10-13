import { useMediaQuery } from "react-responsive";

/**
 * Returns a promise that resolves after a specified delay in milliseconds.
 *
 * @param ms - The time to wait in milliseconds.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a random number between the specified minimum and maximum values.
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random number between `min` and `max`.
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random percentage value between 0% and 100% as a string.
 *
 * @returns A random percentage value as a string.
 */
export function randomPercentage() {
  return `${random(0, 100)}%`;
}

/**
 * Returns a random time in milliseconds between 500ms and 4s.
 *
 * @returns A random time in milliseconds.
 */
export function randomTime() {
  return random(500, 4000);
}

/**
 * Returns a random time in milliseconds between 1s and 5s.
 *
 * @returns A random time in milliseconds.
 */
export function randomLongTime() {
  return random(1000, 5000);
}

/**
 * Returns a random degree value between the negative and positive of the specified maximum angle.
 *
 * @param maxAngle - The maximum angle in degrees, determining the range of the random value.
 * @returns A random degree value between `-maxAngle` and `maxAngle`.
 */
export function randomDeg(maxAngle: number) {
  return random(-maxAngle, maxAngle);
}

/**
 * Generates a random identifier string.
 *
 * Relies on `crypto.getRandomValues`, which (unlike `crypto.randomUUID`) is
 * also available in insecure contexts such as a plain HTTP origin.
 *
 * @returns A random identifier string.
 */
export function randomId() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (value) =>
    value.toString(16).padStart(8, "0"),
  ).join("");
}

/**
 * Checks if the viewport is at least the specified breakpoint.
 *
 * @param breakpoint - The breakpoint to check (either "sm" or "lg").
 * @returns A boolean indicating whether the viewport is at least the specified breakpoint.
 */
export function useBreakpoint(breakpoint: "sm" | "lg") {
  return useMediaQuery({
    query: `(min-width: ${breakpoint === "sm" ? 640 : 1024}px)`,
  });
}
