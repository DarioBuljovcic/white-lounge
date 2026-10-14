import { getPlace } from "@/features/place/place";
import { getMessages } from "@/messages/sr";

const PlaceSection = async () => {
  const place = await getPlace();
  const { place: placeCopy, contact } = getMessages();

  return (
    <section className="border-t border-hairline bg-surface">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-gutter py-16">
        <h2 className="font-display text-section-title text-ivory">
          {placeCopy.title}
        </h2>
        <p className="text-ivory">{placeCopy.day}</p>
        <p className="text-ivory">{placeCopy.night}</p>
        <div>
          <span className="block text-sm text-ivory">{contact.hoursLabel}</span>
          <span className="text-muted">{place.hours}</span>
        </div>
        <p className="text-muted">{placeCopy.body}</p>
      </div>
    </section>
  );
};

export default PlaceSection;
