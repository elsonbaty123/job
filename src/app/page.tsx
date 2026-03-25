"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterTabs from "@/components/FilterTabs";
import MasonryGallery from "@/components/MasonryGallery";
import { useProjects } from "@/hooks/useProjects";
import { Loader2, Sparkles } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  
  const { projects, loading, hasMore, loadMore } = useProjects(activeCategory, "");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 text-[#2D2D2D] dark:text-white">
      <Navbar />
      
      <HeroSection />
      
      {/* Gallery Section with fade-up reveal */}
      <motion.div 
        id="gallery" 
        className="bg-white dark:bg-gray-950 min-h-[50vh] pb-24 transition-colors"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FilterTabs 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <MasonryGallery projects={projects} />
        
        {/* Loading / Load More */}
        <div className="mt-12 flex justify-center pb-12">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                className="flex items-center gap-3 text-[#D4A574]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="font-medium">جاري التحميل...</span>
              </motion.div>
            ) : hasMore ? (
              <motion.button 
                key="loadmore"
                onClick={loadMore}
                className="group relative px-10 py-4 bg-gradient-to-r from-[#D4A574] to-[#b0845a] text-white rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  عرض المزيد
                </span>
              </motion.button>
            ) : projects.length > 0 ? (
              <motion.p 
                key="end"
                className="text-gray-400 dark:text-gray-500 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-[#D4A574]" />
                لقد وصلت لنهاية المعرض
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
