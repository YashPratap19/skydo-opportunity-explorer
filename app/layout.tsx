import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://indianglobalsellers.com"),
  title: "Indian Global Sellers | Amazon Export Insights",
  description: "Discover high-potential Amazon export product opportunities with data-driven market intelligence. Built for Indian sellers scaling globally.",
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Indian Global Sellers | Amazon Export Insights",
    description: "Discover high-potential Amazon export product opportunities with data-driven market intelligence. Built for Indian sellers scaling globally.",
    type: "website",
    locale: "en_US",
    siteName: "Indian Global Sellers",
    images: [{ url: "/logo.png", width: 660, height: 471, alt: "Indian Global Sellers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Global Sellers | Amazon Export Insights",
    description: "Discover high-potential Amazon export product opportunities with data-driven market intelligence.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50 text-slate-900 selection:bg-blue-500/30`}
      >
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        {children}
      </body>
    </html>
  );
}
