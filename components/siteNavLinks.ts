type SiteNavMessages = {
  home: string;
  menu: string;
  events: string;
  contact: string;
};

export type SiteNavLink = {
  href: string;
  label: string;
};

export const getSiteNavLinks = (nav: SiteNavMessages): SiteNavLink[] => [
  { href: "/", label: nav.home },
  { href: "/meni", label: nav.menu },
  { href: "/dogadjaji", label: nav.events },
  { href: "/#kontakt", label: nav.contact },
];
