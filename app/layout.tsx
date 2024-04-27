import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react" 



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "x",
  description: "x",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
