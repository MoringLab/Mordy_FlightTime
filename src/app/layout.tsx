import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    default: "Gateway - Mordy ",
    template: "%s | Gateway - Mordy",
  },
  description: "비행 시간 동안 집중해보세요. Gateway는 목표 달성을 위한 집중 타이머와 커뮤니티 기능을 제공합니다.",
  manifest: "/manifest.json",
  applicationName: "Gateway",
  keywords: ["집중", "타이머", "공부", "생산성", "커뮤니티", "목표달성", "study", "community", "lifestyle", "communication", "mordy", "gateway", "flight", "target", "book", "focus", "productivity"],
  authors: [{ name: "Mordy" }],
  creator: "Mordy",
  publisher: "Mordy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "Gateway - Mordy",
    description: "비행 시간 동안 집중해보세요. Gateway는 목표 달성을 위한 집중 타이머와 커뮤니티 기능을 제공합니다.",
    siteName: "Gateway",
    images: [
      {
        url: "/icons/icon-310x310.png",
        width: 310,
        height: 310,
        alt: "Gateway - Mordy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gateway - Mordy",
    description: "비행 시간 동안 집중해보세요.",
    images: ["/icons/icon-310x310.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mordy Gateway",
  },
  formatDetection: {
    telephone: false,
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
  verification: {
    // google: "your-google-verification-code",
    // other: {
    //   "naver-site-verification": "your-naver-verification-code",
    // },
  },
};

export const viewport: Viewport = {
  themeColor: "#6200EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" dir="ltr">
      <head>
        <link rel="icon" href="/icons/icon-310x310.png" />
        <link rel="apple-touch-icon" href="/icons/icon-310x310.png" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="South Korea" />
        <link rel="alternate" hrefLang="ko" href="/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-62YDW6D8ZM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-62YDW6D8ZM');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
