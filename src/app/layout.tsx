import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

const cairo = Cairo({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "توزيعات مناسبات | أفراح وأعياد ميلاد",
  description: "توزيعاتكم بلمسة مميزة - أفراح، أعياد ميلاد، خطوبة، ومناسبات أخرى",
  openGraph: {
    title: "Twze3at | Handmade Party Favors",
    description: "توزيعاتكم بلمسة مميزة - أفراح، أعياد ميلاد، خطوبة، ومناسبات أخرى",
    images: ["/og-image.png"],
    locale: "ar_EG",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} bg-[#F9E4E4] dark:bg-gray-900 min-h-screen antialiased transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
