import type { Metadata, Viewport } from "next";
import { SoundAndCursor } from "./SoundAndCursor";
import "./globals.css";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const metadataBase = new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "Chirag Aparadh | Software Engineer",
  description:
    "Software engineer building reliable backend, distributed, and AI-powered systems. M.S. Computer Science student at UMass Amherst.",
  keywords: [
    "Chirag Aparadh",
    "Software Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Applied AI",
    "UMass Amherst",
  ],
  authors: [{ name: "Chirag Aparadh" }],
  openGraph: {
    type: "website",
    title: "Chirag Aparadh | Software Engineer",
    description: "I build the systems behind the screen.",
    siteName: "Chirag Aparadh",
    images: [
      {
        url: "/og.png",
        width: 1747,
        height: 909,
        alt: "Chirag Aparadh | I build the systems behind the screen.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Aparadh | Software Engineer",
    description: "I build the systems behind the screen.",
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
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
