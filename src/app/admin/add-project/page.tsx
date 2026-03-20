"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageUploader from "@/components/ImageUploader";
import toast, { Toaster } from "react-hot-toast";
import { useCategories } from "@/hooks/useCategories";

export default function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  
  const dbCategories = useCategories();
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error("يرجى رفع صورة واحدة على الأقل");
      return;
    }

    setLoading(true);
    
    try {
      // 1. Create project in DB
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          category,
          created_at: new Date(date).toISOString(),
          is_visible: true
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // 2. Upload images to storage and create records
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${project.id}/${Date.now()}-${index}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        return supabase.from("project_images").insert({
          project_id: project.id,
          image_url: publicUrl,
          storage_path: fileName,
          display_order: index,
        });
      });

      await Promise.all(uploadPromises);
      
      toast.success("تم إضافة المشروع بنجاح");
      setTimeout(() => router.push("/admin/dashboard"), 1500);

    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء رفع المشروع";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D2D2D] dark:text-white mb-8">إضافة مشروع جديد</h1>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المشروع <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: توزيعات زفاف ملكية"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">القسم <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  list="categories-list"
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="اختر أو اكتب قسماً جديداً..."
                />
                <datalist id="categories-list">
                  {dbCategories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="وصف تفصيلي للمشروع..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ المشروع</label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">صور المشروع <span className="text-red-500">*</span></label>
              <ImageUploader files={files} setFiles={setFiles} />
            </div>

          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2D2D2D] hover:bg-[#D4A574] text-white px-8 py-3 rounded-lg transition-colors font-bold disabled:opacity-70 flex items-center justify-center min-w-[150px]"
            >
              {loading ? "جاري النشر..." : "نشر المشروع"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
