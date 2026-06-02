import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Configure DM Sans for readable body content
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

// Configure Space Grotesk for sharp modern headers
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600", "700"],
  display: "swap",
});

// Configure JetBrains Mono for clean code labels
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codestarix — Code smarter. Build faster. Break nothing.",
  description: "Secure your access to Codestarix. Embark on a cinematic coding journey in a gamified universe designed for elite developers.",
  metadataBase: new URL("https://codestarix.vercel.app"),
  openGraph: {
    title: "Codestarix — Code smarter. Build faster. Break nothing.",
    description: "Secure your access to Codestarix. Embark on a cinematic coding journey in a gamified universe designed for elite developers.",
    url: "https://codestarix.vercel.app",
    siteName: "Codestarix",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codestarix — Futuristic Coding Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codestarix — Code smarter. Build faster. Break nothing.",
    description: "Embark on a cinematic coding journey in a gamified universe designed for elite developers.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject Organization Schema JSON-LD for rich snippet optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codestarix",
    "url": "https://codestarix.vercel.app",
    "logo": "https://codestarix.vercel.app/logo.png",
    "sameAs": [
      "https://x.com/codestarix",
      "https://linkedin.com/company/codestarix",
      "https://github.com/codestarix"
    ]
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-space-black text-starlight-white font-sans overflow-x-hidden selection:bg-pulsar-lavender/30">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
