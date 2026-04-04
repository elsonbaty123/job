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

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2D2D2D] dark:text-white mb-4">قالوا عنا</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">نفخر بثقة عملائنا وكلماتهم الطيبة التي تدفعنا للمزيد من الإبداع</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex text-[#D4A574] mb-4 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;توزيعات رائعة جداً، دقة في المواعيد واهتمام بأدق التفاصيل. أنصح الجميع بالتعامل مع موقع توزيعاتي.&quot;</p>
              <h4 className="font-bold text-[#2D2D2D] dark:text-white">- سارة أحمد</h4>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex text-[#D4A574] mb-4 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;طلبت توزيعات زواجي وكانت أفضل مما تصورت. شكراً لكم على هذا الإبداع الحقيقي!&quot;</p>
              <h4 className="font-bold text-[#2D2D2D] dark:text-white">- خالد منير</h4>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex text-[#D4A574] mb-4 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;شغل مرتب وتغليف فخم يبيض الوجه. تعامل راقي جداً ولن يكون آخر تعامل بإذن الله.&quot;</p>
              <h4 className="font-bold text-[#2D2D2D] dark:text-white">- نورة العتيبي</h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
