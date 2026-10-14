import { getMessages } from "@/messages/sr";

import DrinksSwitcher from "./DrinksSwitcher";
import type { DrinkStory } from "./DrinksSection.types";

// Full class names so Tailwind can detect them at build time.
const BACKGROUND_CLASS_NAMES = [
  "bg-coffee",
  "bg-jameson",
  "bg-cocktail",
  "bg-citrus",
] as const;

const DrinksSection = () => {
  const { bands, drinks } = getMessages();

  const stories: DrinkStory[] = bands.map((title, index) => ({
    title,
    body: drinks.body,
    backgroundClassName: BACKGROUND_CLASS_NAMES[index],
    media: { type: "image", alt: title },
  }));

  return (
    <DrinksSwitcher
      stories={stories}
      previousLabel={drinks.previous}
      nextLabel={drinks.next}
    />
  );
};

export default DrinksSection;
