"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type MobileNavProps = {
  label: string;
  children: ReactNode;
};

// The header lives in the root layout, so it survives client navigations.
// Keying the disclosure by pathname remounts it closed after each navigation.
const MobileNav = ({ label, children }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <details key={pathname} className="relative md:hidden">
      <summary className="cursor-pointer list-none text-ivory marker:content-none [&::-webkit-details-marker]:hidden">
        {label}
      </summary>
      {children}
    </details>
  );
};

export default MobileNav;
