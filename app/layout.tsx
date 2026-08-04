import type { Metadata } from "next";
import { AssetProvider } from "@/hooks/useAssets"; // src/app/fonts.ts (or wherever you centralize fonts)
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const geist = Geist({ subsets: ["latin"], variable: "--font-body" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Finn Nguyen",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-body">
        <AssetProvider>{children}</AssetProvider>
      </body>
    </html>
  );
}
