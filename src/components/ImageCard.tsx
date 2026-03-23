"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "./ImageModal";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ImageCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ImageCard({ project, onClick }: ImageCardProps) {
  const imageUrl = project.project_images?.[0]?.image_url || "/placeholder.jpg";
  const dateStr = format(new Date(project.created_at), "MMM yyyy", { locale: ar });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="mb-6 break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
      onClick={() => onClick(project)}
    >
      <div className="relative w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            width={400}
            height={600}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <span className="text-xs font-bold text-[#D4A574] bg-white/10 px-2 py-1 rounded-md w-fit mb-2 backdrop-blur-sm">
          {project.category}
        </span>
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-white/80 text-xs">{dateStr}</p>
      </div>
    </motion.div>
  );
}
