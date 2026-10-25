import { Button, Flex } from "@sanity/ui";
import { createElement } from "react";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";

import { MISSING_COLOR, resolveColor } from "../colors";
import { ColorSwatch } from "./ColorSwatch";

type ListOption = string | { title: string; value?: string };

export function ColorSelectInput(props: StringInputProps) {
  const { onChange, readOnly, schemaType, value } = props;
  const list: ListOption[] = schemaType.options?.list ?? [];

  if (list.length === 0) {
    return null;
  }

  return createElement(
    Flex,
    { gap: 2, wrap: "wrap", align: "center" },
    list.map((option) => {
      const label = typeof option === "string" ? option : option.title;
      const optionValue = (typeof option === "string" ? option : option.value) ?? label;
      const selected = optionValue === value;
      const color = resolveColor(optionValue) ?? MISSING_COLOR;

      return createElement(
        Button,
        {
          key: optionValue,
          type: "button",
          mode: "ghost",
          selected,
          disabled: readOnly,
          title: label,
          "aria-label": label,
          "aria-pressed": selected,
          paddingX: 2,
          paddingY: 2,
          onClick: () => {
            onChange(selected ? unset() : set(optionValue));
          },
        },
        createElement(ColorSwatch, { color, size: 20 }),
      );
    }),
  );
}
