import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./src/features/components/layouts/Navbar";
import "./globals.css";
import Providers from "./src/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kingsman Co.",
  description:
    "Kingsman Co. — A full-stack e-commerce platform built with Next.js 14, TypeScript, Prisma ORM, PostgreSQL, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} suppressHydrationWarning  antialiased m-0 p-0`}
      >
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
