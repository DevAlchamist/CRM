import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { SiteHeader } from "@/components/layout/site-header";
import { ToastProvider } from "@/components/ui/toast";
import { GlobalAuthChecker } from "@/components/auth/GlobalAuthChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM Pro - Modern Customer Relationship Management",
  description: "The modern CRM platform that helps businesses grow and succeed. Manage customers, track leads, and boost sales with our intuitive CRM platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ToastProvider>
            <GlobalAuthChecker />
            <SiteHeader />
            {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
