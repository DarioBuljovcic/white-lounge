import type { Metadata } from "next";
import Link from "next/link";
import EventImage from "@/features/events/EventImage";
import { getEvents } from "@/features/events/events";
import { formatEventDate } from "@/features/events/formatEventDate";
import { getMessages } from "@/messages/sr";

const { nav } = getMessages();

export const metadata: Metadata = {
  title: nav.events,
  alternates: { canonical: "/dogadjaji" },
};

const DogadjajiPage = async () => {
  const events = await getEvents();
  const { events: eventsCopy } = getMessages();

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-gutter py-16">
      <h1 className="font-display text-section-title text-ivory">
        {nav.events}
      </h1>
      {events.length === 0 ? (
        <p className="text-muted">{eventsCopy.empty}</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {events.map((event) => (
            <li key={event.slug}>
              <article className="flex flex-col gap-4 border border-hairline bg-surface p-3 sm:flex-row sm:items-center sm:gap-6">
                <EventImage
                  src={event.image}
                  alt={event.title}
                  className="aspect-video w-full object-cover sm:w-64 sm:shrink-0"
                />
                <div className="flex flex-col gap-2 sm:p-2">
                  <time dateTime={event.date} className="text-sm text-brass">
                    {formatEventDate(event.date)}
                  </time>
                  <h2 className="font-display text-2xl text-ivory">
                    {event.title}
                  </h2>
                  <p className="text-muted">{event.excerpt}</p>
                  <Link
                    href={`/dogadjaji/${event.slug}`}
                    className="self-start rounded-sm text-ivory underline underline-offset-4 hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
                  >
                    {eventsCopy.readMore}
                    <span className="sr-only"> — {event.title}</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DogadjajiPage;
