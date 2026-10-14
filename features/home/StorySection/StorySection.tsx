import { getMessages } from "@/messages/sr";

const frameClassName =
  "aspect-[4/5] w-full border border-hairline bg-surface";

type StoryFrameProps = {
  alt: string;
  className?: string;
};

const StoryFrame = ({ alt, className }: StoryFrameProps) => (
  <div
    role="img"
    aria-label={alt}
    className={className ? `${frameClassName} ${className}` : frameClassName}
  />
);

const StorySection = () => {
  const { story } = getMessages();

  return (
    <section className="border-t border-hairline bg-canvas">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-gutter py-16 md:grid md:grid-cols-2 md:items-center md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6">
          <StoryFrame alt={story.imageAlt1} />
          <StoryFrame
            alt={story.imageAlt2}
            className="hidden md:block"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-section-title text-ivory">
            {story.title}
          </h2>
          <p className="text-muted">{story.body}</p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
