import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "./SmoothScrolling";
import WhatsAppButton from "./WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellnessmate-nine.vercel.app"),
  title: {
    default: "Lumina Wellness Coach | Sustainable Habits & Balance",
    template: "%s | Lumina Wellness Coach",
  },
  description:
    "Aesthetic wellness coaching for sustainable habits, calmer days, movement, nutrition and lasting balance. Transform your lifestyle with Lumina.",
  keywords: [
    "Wellness Coach",
    "Sustainable Habits",
    "Nutrition Coaching",
    "Movement Coaching",
    "Mindfulness",
    "Lumina Wellness",
    "Health and Wellness",
  ],
  authors: [{ name: "Lumina Wellness" }],
  creator: "Lumina Wellness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wellnessmate-nine.vercel.app",
    title: "Lumina Wellness Coach | Sustainable Habits & Balance",
    description:
      "Aesthetic wellness coaching for sustainable habits, calmer days, movement, nutrition and lasting balance.",
    siteName: "Lumina Wellness Coach",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Wellness Coach | Sustainable Habits & Balance",
    description:
      "Aesthetic wellness coaching for sustainable habits, calmer days, movement, nutrition and lasting balance.",
    creator: "@luminawellness",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </SmoothScrolling>
        <WhatsAppButton />
      </body>
    </html>
  );
}
