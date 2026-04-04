"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 top-0 start-0 glass border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4A574] rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#D4A574] to-[#b0845a] p-2.5 rounded-xl">
                {/* Logo Image Placeholder. Swap Sparkles with <Image /> when ready */}
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">Twze3at</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">اليدوية للمناسبات</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex gap-8">
              <Link 
                href="/" 
                className="relative text-gray-700 dark:text-gray-200 hover:text-[#D4A574] dark:hover:text-[#D4A574] transition-colors font-medium group"
              >
                الرئيسية
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/#gallery" 
                className="relative text-gray-700 dark:text-gray-200 hover:text-[#D4A574] dark:hover:text-[#D4A574] transition-colors font-medium group"
              >
                المعرض
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/about" 
                className="relative text-gray-700 dark:text-gray-200 hover:text-[#D4A574] dark:hover:text-[#D4A574] transition-colors font-medium group"
              >
                من نحن
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 dark:text-gray-200 p-2"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 z-50 flex flex-col p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold gradient-text">Twze3at</span>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-[#D4A574]">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 text-lg font-medium">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-[#D4A574] transition-colors">
                  الرئيسية
                </Link>
                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
                <Link href="/#gallery" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-[#D4A574] transition-colors">
                  المعرض
                </Link>
                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-[#D4A574] transition-colors">
                  من نحن
                </Link>
              </div>
              
              <div className="mt-auto pt-6 text-center text-sm text-gray-400">
                <p>توزيعاتكم بلمسة مميزة</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
