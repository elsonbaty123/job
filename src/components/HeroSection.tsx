"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, PartyPopper, MessageCircle } from "lucide-react";

export default function HeroSection() {

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
        
        {/* WhatsApp Contact Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://wa.me/20109281727"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>تواصل معنا عبر واتساب</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
