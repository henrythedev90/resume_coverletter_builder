"use client";
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./global.css";
import useLocalStorage from "use-local-storage";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isMounted, setIsMounted] = useState(false);

  const avaliabaleThemes = ["light", "dark", "modern", "elegant", "soft"];

  useEffect(() => {
    if (!theme) {
      const themeMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(themeMode ? "dark" : "light");
    }
    setIsMounted(true);
  }, [theme]);

  if (!isMounted) {
    return (
      <html lang="en">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        data-theme={theme}
      >
        <Providers>{children}</Providers>
        <Footer
          theme={theme}
          setTheme={setTheme}
          availableThemes={avaliabaleThemes}
        />
      </body>
    </html>
  );
}
