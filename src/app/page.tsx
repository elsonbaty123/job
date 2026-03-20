"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterTabs from "@/components/FilterTabs";
import MasonryGallery from "@/components/MasonryGallery";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { projects, loading, hasMore, loadMore } = useProjects(activeCategory, searchQuery);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors text-[#2D2D2D] dark:text-white">
      <Navbar />
      
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div id="gallery" className="bg-white dark:bg-gray-950 min-h-[50vh] pb-24 transition-colors">
        <FilterTabs 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <MasonryGallery projects={projects} />
        
        {/* Loading / Load More */}
        <div className="mt-12 flex justify-center pb-12">
          {loading ? (
            <div className="flex items-center gap-2 text-[#D4A574]">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>جاري التحميل...</span>
            </div>
          ) : hasMore ? (
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-[#F9E4E4] dark:bg-[#D4A574]/20 text-[#D4A574] hover:bg-[#D4A574] hover:text-white rounded-full font-bold transition-colors"
            >
              عرض المزيد
            </button>
          ) : projects.length > 0 ? (
            <p className="text-gray-400 dark:text-gray-500">لقد وصلت لنهاية المعرض ✨</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
