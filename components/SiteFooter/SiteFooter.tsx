import Link from "next/link";
import { getSiteNavLinks } from "@/components/siteNavLinks";
import { getPlace } from "@/features/place/place";
import { getMessages } from "@/messages/sr";

const navLinkClassName =
  "text-muted hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

const SiteFooter = async () => {
  const place = await getPlace();
  const { nav, contact } = getMessages();
  const links = getSiteNavLinks(nav);

  return (
    <footer className="mt-auto shrink-0 border-t border-hairline bg-surface">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-gutter py-10 md:flex-row md:justify-between">
        <nav>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="flex flex-col gap-4 not-italic text-muted">
          <div>
            <span className="block text-sm text-ivory">{contact.locationLabel}</span>
            <span className="block">{place.street}</span>
            <span className="block">{place.city}</span>
          </div>
          <div>
            <span className="block text-sm text-ivory">{contact.phoneLabel}</span>
            <a
              href={`tel:${place.phone.replace(/\s/g, "")}`}
              className="hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]"
            >
              {place.phone}
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
};

export default SiteFooter;
