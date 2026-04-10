import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/Header";
import { RepublicDayCelebration } from "@/components/RepublicDayCelebration";
import { ConvexProvider } from "@/components/ConvexProvider";
import FloatingCTA from "@/components/FloatingCTA";
import { organizationStructuredData } from "./structured-data";
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
  metadataBase: new URL('https://www.indiansabroad.in'),
  title: {
    default: "MYST - Immigration & Study Abroad Consultants",
    template: "%s | MYST"
  },
  description: "Expert immigration consultants helping you work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK. Get PR applications, study abroad guidance, and personalized immigration solutions with proven success.",
  keywords: ["immigration consultant", "study abroad", "visa services", "Canada PR", "Australia PR", "work visa", "student visa", "MYST immigration", "MARA agent", "RCIC consultant"],
  authors: [{ name: "MYST" }],
  creator: "MYST",
  publisher: "MYST",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/Logo.jpeg?v=3",
    shortcut: "/Logo.jpeg?v=3",
    apple: "/Logo.jpeg?v=3",
  },
  openGraph: {
    title: "MYST - Immigration & Study Abroad Consultants",
    description: "Expert immigration consultants helping you work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK.",
    url: "https://www.indiansabroad.in",
    siteName: "MYST",
    images: [{
      url: "/Logo.jpeg",
      width: 512,
      height: 512,
      alt: "MYST - Immigration Consultants Logo"
    }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MYST - Immigration & Study Abroad Consultants",
    description: "Expert immigration consultants helping you work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK.",
    images: ["/Logo.jpeg"],
    creator: "@indiansabroad"
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
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.indiansabroad.in" />
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
          <RepublicDayCelebration />
          <main className="pt-24 md:pt-28 lg:pt-32">
            {children}
          </main>
          <FloatingCTA />
        </ConvexProvider>
      </body>
    </html>
  );
}
