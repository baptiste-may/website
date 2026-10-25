import { createElement } from "react";

import { resolveColor } from "../colors";
import { ColorSwatch } from "./ColorSwatch";

export const jobsTagPreview = {
  select: { title: "label", tagColor: "color" },
  prepare: ({ title, tagColor }: { title?: string; tagColor?: string }) => {
    const color = resolveColor(tagColor);
    return {
      title,
      subtitle: tagColor,
      media: color ? createElement(ColorSwatch, { color, size: 20 }) : undefined,
    };
  },
};
