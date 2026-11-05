
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

  title: {
    default: "Imperium Media Hub | Graphic Design & Branding Agency",
    template: "%s | Imperium Media Hub",
  },

  description:
    "Imperium Media Hub delivers professional logo design, brand identity, social media graphics, business branding, digital marketing, photo editing and graphic design training.",

  keywords: [
    "Imperium Media Hub",
    "graphic design agency",
    "logo design",
    "brand identity design",
    "business branding",
    "social media flyer design",
    "digital marketing",
    "photo editing",
    "printing and branding",
    "graphic design training",
    "promotional designs",
  ],

  applicationName: "Imperium Media Hub",

  openGraph: {
    title: "Imperium Media Hub | Authority, Dominion, Excellence and Greatness",
    description:
      "Professional graphic design, branding, digital media and creative solutions for businesses and individuals.",
    siteName: "Imperium Media Hub",
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Imperium Media Hub | Graphic Design & Branding",
    description:
      "Creative branding, graphic design and digital media solutions.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
