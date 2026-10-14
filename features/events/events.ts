type Event = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  body: string;
};

const eventExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const eventBody = (title: string) =>
  `## ${title}

Lorem ipsum dolor sit amet, **consectetur** adipiscing elit.

[White Lounge](/)`;

const events: Event[] = [
  {
    slug: "ziva-muzika",
    title: "Živa muzika",
    excerpt: eventExcerpt,
    date: "2026-11-14",
    image: "/events/ziva-muzika.svg",
    body: eventBody("Živa muzika"),
  },
  {
    slug: "koktel-noc",
    title: "Koktel noć",
    excerpt: eventExcerpt,
    date: "2026-10-18",
    image: "/events/koktel-noc.svg",
    body: eventBody("Koktel noć"),
  },
  {
    slug: "dj-vecer",
    title: "DJ večer",
    excerpt: eventExcerpt,
    date: "2026-09-05",
    image: "/events/dj-vecer.svg",
    body: eventBody("DJ večer"),
  },
];

export const getEvents = async (): Promise<Event[]> => events;

export const getEventBySlug = async (slug: string): Promise<Event | null> =>
  events.find((event) => event.slug === slug) ?? null;
