import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AssetProvider } from "@/hooks/useAssets";

import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <AssetProvider>{children}</AssetProvider>
      </body>
    </html>
  );
}
