
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashBoard from "./components/DashBoard";
import { Providers } from "./providers";
import ThemeRegistry from "./components/ThemeRegistry";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To do app",
  description: "Application de gestion de tâches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeRegistry>
          <Providers>
            <div className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
              <DashBoard />
            </div>
            <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">{children}</main>
            <Toaster position="top-center" />
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
