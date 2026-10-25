import { defineField } from "sanity";

import { daisyUIColors } from "./colors";
import { ColorSelectInput } from "./components/ColorSelectInput";

export const daisyUIColorsField = defineField({
  name: "color",
  title: "Color",
  type: "string",
  options: { list: daisyUIColors.map((color) => ({ title: color, value: color })) },
  components: { input: ColorSelectInput },
});
