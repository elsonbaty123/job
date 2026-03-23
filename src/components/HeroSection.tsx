"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Heart, PartyPopper } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function HeroSection({ searchQuery, setSearchQuery }: HeroSectionProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9E4E4]/80 via-white to-[#fef3e2]/50 dark:from-gray-900/80 dark:via-gray-950 dark:to-gray-900/50"></div>
      
      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#D4A574]/20 rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#F9E4E4]/40 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#D4A574]/10 rounded-full blur-2xl animate-pulse-slow"></div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg border border-[#D4A574]/20 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-[#D4A574]" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">تصاميم حصرية ومميزة</span>
        </motion.div>
        
        {/* Main Title */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          توزيعاتكم بلمسة
          <br />
          <span className="gradient-text">احترافية مميزة</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          نصمم لكم أجمل التوزيعات لمناسباتكم الخاصة
        </motion.p>
        
        {/* Categories Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A574]/10 text-[#D4A574] text-sm font-medium">
            <Heart className="w-4 h-4" />
            أفراح
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A574]/10 text-[#D4A574] text-sm font-medium">
            <PartyPopper className="w-4 h-4" />
            أعياد ميلاد
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A574]/10 text-[#D4A574] text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            مناسبات
          </span>
        </motion.div>
        
        {/* Search Box */}
        <motion.div 
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/20 to-[#b0845a]/20 rounded-2xl blur-xl"></div>
          <div className="relative">
            {/* Border Animation - fills from right to left */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ padding: '2px' }}>
              {/* Animated border that fills from right to left */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(to left, #D4A574, #b0845a)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: isFocused ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            <div className="absolute inset-y-0 start-0 pl-5 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-[#D4A574]" />
            </div>
            <input
              type="text"
              className="relative block w-full pl-14 pr-6 py-5 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl leading-5 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-transparent sm:text-lg shadow-xl transition-all duration-300"
              placeholder="ابحث عن تصميمات توزيعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
