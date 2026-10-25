import { parseToRgba, readableColor } from "color2k";

import type { CONTACT_LINKS_QUERY_RESULT } from "@/types/sanity-typegen";

type ContactLink = CONTACT_LINKS_QUERY_RESULT[number];

const colorHex = (color: ContactLink["border"], fallback: string) => color?.hex ?? fallback;

const isColor = (value: string) => {
  try {
    parseToRgba(value);
    return true;
  } catch {
    return false;
  }
};

const textColor = (link: ContactLink) => {
  const background = colorHex(link.background, "var(--color-base-100)");

  return isColor(background) ? readableColor(background) : "var(--color-base-content)";
};

export const maskStyle = (maskImage: string) =>
  [
    `mask-image: ${maskImage}`,
    `-webkit-mask-image: ${maskImage}`,
    "mask-repeat: no-repeat",
    "-webkit-mask-repeat: no-repeat",
    "mask-position: center",
    "-webkit-mask-position: center",
    "mask-size: contain",
    "-webkit-mask-size: contain",
    "background-color: currentColor",
  ].join("; ");

export const linkStyle = (link: ContactLink) =>
  [
    `border-color: ${colorHex(link.border, "var(--color-base-300)")}`,
    `background-color: ${colorHex(link.background, "var(--color-base-100)")}`,
    `color: ${textColor(link)}`,
  ].join("; ");
