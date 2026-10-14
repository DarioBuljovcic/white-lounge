import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import { getMessages } from "@/messages/sr";
import "./globals.css";

const skipLinkClassName =
  "sr-only focus:not-sr-only focus:fixed focus:left-gutter focus:top-4 focus:z-50 focus:inline-block focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:text-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = getSiteUrl();
const description =
  "Kafa, viski i kokteli danju. Muzika i žurke noću.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "White Lounge",
    template: "%s · White Lounge",
  },
  description,
  openGraph: {
    title: "White Lounge",
    description,
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { nav } = getMessages();

  return (
    <html
      lang="sr-Latn"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ivory font-sans">
        <a href="#sadrzaj" className={skipLinkClassName}>
          {nav.skip}
        </a>
        <SiteHeader />
        <main id="sadrzaj" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
