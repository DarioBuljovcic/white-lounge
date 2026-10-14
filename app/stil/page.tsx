import type { Metadata } from "next";
import Button from "@/components/ui/Button/Button";
import { getMessages } from "@/messages/sr";

const bandBackgrounds = ["bg-coffee", "bg-jameson", "bg-cocktail", "bg-citrus"];

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const StilPage = () => {
  const messages = getMessages();

  return (
    <div className="min-h-full bg-canvas">
      <div className="mx-auto flex w-full max-w-page flex-col gap-10 px-gutter py-16">
        <header className="flex flex-col gap-6">
          <h1 className="font-display text-name leading-none text-ivory">
            {messages.name}
          </h1>
          <p className="max-w-2xl text-muted">{messages.sentence}</p>
          <Button href="/#kontakt">{messages.contactLabel}</Button>
        </header>
      </div>
      <div className="flex flex-col">
        {messages.bands.map((label, index) => (
          <section
            key={label}
            className={`flex w-full items-center justify-center px-gutter py-16 ${bandBackgrounds[index]}`}
          >
            <h2 className="font-display text-section-title text-ivory">
              {label}
            </h2>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StilPage;
