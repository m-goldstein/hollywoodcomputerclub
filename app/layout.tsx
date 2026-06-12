import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Hollywood Computer Club",
  description:
    "Hollywood Beach's computer hobbyist gathering.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Hollywood Computer Club",
    description: "Hollywood Beach's computer hobbyist gathering.",
    type: "website",
    siteName: "Hollywood Computer Club",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hollywood Beach's computer hobbyist gathering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hollywood Computer Club",
    description: "Hollywood Beach's computer hobbyist gathering.",
    images: [
      {
        url: "/og-image.png",
        alt: "Hollywood Beach's computer hobbyist gathering",
      },
    ],
  },
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
