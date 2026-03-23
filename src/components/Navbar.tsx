import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 glass border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4A574] rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#D4A574] to-[#b0845a] p-2.5 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">توزيعاتي</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">لمسات مميزة</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8">
              <Link 
                href="/" 
                className="relative text-gray-700 dark:text-gray-200 hover:text-[#D4A574] dark:hover:text-[#D4A574] transition-colors font-medium group"
              >
                الرئيسية
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="#gallery" 
                className="relative text-gray-700 dark:text-gray-200 hover:text-[#D4A574] dark:hover:text-[#D4A574] transition-colors font-medium group"
              >
                المعرض
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
