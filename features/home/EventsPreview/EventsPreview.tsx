import Link from "next/link";
import EventImage from "@/features/events/EventImage";
import { getEvents } from "@/features/events/events";
import { formatEventDate } from "@/features/events/formatEventDate";
import { getMessages } from "@/messages/sr";

const previewCount = 3;

const EventsPreview = async () => {
  const events = (await getEvents()).slice(0, previewCount);
  const { events: eventsCopy, nav } = getMessages();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-hairline bg-canvas">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-gutter py-16">
        <h2 className="font-display text-section-title text-ivory">
          {nav.events}
        </h2>
        <ul className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
          {events.map((event) => (
            <li key={event.slug}>
              <Link
                href={`/dogadjaji/${event.slug}`}
                className="group flex gap-4 border border-hairline bg-surface p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px] md:h-full md:flex-col md:gap-0 md:p-0"
              >
                <EventImage
                  src={event.image}
                  alt={event.title}
                  className="aspect-video w-28 shrink-0 self-start object-cover md:w-full md:self-auto"
                />
                <div className="flex flex-col gap-1 md:gap-2 md:p-5">
                  <time dateTime={event.date} className="text-sm text-brass">
                    {formatEventDate(event.date)}
                  </time>
                  <h3 className="font-display text-lg text-ivory md:text-xl">
                    {event.title}
                  </h3>
                  <p className="text-muted">{event.excerpt}</p>
                  <span className="text-sm text-ivory underline-offset-4 group-hover:text-brass group-hover:underline">
                    {eventsCopy.readMore}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/dogadjaji"
          className="self-start rounded-sm text-ivory underline underline-offset-4 hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
        >
          {eventsCopy.all}
        </Link>
      </div>
    </section>
  );
};

export default EventsPreview;
