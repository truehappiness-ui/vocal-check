import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "True Happiness Vocal Check | AIボーカル診断",
  description:
    "あなたの歌の現在地を知ろう。AI技術を活用したボーカル診断システム。一宮光輝監修。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
