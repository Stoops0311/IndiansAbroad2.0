import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { ConvexProvider } from "@/components/ConvexProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.indiansabroad.in'),
  title: {
    default: "Indians Abroad - Expert Immigration & Study Abroad Consultants | Visa Services for Canada, Australia, USA, Germany & UK",
    template: "%s | Indians Abroad - Immigration Consultants"
  },
  description: "Indians Abroad offers expert immigration consulting services to help you work and settle abroad with ease. We provide comprehensive visa services, study abroad guidance, permanent residency applications for Canada, Australia, USA, Germany, and UK. Our MARA and RCIC certified consultants ensure stress-free immigration with personalized solutions, university partnerships, and proven success stories from thousands of satisfied clients worldwide.",
  keywords: ["immigration consultant", "study abroad", "visa services", "Canada PR", "Australia PR", "work visa", "student visa", "Indians abroad", "MARA agent", "RCIC consultant"],
  authors: [{ name: "Indians Abroad" }],
  creator: "Indians Abroad",
  publisher: "Indians Abroad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/Logo.png?v=2",
    shortcut: "/Logo.png?v=2",
    apple: "/Logo.png?v=2",
  },
  openGraph: {
    title: "Indians Abroad - Expert Immigration & Study Abroad Consultants | Visa Services for Canada, Australia, USA, Germany & UK",
    description: "Indians Abroad offers expert immigration consulting services to help you work and settle abroad with ease. We provide comprehensive visa services, study abroad guidance, permanent residency applications for Canada, Australia, USA, Germany, and UK.",
    url: "https://www.indiansabroad.in",
    siteName: "Indians Abroad",
    images: [{
      url: "/Logo.png",
      width: 512,
      height: 512,
      alt: "Indians Abroad - Immigration Consultants Logo"
    }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Indians Abroad - Expert Immigration & Study Abroad Consultants",
    description: "Indians Abroad offers expert immigration consulting services to help you work and settle abroad with ease. Comprehensive visa services, study abroad guidance, and PR applications for Canada, Australia, USA, Germany & UK.",
    images: ["/Logo.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProvider>
          <Header />
          <main className="pt-24 md:pt-28 lg:pt-32">
            {children}
          </main>
        </ConvexProvider>
      </body>
    </html>
  );
}
