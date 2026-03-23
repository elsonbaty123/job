"use client";

import { motion } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";

export type FilterTabsProps = {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
};

export default function FilterTabs({ activeCategory, setActiveCategory }: FilterTabsProps) {
  const dbCategories = useCategories();
  const allCategories = ["الكل", ...dbCategories];

  return (
    <div className="w-full glass sticky top-20 z-40 border-b border-gray-200/30 dark:border-gray-800/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-5 gap-3 no-scrollbar scroll-smooth" dir="rtl">
          {allCategories.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative whitespace-nowrap px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-[#D4A574] dark:hover:text-[#D4A574]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#b0845a] rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
