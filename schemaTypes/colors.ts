import retroTheme from "daisyui/theme/retro/object.js";

export const daisyUIColors = [
  "neutral",
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
] as const;

export type DaisyUIColor = (typeof daisyUIColors)[number];

export const MISSING_COLOR = "oklch(50% 0 0)";

export const daisyUIColorValues: Record<DaisyUIColor, string> = {
  neutral: retroTheme["--color-neutral"],
  primary: retroTheme["--color-primary"],
  secondary: retroTheme["--color-secondary"],
  accent: retroTheme["--color-accent"],
  info: retroTheme["--color-info"],
  success: retroTheme["--color-success"],
  warning: retroTheme["--color-warning"],
  error: retroTheme["--color-error"],
};

export function resolveColor(color?: string): string | undefined {
  if (!color) {
    return undefined;
  }
  return Object.hasOwn(daisyUIColorValues, color)
    ? daisyUIColorValues[color as DaisyUIColor]
    : MISSING_COLOR;
}
