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
// 700ms shrink plus slack, in case transitionend never fires.
const SHRINK_FALLBACK_MS = 900;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HEADER_ID = "site-header";
const HERO_TITLE_ID = "hero-title";
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
  const shouldFocusTitleRef = useRef(false);
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
    const heroSection = slotRef.current?.closest("main > *");
    const coveredElements = [
      ...document.querySelectorAll("body > footer, main > *"),
    ].filter(
      (element) => element !== heroSection && !element.hasAttribute("inert"),
    );
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    header?.setAttribute("inert", "");
    header?.classList.add(HEADER_HIDDEN_CLASS);
    coveredElements.forEach((element) => element.setAttribute("inert", ""));

    return () => {
      document.body.style.overflow = previousOverflow;
      header?.removeAttribute("inert");
      header?.classList.remove(HEADER_HIDDEN_CLASS);
      coveredElements.forEach((element) => element.removeAttribute("inert"));
    };
  }, [intro]);

  useEffect(() => {
    if (!settled || !shouldFocusTitleRef.current) return;

    shouldFocusTitleRef.current = false;
    document.getElementById(HERO_TITLE_ID)?.focus();
  }, [settled]);

  useEffect(() => {
    if (!intro || shrinking) return;

    const timer = window.setTimeout(() => {
      const slot = slotRef.current;
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      const viewport = document.documentElement;
      const insets = {
        top: rect.top,
        left: rect.left,
        right: viewport.clientWidth - rect.right,
        bottom: viewport.clientHeight - rect.bottom,
      };
      const isFullscreen = Object.values(insets).every(
        (value) => Math.abs(value) < 1,
      );
      if (isFullscreen) {
        setSettled(true);
        return;
      }
      setShrinkInsets(insets);
    }, INTRO_MS);

    return () => window.clearTimeout(timer);
  }, [intro, shrinking]);

  useEffect(() => {
    if (!shrinking) return;

    const timer = window.setTimeout(
      () => setSettled(true),
      SHRINK_FALLBACK_MS,
    );

    return () => window.clearTimeout(timer);
  }, [shrinking]);

  const handleSkip = () => {
    shouldFocusTitleRef.current = true;
    setSettled(true);
  };

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
            onClick={handleSkip}
          >
            {skipLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HeroStage;
