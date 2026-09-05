import type { Metadata } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraVerify | Intelligent Land Record Digitization",
  description: "AI-powered platform to automatically extract, digitize, and validate legacy land records.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hankenGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </head>
      <body 
        className="bg-surface font-body-md text-body-md text-on-surface antialiased"
        suppressHydrationWarning
      >
        <Sidebar />

        <div className="pl-64">
          <header className="fixed top-0 left-64 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="h-16 w-full px-space-xl flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <img src="/logo.svg" alt="TerraVerify Logo" className="h-6 w-auto" />
                <span className="font-label-md text-label-md text-on-surface-variant font-medium tracking-wide uppercase px-2 py-0.5 bg-surface-container-high rounded border border-outline-variant/30">Enterprise</span>
              </div>
            </div>
          </header>
          
          <main className="w-full pt-16 bg-surface">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
