import { defineQuery } from "groq";

export const JOBS_QUERY = defineQuery(/* groq */ `
  *[_type == "jobs"] | order(orderRank asc) {
    title,
    description,
    start_date,
    end_date,
    tag-> {
      label,
      color,
    }
  }
`);
