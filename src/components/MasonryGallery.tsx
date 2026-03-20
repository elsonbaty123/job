"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";
import ImageModal, { type Project } from "./ImageModal";

interface MasonryGalleryProps {
  projects: Project[];
}

export default function MasonryGallery({ projects }: MasonryGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1024: 3,
    768: 2,
    500: 2
  };

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p className="text-xl">لا توجد مشاريع في هذا القسم بعد.</p>
      </div>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto gap-4 md:gap-6 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]"
        columnClassName="bg-clip-padding"
      >
        {projects.map((project) => (
          <ImageCard
            key={project.id}
            project={project}
            onClick={setSelectedProject}
          />
        ))}
      </Masonry>

      <ImageModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
