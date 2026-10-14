import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { getSiteUrl } from "@/lib/seo/siteUrl";
import "./globals.css";

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
  return (
    <html
      lang="sr-Latn"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ivory font-sans">
        {children}
      </body>
    </html>
  );
}
