import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "توزيعات مناسبات | أفراح وأعياد ميلاد",
  description: "توزيعاتكم بلمسة مميزة - أفراح، أعياد ميلاد، خطوبة، ومناسبات أخرى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-[#F9E4E4] min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
