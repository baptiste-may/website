import { defineQuery } from "groq";

export const CONTACT_LINKS_QUERY = defineQuery(/* groq */ `
  *[_type == "contact-link"] | order(orderRank asc) {
    _id,
    label,
    url,
    "iconUrl": icon.asset->url,
    border,
    background,
    orderRank
  }
`);
