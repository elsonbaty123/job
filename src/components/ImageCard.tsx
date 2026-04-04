"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "./ProjectDetailModal";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Eye, Calendar } from "lucide-react";

interface ImageCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ImageCard({ project, onClick }: ImageCardProps) {
  const images = project.project_images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const dateStr = format(new Date(project.created_at), "d MMMM yyyy", { locale: ar });

  // Auto-rotate images every 3 seconds if there are multiple images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex]?.image_url || "/placeholder.jpg";
  const isNew = project.created_at && new Date(project.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-6 break-inside-avoid relative group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-100 dark:bg-gray-800">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={project.title}
                  width={400}
                  height={600}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
        
        {/* Image Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {isNew && (
          <span className="absolute top-4 right-4 z-10 bg-[#D4A574] text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm shadow-lg animate-pulse" dir="rtl">
            جديد
          </span>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          {/* Category Badge & Price Badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-bold text-white bg-[#D4A574]/90 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-lg">
              {project.category}
            </span>
            {(project.price_display || project.price) && (
              <span className="text-xs font-bold text-white bg-green-500/90 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-lg">
                {project.price_display || `${project.price} جنيه`}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg">
            {project.title}
          </h3>
          
          {/* Date */}
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{dateStr}</span>
          </div>
          
          {/* View Button */}
          <motion.div 
            className="mt-4 flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl w-fit"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">عرض التفاصيل</span>
          </motion.div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4A574]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
}
