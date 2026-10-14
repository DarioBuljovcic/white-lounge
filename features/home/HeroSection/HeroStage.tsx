"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from "react";

const INTRO_MS = 4000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HEADER_ID = "site-header";
const HEADER_HIDDEN_CLASS = "is-hero-intro";

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

type HeroStageProps = {
  children: ReactNode;
  skipLabel: string;
};

const HeroStage = ({ children, skipLabel }: HeroStageProps) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const [shrinkInsets, setShrinkInsets] = useState<CSSProperties | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const intro = !reducedMotion && !settled;
  const shrinking = intro && shrinkInsets !== null;
  const phase = !intro ? "settled" : shrinking ? "shrinking" : "intro";

  useEffect(() => {
    if (!intro) return;

    const header = document.getElementById(HEADER_ID);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    header?.setAttribute("inert", "");
    header?.classList.add(HEADER_HIDDEN_CLASS);

    return () => {
      document.body.style.overflow = previousOverflow;
      header?.removeAttribute("inert");
      header?.classList.remove(HEADER_HIDDEN_CLASS);
    };
  }, [intro]);

  useEffect(() => {
    if (!intro || shrinking) return;

    const timer = window.setTimeout(() => {
      const slot = slotRef.current;
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      const viewport = document.documentElement;
      setShrinkInsets({
        top: rect.top,
        left: rect.left,
        right: viewport.clientWidth - rect.right,
        bottom: viewport.clientHeight - rect.bottom,
      });
    }, INTRO_MS);

    return () => window.clearTimeout(timer);
  }, [intro, shrinking]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.propertyName === "top") {
      setSettled(true);
    }
  };

  return (
    <div
      ref={slotRef}
      className="relative h-[min(78svh,820px)] w-[min(72rem,calc(100%-2.5rem))] rounded-3xl"
    >
      <div
        className="hero-frame"
        data-phase={phase}
        style={shrinking ? (shrinkInsets ?? undefined) : undefined}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="hero-content">{children}</div>
        {intro && !shrinking ? (
          <button
            type="button"
            className="hero-skip"
            onClick={() => setSettled(true)}
          >
            {skipLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HeroStage;
