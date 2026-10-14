import Button from "@/components/ui/Button/Button";
import { getMessages } from "@/messages/sr";
import HeroStage from "./HeroStage";

const HeroSection = () => {
  const { name, sentence, contactLabel, hero } = getMessages();

  return (
    <section className="flex h-svh shrink-0 items-center justify-center">
      <HeroStage skipLabel={hero.skip}>
        <h1 className="font-display text-name leading-none text-ivory">
          {name}
        </h1>
        <p className="max-w-xl text-muted">{sentence}</p>
        <Button href="/#kontakt">{contactLabel}</Button>
      </HeroStage>
    </section>
  );
};

export default HeroSection;
