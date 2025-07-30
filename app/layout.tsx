import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { ConvexProvider } from "@/components/ConvexProvider";
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
  title: "Indians Abroad",
  description: "Work & Settle Abroad Without the Stress",
  icons: {
    icon: "/Logo.png?v=2",
    shortcut: "/Logo.png?v=2",
    apple: "/Logo.png?v=2",
  },
  openGraph: {
    title: "Indians Abroad",
    description: "Work & Settle Abroad Without the Stress",
    images: [{
      url: "/Logo.png",
      width: 512,
      height: 512,
      alt: "Indians Abroad Logo"
    }],
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Indians Abroad",
    description: "Work & Settle Abroad Without the Stress",
    images: ["/Logo.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
