import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "./SmoothScrolling";

export const metadata: Metadata = {
  title: "Lumina Wellness Coach",
  description:
    "Aesthetic wellness coaching for sustainable habits, calmer days, movement, nutrition and lasting balance.",
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
      </body>
    </html>
  );
}
