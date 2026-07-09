import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SocketProvider from "@/components/SocketProvider";
import Nav from "@/components/layout/Nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Welcome to Codeliver!",
  description:
    "Codeliver: sharing code, chatting, and collaborating made simple.",
  authors: [{ name: "Codeliver", url: "https://codeliver.vercel.app" }],
  openGraph: {
    title: "Welcome to Codeliver!",
    description:
      "Codeliver: sharing code, chatting, and collaborating made simple.",
    url: "https://codeliver.vercel.app",
    siteName: "Codeliver",
    images: [
      {
        url: "/logo.png",
        width: 50,
        height: 50,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SocketProvider>
          <Nav />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
