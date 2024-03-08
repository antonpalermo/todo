import "@/app/globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";

import Navbar from "@/components/navbar";
import SessionProvider from "@/components/providers/session";

import options from "@/app/api/auth/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuudo",
  description: "Todo app for extream people!"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Toaster />
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
