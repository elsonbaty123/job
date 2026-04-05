"use client";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-gray-900 border-t border-gray-800 text-white py-12 px-4' dir="rtl">
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#D4A574]">Twze3at</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            نصمم أجمل التوزيعات اليدوية لمناسباتكم الخاصة. اجعلوا ذكرياتكم لا تنسى مع لمستنا المميزة.
          </p>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white">روابط سريعة</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-[#D4A574] transition">الرئيسية</Link></li>
            <li><Link href="/#gallery" className="hover:text-[#D4A574] transition">المعرض</Link></li>
            <li><Link href="/about" className="hover:text-[#D4A574] transition">من نحن</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white">تواصل معنا</h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4A574]"/> 
              <span dir="ltr">+20 109 289 1727</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#D4A574]"/> 
              <span>تواصل عبر الواتساب</span>
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white">تابعنا</h3>
          <div className="flex gap-4">
            <a href="https://wa.me/201092891727" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2.5 rounded-full hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1"><MessageCircle className="w-5 h-5"/></a>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm'>
        <p>2026 Twze3at. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
