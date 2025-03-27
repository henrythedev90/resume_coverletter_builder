// import type { Metadata } from "next";
"use client";
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { Metadata } from "next";
import "./global.css";
import useLocalStorage from "use-local-storage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isMounted, setIsMounted] = useState(false);

  const avaliabaleThemes = ["light", "dark", "modern", "elegant", "soft"];

  useEffect(() => {
    const themeMode = window.matchMedia("(prefers-color-scheme: dark").matches;
    if (!theme) {
      setTheme(themeMode ? "dark" : "light");
    }
    setIsMounted(true);
  }, [theme, setTheme]);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        data-theme={theme}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
