import Link from "next/link";
import { getSiteNavLinks } from "@/components/siteNavLinks";
import { getMessages } from "@/messages/sr";

const navLinkClassName =
  "rounded-sm text-ivory hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

const SiteHeader = () => {
  const { name, nav } = getMessages();
  const links = getSiteNavLinks(nav);

  return (
    <header
      id="site-header"
      className="h-16 shrink-0 border-b border-hairline bg-canvas"
    >
      <div className="mx-auto flex h-full max-w-page items-center justify-between gap-gutter px-gutter">
        <Link
          href="/"
          className="font-display text-lg text-ivory hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
        >
          {name}
        </Link>
        <nav>
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none text-ivory marker:content-none [&::-webkit-details-marker]:hidden">
              {nav.menu}
            </summary>
            <ul className="absolute right-0 top-full z-50 mt-3 flex w-max flex-col gap-3 border border-hairline bg-canvas p-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={navLinkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
