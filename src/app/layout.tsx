"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './utils/providers'
import { AuthProvider } from './context/AuthContext';
import BaseNavbar from "./components/BaseNavbar";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <BaseNavbar />
            <div className="md:container mx-auto my-10">
              {children}
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
