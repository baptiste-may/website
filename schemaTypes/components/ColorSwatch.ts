import { createElement } from "react";

export type ColorSwatchProps = { color: string; size?: number };

export function ColorSwatch({ color, size = 16 }: ColorSwatchProps) {
  return createElement("span", {
    "aria-hidden": true,
    style: {
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.15)",
      flexShrink: 0,
    },
  });
}
