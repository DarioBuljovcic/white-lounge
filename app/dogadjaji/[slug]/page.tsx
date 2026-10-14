import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventBody from "@/features/events/EventBody";
import EventImage from "@/features/events/EventImage";
import { getEventBySlug, getEvents } from "@/features/events/events";
import { formatEventDate } from "@/features/events/formatEventDate";
import { getPlace } from "@/features/place/place";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { eventJsonLd } from "@/lib/seo/jsonld";
import { getMessages } from "@/messages/sr";

export const generateStaticParams = async () => {
  const events = await getEvents();

  return events.map((event) => ({ slug: event.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/dogadjaji/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  return {
    title: event.title,
    description: event.excerpt,
    alternates: { canonical: `/dogadjaji/${event.slug}` },
  };
};

const DogadjajPage = async ({ params }: PageProps<"/dogadjaji/[slug]">) => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const place = await getPlace();
  const { events: eventsCopy } = getMessages();

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-gutter py-16">
      <JsonLd data={eventJsonLd(event, place)} />
      <EventImage
        src={event.image}
        alt={event.title}
        className="aspect-video w-full border border-hairline object-cover"
      />
      <header className="flex flex-col gap-2">
        <time dateTime={event.date} className="text-sm text-brass">
          {formatEventDate(event.date)}
        </time>
        <h1 className="font-display text-section-title text-ivory">
          {event.title}
        </h1>
        <p className="text-ivory">{event.excerpt}</p>
      </header>
      <EventBody source={event.body} />
      <Link
        href="/dogadjaji"
        className="self-start rounded-sm text-ivory underline underline-offset-4 hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
      >
        {eventsCopy.back}
      </Link>
    </article>
  );
};

export default DogadjajPage;
