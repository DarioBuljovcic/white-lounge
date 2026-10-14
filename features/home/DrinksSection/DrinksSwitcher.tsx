"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";

import type { DrinkStory } from "./DrinksSection.types";

const SWIPE_THRESHOLD_PX = 40;

const controlClassName =
  "inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ivory bg-transparent text-ivory hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass";

type DrinksSwitcherProps = {
  stories: DrinkStory[];
  previousLabel: string;
  nextLabel: string;
};

const DrinksSwitcher = ({
  stories,
  previousLabel,
  nextLabel,
}: DrinksSwitcherProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const story = stories[activeIndex];
  if (!story) {
    return null;
  }

  const showPrevious = () =>
    setActiveIndex((index) => (index - 1 + stories.length) % stories.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % stories.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) {
      return;
    }
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
      return;
    }
    if (Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }
    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  };

  return (
    <section
      tabIndex={0}
      aria-labelledby="drink-title"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex h-svh touch-pan-y flex-col items-center justify-center gap-5 overflow-hidden px-gutter py-gutter text-ivory transition-colors duration-(--duration-drink-color) focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brass md:gap-6 ${story.backgroundClassName}`}
    >
      <div
        data-drink-media={story.media.type}
        role={story.media.type === "image" ? "img" : undefined}
        aria-label={story.media.type === "image" ? story.media.alt : undefined}
        className="aspect-[3/4] h-[46svh] max-h-[70vh] border border-hairline bg-surface md:order-2 md:h-[50svh]"
      />
      <h2
        id="drink-title"
        className="font-display text-section-title text-ivory md:order-1"
      >
        {story.title}
      </h2>
      <p className="max-w-prose text-center text-ivory md:order-3">
        {story.body}
      </p>
      <div className="flex gap-4 md:contents">
        <button
          type="button"
          onClick={showPrevious}
          aria-label={previousLabel}
          className={`${controlClassName} md:absolute md:top-1/2 md:left-gutter md:-translate-y-1/2`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-2"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label={nextLabel}
          className={`${controlClassName} md:absolute md:top-1/2 md:right-gutter md:-translate-y-1/2`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default DrinksSwitcher;
