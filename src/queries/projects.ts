import { defineQuery } from "groq";

export const PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "projects"] {
    "slug": slug.current,
    title,
    description,
    "image": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    link,
    code_link,
  }
`);
