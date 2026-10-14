import assert from "node:assert/strict";
import { test } from "node:test";
import { parseEventBody } from "./parseEventBody.ts";

test("splits paragraphs on a blank line", () => {
  assert.deepEqual(parseEventBody("Prvi red.\n\nDrugi red."), [
    { type: "paragraph", children: [{ type: "text", text: "Prvi red." }] },
    { type: "paragraph", children: [{ type: "text", text: "Drugi red." }] },
  ]);
});

test("joins consecutive lines into one paragraph", () => {
  assert.deepEqual(parseEventBody("Prvi red.\nNastavak."), [
    {
      type: "paragraph",
      children: [{ type: "text", text: "Prvi red. Nastavak." }],
    },
  ]);
});

test("parses #, ## and ### headings", () => {
  assert.deepEqual(parseEventBody("# Jedan\n\n## Dva\n\n### Tri"), [
    { type: "heading", level: 1, children: [{ type: "text", text: "Jedan" }] },
    { type: "heading", level: 2, children: [{ type: "text", text: "Dva" }] },
    { type: "heading", level: 3, children: [{ type: "text", text: "Tri" }] },
  ]);
});

test("a heading directly followed by a line starts a new paragraph", () => {
  assert.deepEqual(parseEventBody("## Naslov\nTekst"), [
    {
      type: "heading",
      level: 2,
      children: [{ type: "text", text: "Naslov" }],
    },
    { type: "paragraph", children: [{ type: "text", text: "Tekst" }] },
  ]);
});

test("headings deeper than ### stay plain text", () => {
  assert.deepEqual(parseEventBody("#### Duboko"), [
    {
      type: "paragraph",
      children: [{ type: "text", text: "#### Duboko" }],
    },
  ]);
});

test("**bold** becomes a bold segment without asterisks", () => {
  assert.deepEqual(parseEventBody("Ovo je **važno** zaista."), [
    {
      type: "paragraph",
      children: [
        { type: "text", text: "Ovo je " },
        { type: "bold", text: "važno" },
        { type: "text", text: " zaista." },
      ],
    },
  ]);
});

test("bold works inside headings", () => {
  assert.deepEqual(parseEventBody("## Veče **uživo**"), [
    {
      type: "heading",
      level: 2,
      children: [
        { type: "text", text: "Veče " },
        { type: "bold", text: "uživo" },
      ],
    },
  ]);
});

test("an unclosed ** stays text", () => {
  assert.deepEqual(parseEventBody("Pola **bold"), [
    { type: "paragraph", children: [{ type: "text", text: "Pola **bold" }] },
  ]);
});

test("a same-site path link is allowed", () => {
  assert.deepEqual(parseEventBody("[White Lounge](/)"), [
    {
      type: "paragraph",
      children: [{ type: "link", href: "/", label: "White Lounge" }],
    },
  ]);
});

test("an https link is allowed", () => {
  assert.deepEqual(parseEventBody("[Sajt](https://example.com)"), [
    {
      type: "paragraph",
      children: [{ type: "link", href: "https://example.com", label: "Sajt" }],
    },
  ]);
});

test("an http link is allowed", () => {
  assert.deepEqual(parseEventBody("[Sajt](http://example.com/a)"), [
    {
      type: "paragraph",
      children: [
        { type: "link", href: "http://example.com/a", label: "Sajt" },
      ],
    },
  ]);
});

test("a javascript: URL is not a link", () => {
  const blocks = parseEventBody("[klik](javascript:alert(1))");
  const segments = blocks.flatMap((block) => block.children);

  assert.equal(
    segments.some((segment) => segment.type === "link"),
    false,
  );
  assert.match(
    segments.map((segment) => ("text" in segment ? segment.text : "")).join(""),
    /javascript:alert\(1\)/,
  );
});

test("protocol-relative and backslash paths are not links", () => {
  for (const source of ["[x](//evil.example)", "[x](/\\evil.example)"]) {
    const segments = parseEventBody(source).flatMap((block) => block.children);

    assert.equal(
      segments.some((segment) => segment.type === "link"),
      false,
      source,
    );
  }
});

test("data:, mailto: and relative URLs are not links", () => {
  for (const source of [
    "[x](data:text/html,hi)",
    "[x](mailto:a@b.rs)",
    "[x](strana)",
  ]) {
    const segments = parseEventBody(source).flatMap((block) => block.children);

    assert.equal(
      segments.some((segment) => segment.type === "link"),
      false,
      source,
    );
  }
});

test("a raw <script> tag is text, not an element", () => {
  assert.deepEqual(parseEventBody("<script>alert(1)</script> & više > manje"), [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "<script>alert(1)</script> & više > manje",
        },
      ],
    },
  ]);
});

test("empty source gives no blocks", () => {
  assert.deepEqual(parseEventBody(""), []);
  assert.deepEqual(parseEventBody("\n\n  \n"), []);
});
