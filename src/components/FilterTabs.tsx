"use client";

import { useCategories } from "@/hooks/useCategories";

export type FilterTabsProps = {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
};

export default function FilterTabs({ activeCategory, setActiveCategory }: FilterTabsProps) {
  const dbCategories = useCategories();
  const allCategories = ["الكل", ...dbCategories];

  return (
    <div className="w-full bg-white dark:bg-gray-950 sticky top-16 z-40 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 gap-3 no-scrollbar scroll-smooth" dir="rtl">
          {allCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D4A574] text-white shadow-md transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#F9E4E4] dark:hover:bg-gray-700 hover:text-[#D4A574] dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
