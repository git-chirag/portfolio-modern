import type { Metadata, Viewport } from "next";
import { SoundAndCursor } from "./SoundAndCursor";
import { siteConfig } from "./siteConfig";
import "./globals.css";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const metadataBase = new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.identity.name }],
  openGraph: {
    type: "website",
    title: siteConfig.seo.title,
    description: siteConfig.seo.socialDescription,
    siteName: siteConfig.identity.name,
    images: [
      {
        url: "/og.png",
        width: 1747,
        height: 909,
        alt: `${siteConfig.identity.name} | ${siteConfig.seo.socialDescription}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.socialDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf2" },
    { media: "(prefers-color-scheme: dark)", color: "#11131b" },
  ],
};

const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("chirag-theme");
    const theme = saved === "dark" || saved === "light"
      ? saved
      : ${JSON.stringify(siteConfig.appearance.defaultTheme)};
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <SoundAndCursor />
      </body>
    </html>
  );
}
