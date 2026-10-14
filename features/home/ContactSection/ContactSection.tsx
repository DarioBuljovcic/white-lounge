import { getPlace } from "@/features/place/place";
import { getMessages } from "@/messages/sr";
import ContactForm from "./ContactForm";

const ContactSection = async () => {
  const place = await getPlace();
  const { contact } = getMessages();

  return (
    <section id="kontakt" className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-page px-gutter py-16">
        <ContactForm contact={contact} place={place} />
      </div>
    </section>
  );
};

export default ContactSection;
