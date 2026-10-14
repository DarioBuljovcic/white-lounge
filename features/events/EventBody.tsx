import Link from "next/link";
import {
  parseEventBody,
  type EventBodyBlock,
  type InlineSegment,
} from "@/features/events/parseEventBody";

type EventBodyProps = {
  source: string;
};

const headingClassName = "font-display text-ivory";

const Segment = ({ segment }: { segment: InlineSegment }) => {
  if (segment.type === "bold") {
    return <strong className="font-semibold text-ivory">{segment.text}</strong>;
  }

  if (segment.type === "link") {
    const className =
      "text-brass underline underline-offset-4 hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

    if (segment.href.startsWith("/")) {
      return (
        <Link href={segment.href} className={className}>
          {segment.label}
        </Link>
      );
    }

    return (
      <a
        href={segment.href}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {segment.label}
      </a>
    );
  }

  return segment.text;
};

const Inline = ({ segments }: { segments: InlineSegment[] }) =>
  segments.map((segment, index) => <Segment key={index} segment={segment} />);

// The page title is the h1, so body headings start at h2.
const Block = ({ block }: { block: EventBodyBlock }) => {
  if (block.type === "paragraph") {
    return (
      <p className="text-muted">
        <Inline segments={block.children} />
      </p>
    );
  }

  if (block.level === 1) {
    return (
      <h2 className={`${headingClassName} text-2xl`}>
        <Inline segments={block.children} />
      </h2>
    );
  }

  if (block.level === 2) {
    return (
      <h3 className={`${headingClassName} text-xl`}>
        <Inline segments={block.children} />
      </h3>
    );
  }

  return (
    <h4 className={`${headingClassName} text-lg`}>
      <Inline segments={block.children} />
    </h4>
  );
};

const EventBody = ({ source }: EventBodyProps) => (
  <div className="flex flex-col gap-4">
    {parseEventBody(source).map((block, index) => (
      <Block key={index} block={block} />
    ))}
  </div>
);

export default EventBody;
