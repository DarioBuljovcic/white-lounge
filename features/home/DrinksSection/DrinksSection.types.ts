export type DrinkMedia =
  | { type: "image"; alt: string }
  | { type: "video"; src: string; poster: string };

export type DrinkStory = {
  title: string;
  body: string;
  backgroundClassName: string;
  media: DrinkMedia;
};
