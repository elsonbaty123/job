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
            className={cn(
              "relative px-5 py-2 rounded-full text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"
            )}
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
