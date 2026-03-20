"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  created_at: string;
  is_visible: boolean;
  project_images?: { image_url: string; display_order: number }[];
}

interface ImageModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ImageModal({ project, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  // For this simple modal we just show the first image, or we could map them.
  const imageUrl = project.project_images?.[0]?.image_url || "/placeholder.jpg";
  const dateStr = format(new Date(project.created_at), "d MMMM yyyy", { locale: ar });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#D4A574] transition-colors z-[101] bg-black/40 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Area */}
          <div className="relative w-full md:w-2/3 max-h-[60vh] md:max-h-full min-h-[40vh] bg-gray-100 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Info Area */}
          <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col h-full bg-white overflow-y-auto" dir="rtl">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#F9E4E4] text-[#D4A574] rounded-full text-xs font-bold mb-3">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-2">{project.title}</h2>
              <p className="text-sm text-gray-500 mb-6">{dateStr}</p>
            </div>
            
            <div className="prose prose-sm text-gray-700 flex-grow">
              {project.description ? (
                <p className="whitespace-pre-wrap">{project.description}</p>
              ) : (
                <p className="text-gray-400 italic">لا يوجد وصف لهذا المشروع.</p>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full bg-[#2D2D2D] hover:bg-[#D4A574] text-white py-3 rounded-xl transition-colors font-medium"
              >
                إغلاق
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
