"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const CATEGORIES = [
  "الكل",
  "أفراح",
  "أعياد ميلاد",
  "مواليد",
  "خطوبة",
  "تخرج",
  "مناسبات أخرى"
];

interface FilterTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function FilterTabs({ activeCategory, setActiveCategory }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 py-8 max-w-5xl mx-auto">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-[#D4A574] text-white shadow-md transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#F9E4E4] dark:hover:bg-gray-700 hover:text-[#D4A574] dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#D4A574] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
