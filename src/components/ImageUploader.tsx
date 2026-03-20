import React, { useCallback, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploaderProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({ files, setFiles }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  }, [setFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragOver ? "border-[#D4A574] bg-[#F9E4E4]/30" : "border-gray-300 hover:border-[#D4A574] hover:bg-gray-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-[#F9E4E4] rounded-full text-[#D4A574]">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-medium text-[#2D2D2D] mb-1">اسحب وأفلت الصور هنا</p>
            <p className="text-sm text-gray-500">أو اضغط لاختيار الملفات (PNG, JPG, WEBP)</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover"
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
