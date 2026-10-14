import { getSiteUrl } from "@/lib/seo/siteUrl";

type PlaceForJsonLd = {
  name: string;
  street: string;
  city: string;
  phone: string;
  hours: string;
};

type EventForJsonLd = {
  slug: string;
  title: string;
  date: string;
};

const postalAddress = (place: PlaceForJsonLd) => ({
  "@type": "PostalAddress",
  streetAddress: place.street,
  addressLocality: place.city,
});

export const localBusinessJsonLd = (place: PlaceForJsonLd) => ({
  "@context": "https://schema.org",
  "@type": ["CafeOrCoffeeShop", "NightClub"],
  name: place.name,
  telephone: place.phone,
  address: postalAddress(place),
  openingHours: place.hours,
});

export const eventJsonLd = (event: EventForJsonLd, place: PlaceForJsonLd) => {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    url: `${siteUrl}/dogadjaji/${event.slug}`,
    location: {
      "@type": "Place",
      name: place.name,
      address: postalAddress(place),
    },
  };
};
