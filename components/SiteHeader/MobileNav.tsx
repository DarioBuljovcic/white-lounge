"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

type MobileNavProps = {
  label: string;
  children: ReactNode;
};

// The header lives in the root layout, so it survives client navigations.
// Keying the disclosure by pathname remounts it closed after route changes.
// Same-page links (e.g. /#kontakt) do not change pathname, so we also close on link activation.
const MobileNav = ({ label, children }: MobileNavProps) => {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleClick = (event: MouseEvent<HTMLDetailsElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest("a") !== null) {
      detailsRef.current?.removeAttribute("open");
    }
  };

  return (
    <details
      key={pathname}
      ref={detailsRef}
      className="relative md:hidden"
      onClick={handleClick}
    >
      <summary className="cursor-pointer list-none text-ivory marker:content-none [&::-webkit-details-marker]:hidden">
        {label}
      </summary>
      {children}
    </details>
  );
};

export default MobileNav;
