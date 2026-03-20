"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import ImageUploader from "@/components/ImageUploader";
import { useCategories } from "@/hooks/useCategories";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface ProjectImage {
  id: string;
  image_url: string;
  storage_path: string;
}

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  
  const [existingImages, setExistingImages] = useState<ProjectImage[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const dbCategories = useCategories();

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (id, image_url, storage_path)
        `)
        .eq('id', params.id)
        .single();
        
      if (error || !data) {
        toast.error("خطأ في تحميل بيانات المشروع");
        router.push("/admin/dashboard");
        return;
      }
      
      setTitle(data.title);
      setDescription(data.description || "");
      setCategory(data.category);
      setIsVisible(data.is_visible);
      setExistingImages(data.project_images || []);
      setFetching(false);
    }
    
    fetchProject();
  }, [params.id, router]);

  const deleteExistingImage = async (image: ProjectImage) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
    try {
      // 1. Delete from storage
      await supabase.storage.from("project-images").remove([image.storage_path]);
      
      // 2. Delete from DB
      await supabase.from("project_images").delete().eq("id", image.id);
      
      setExistingImages(prev => prev.filter(img => img.id !== image.id));
      toast.success("تم حذف الصورة بنجاح");
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء حذف الصورة");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update Project
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          title,
          description,
          category,
          is_visible: isVisible
        })
        .eq('id', params.id);

      if (projectError) throw projectError;
      
      // Upload new images if any
      if (files.length > 0) {
        let maxOrder = 0;
        if (existingImages.length > 0) {
           // We don't have display_order in the fetched images right now, assume length is max
           maxOrder = existingImages.length;
        }

        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const filePath = `${params.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

          uploadedImages.push({
            project_id: params.id,
            image_url: publicUrlData.publicUrl,
            storage_path: filePath,
            display_order: maxOrder + i,
          });
        }

        const { error: dbImagesError } = await supabase
          .from('project_images')
          .insert(uploadedImages);

        if (dbImagesError) throw dbImagesError;
      }
      
      toast.success("تم تحديث المشروع بنجاح!");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
      
    } catch (error: unknown) {
      console.error("Error updating project:", error);
      toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">جاري التحميل...</div>;

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D2D2D] dark:text-white mb-8">تعديل المشروع</h1>
        
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
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">القسم <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  list="edit-categories-list"
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="اختر أو اكتب قسماً جديداً..."
                />
                <datalist id="edit-categories-list">
                  {dbCategories.map((cat: string) => (
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
              />
            </div>
            
            {/* Images Section */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">الصور الحالية</label>
              {existingImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {existingImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group">
                      <Image src={img.image_url} alt="" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => deleteExistingImage(img)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-6">لا توجد صور حالية لهذه التوزيعة.</p>
              )}

              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">إضافة صور جديدة</label>
              <ImageUploader files={files} setFiles={setFiles} />
            </div>

            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
              <input
                type="checkbox"
                id="isVisible"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="w-5 h-5 text-[#D4A574] border-gray-300 rounded focus:ring-[#D4A574]"
              />
              <label htmlFor="isVisible" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                إظهار المشروع للعامة (مرئي للزوار)
              </label>
            </div>

          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="px-6 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-[#D4A574] hover:bg-[#b0845a] text-white rounded-lg font-bold shadow-md transition-colors disabled:opacity-50"
            >
              {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
