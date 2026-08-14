import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/Header";
import { FestiveCelebration } from "@/components/FestiveCelebration";
import { ConvexProvider } from "@/components/ConvexProvider";
import FloatingCTA from "@/components/FloatingCTA";
import { organizationStructuredData } from "./structured-data";
import { BRAND } from "@/lib/brand/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    template: `%s | ${BRAND.name}`
  },
  description: BRAND.description,
  keywords: BRAND.keywords,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: BRAND.favicon,
    shortcut: BRAND.favicon,
    apple: BRAND.favicon,
  },
  openGraph: {
    title: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    description: BRAND.description,
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    images: [{
      url: BRAND.ogImage,
      width: 512,
      height: 512,
      alt: `${BRAND.name} - Immigration Consultants Logo`
    }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    description: BRAND.description,
    images: [BRAND.ogImage],
    creator: BRAND.twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_TOKEN,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-brand={BRAND.theme}>
      <head>
        <link rel="canonical" href={BRAND.siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        <ConvexProvider>
          <Header />
          <FestiveCelebration />
          <main className="pt-24 md:pt-28 lg:pt-32">
            {children}
          </main>
          <FloatingCTA />
        </ConvexProvider>
      </body>
    </html>
  );
}
