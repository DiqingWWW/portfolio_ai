import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Diqing Wu — Product Designer + AI Builder",
    template: "%s | Diqing Wu",
  },
  description:
    "Portfolio of Diqing Wu — Product Designer & System Developer specialising in HMI, spatial UI, design systems, and AI-native interfaces.",
  keywords: [
    "product designer",
    "HMI",
    "design system",
    "AI",
    "spatial UI",
    "portfolio",
    "Diqing Wu",
    "React",
    "Next.js",
    "automotive HUD",
    "generative UI",
  ],
  authors: [{ name: "Diqing Wu" }],
  creator: "Diqing Wu",
  publisher: "Diqing Wu",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diqingwu.com",
    siteName: "Diqing Wu",
    title: "Diqing Wu — Product Designer + AI Builder",
    description:
      "Portfolio of Diqing Wu — Product Designer & System Developer specialising in HMI, spatial UI, design systems, and AI-native interfaces.",
    images: [
      {
        url: "/assets/images/orbit-spatial-os/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Diqing Wu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diqing Wu — Product Designer + AI Builder",
    description:
      "Portfolio of Diqing Wu — Product Designer & System Developer.",
    images: ["/assets/images/orbit-spatial-os/cover.jpg"],
  },
  metadataBase: new URL("https://diqingwu.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FAF7F2" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
