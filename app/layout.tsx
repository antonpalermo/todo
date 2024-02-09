import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import Navbar from "@/app/_components/navbar";
import SessionProvider from "@/components/providers/session";

import options from "@/app/api/auth/options";
import ModalProvider from "@/components/providers/modal";
import CreateDialog from "./_components/create-dialog";
import { Toaster } from "@/components/ui/toaster";

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
        <ModalProvider>
          <body className={inter.className}>
            <Navbar />
            <CreateDialog />

            {children}
            <Toaster />
          </body>
        </ModalProvider>
      </SessionProvider>
    </html>
  );
}
