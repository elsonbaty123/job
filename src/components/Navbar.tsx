import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 bg-white/80 backdrop-blur-md border-b border-[#F9E4E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Gift className="h-8 w-8 text-[#D4A574]" />
            <span className="text-xl font-bold text-[#2D2D2D]">توزيعاتي</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-[#2D2D2D] hover:text-[#D4A574] transition-colors font-medium">الرئيسية</Link>
            <Link href="#gallery" className="text-[#2D2D2D] hover:text-[#D4A574] transition-colors font-medium">المعرض</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
