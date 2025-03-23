import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apotza",
  description: "The Automation Tool for Your Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="icon" href="/apotzalogo.jpg" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
