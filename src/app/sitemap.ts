import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://may-baptiste.fr",
            lastModified: new Date(),
            priority: 1
        },
        {
            url: "https://may-baptiste.fr/legal",
            lastModified: new Date(),
            priority: 0.1
        }
    ];
}