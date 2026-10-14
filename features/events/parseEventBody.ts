export type InlineSegment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "link"; href: string; label: string };

export type EventBodyBlock =
  | { type: "paragraph"; children: InlineSegment[] }
  | { type: "heading"; level: 1 | 2 | 3; children: InlineSegment[] };

const inlinePattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]*)\)/g;
const headingPattern = /^(#{1,3})\s+(.+)$/;
const headingLevels = { "#": 1, "##": 2, "###": 3 } as const;

const isAllowedUrl = (url: string) => {
  if (url.startsWith("/")) {
    return !url.startsWith("//") && !url.startsWith("/\\");
  }

  return /^https?:\/\/[^\s]+$/i.test(url);
};

const pushText = (segments: InlineSegment[], text: string) => {
  if (text === "") {
    return;
  }

  const last = segments[segments.length - 1];

  if (last?.type === "text") {
    last.text += text;
    return;
  }

  segments.push({ type: "text", text });
};

const parseInline = (source: string): InlineSegment[] => {
  const segments: InlineSegment[] = [];
  let cursor = 0;

  for (const match of source.matchAll(inlinePattern)) {
    const [raw, boldText, label, url] = match;

    pushText(segments, source.slice(cursor, match.index));
    cursor = match.index + raw.length;

    if (boldText !== undefined) {
      segments.push({ type: "bold", text: boldText });
    } else if (isAllowedUrl(url)) {
      segments.push({ type: "link", href: url, label });
    } else {
      pushText(segments, raw);
    }
  }

  pushText(segments, source.slice(cursor));

  return segments;
};

export const parseEventBody = (source: string): EventBodyBlock[] => {
  const blocks: EventBodyBlock[] = [];
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        children: parseInline(paragraphLines.join(" ")),
      });
      paragraphLines = [];
    }
  };

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      continue;
    }

    const heading = headingPattern.exec(line);
    const level = heading
      ? headingLevels[heading[1] as keyof typeof headingLevels]
      : undefined;

    if (heading && level) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level,
        children: parseInline(heading[2]),
      });
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph();

  return blocks;
};
