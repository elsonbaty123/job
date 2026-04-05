"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  created_at: string;
  is_visible: boolean;
  price?: number | null;
  price_display?: string | null;
  views?: number;
  project_images?: { image_url: string; display_order: number }[];
}

interface ImageModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [project?.id]);

  const images = project?.project_images?.length
    ? project.project_images.sort((a, b) => a.display_order - b.display_order)
    : [];

  const currentImage = images[currentIndex]?.image_url || "/placeholder.jpg";
  const hasMultipleImages = images.length > 1;

  const handleNext = useCallback(() => {
    if (images.length > 1) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length > 1) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handlePrev();
      if (e.key === "ArrowLeft") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  if (!project) return null;

  const dateStr = format(new Date(project.created_at), "d MMMM yyyy", { locale: ar });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#D4A574] transition-colors z-[101] bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-[95%] max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            <div className="relative w-full md:w-2/3 bg-gray-900 flex flex-col">
              <div className="relative flex-1 min-h-[40vh] md:min-h-[50vh] max-h-[60vh] flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <Image
                      src={currentImage}
                      alt={`${project.title} - صورة ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hover:scale-110 active:scale-95"
                      aria-label="الصورة التالية"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hover:scale-110 active:scale-95"
                      aria-label="الصورة السابقة"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  </>
                )}

                {hasMultipleImages && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="bg-gray-900/95 p-3 border-t border-gray-800">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1);
                          setCurrentIndex(idx);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                          idx === currentIndex
                            ? "ring-2 ring-[#D4A574] ring-offset-2 ring-offset-gray-900"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.image_url}
                          alt={`thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-white dark:bg-gray-900 overflow-y-auto max-h-[40vh] md:max-h-full">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#F9E4E4] dark:bg-[#D4A574]/20 text-[#D4A574] rounded-full text-xs font-bold mb-3">
                  {project.category}
                </span>
                <h2 className="text-2xl font-bold text-[#2D2D2D] dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{dateStr}</p>
                {(project.price_display || project.price) && (
                  <div className="mb-6 inline-block bg-[#F9E4E4] dark:bg-[#2D2D2D]/40 border border-[#D4A574]/30 text-[#D4A574] px-4 py-2 rounded-xl text-lg font-bold">
                    {project.price_display || ` ${project.price} جنيه`}
                  </div>
                )}
              </div>

              <div className="flex-grow overflow-y-auto w-full">
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300 w-full whitespace-pre-wrap">
                    {project.description ? (
                      <p>{project.description}</p>
                    ) : (
                      <p className="text-gray-400 italic">لا يوجد وصف لهذا المشروع.</p>
                    )}
                  </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                <button
                  onClick={onClose}
                  className="w-full bg-[#2D2D2D]/10 hover:bg-[#2D2D2D]/20 dark:bg-[#2D2D2D] dark:hover:bg-[#D4A574] text-[#2D2D2D] dark:text-white py-3 rounded-xl transition-colors font-medium border border-[#2D2D2D]/20 dark:border-transparent"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
