import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hollywood Computer Club",
  description:
    "A minimal old-web home for the Hollywood Computer Club, a retro and hobby computing meetup in Hollywood, Florida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
