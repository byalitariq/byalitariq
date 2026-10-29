import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { personJsonLd, serviceJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/layout/mobile-cta";
import { AnalyticsListener } from "@/components/layout/analytics-listener";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full light"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([personJsonLd, serviceJsonLd]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-accent selection:text-accent-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 pb-16 outline-none sm:pb-0">
            {children}
          </main>
          <Footer />
          <MobileCta />
          <AnalyticsListener />
          <NoiseOverlay />
        </SmoothScroll>
      </body>
    </html>
  );
}
