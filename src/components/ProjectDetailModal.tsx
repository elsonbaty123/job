"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import InquiryForm from "@/components/InquiryForm";

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
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
    setShowInquiryForm(false);
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
                {showInquiryForm ? (
                  <InquiryForm projectId={project.id} projectTitle={project.title} onClose={onClose} />
                ) : (
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300 w-full whitespace-pre-wrap">
                    {project.description ? (
                      <p>{project.description}</p>
                    ) : (
                      <p className="text-gray-400 italic">لا يوجد وصف لهذا المشروع.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                {!showInquiryForm && (
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full bg-[#D4A574] hover:bg-[#b0845a] text-white py-3 rounded-xl transition-all shadow-md font-bold"
                  >
                    طلب هذه التوزيعة
                  </button>
                )}
                <a
                  href={`https://wa.me/201092891727?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن التصميم: ${project?.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white py-3 rounded-xl transition-all shadow-md  font-bold"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  طلب عبر الواتساب
                </a>
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
