
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DashBoard from "./components/DashBoard";
import { Providers } from "./providers"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To do app",
  description: "Application de gestion de tâches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> 
          <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <DashBoard />
          </div>

          <main className="pt-16">
            {children}
          </main>
        </Providers>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
