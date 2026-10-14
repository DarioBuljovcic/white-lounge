import type { MetadataRoute } from "next";
import { getEvents } from "@/features/events/events";
import { getSiteUrl } from "@/lib/seo/siteUrl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const events = await getEvents();

  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/meni` },
    { url: `${siteUrl}/dogadjaji` },
    ...events.map((event) => ({
      url: `${siteUrl}/dogadjaji/${event.slug}`,
    })),
  ];
}
