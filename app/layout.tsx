import type { Metadata } from "next";
import { Salsa } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const salsa = Salsa({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Evently - event booking platform",
  description: "book events from evently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${salsa.className} antialiased`}>
        <SessionProvider> {children}</SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
