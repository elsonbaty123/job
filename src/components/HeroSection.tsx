"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function HeroSection({ searchQuery, setSearchQuery }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#F9E4E4] to-white dark:from-gray-900/50 dark:to-gray-950 transition-colors">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D2D2D] dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          توزيعاتكم بلمسة <span className="text-[#D4A574]">مميزة</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          توزيعات أفراح | أعياد ميلاد | مناسبات
        </motion.p>
        
        <motion.div 
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-y-0 start-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 ms-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] sm:text-lg shadow-sm transition-colors"
            placeholder="ابحث عن توزيعات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>
    </section>
  );
}
