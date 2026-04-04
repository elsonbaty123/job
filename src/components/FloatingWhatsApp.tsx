"use client";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/201092891727?text=Hi! I am interested in your party favors. Can you help me?"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center"
      aria-label="تواصل معنا عبر الواتساب"
      title="تواصل معنا عبر الواتساب"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none before:content-[''] before:absolute before:left-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-l-gray-900 shadow-md">
        تواصل معنا عبر الواتساب
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 pointer-events-none"></span>
    </a>
  );
}
