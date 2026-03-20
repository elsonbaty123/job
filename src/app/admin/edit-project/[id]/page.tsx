"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const CATEGORIES = [
  "أفراح",
  "أعياد ميلاد",
  "مواليد",
  "خطوبة",
  "تخرج",
  "مناسبات أخرى"
];

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
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
      setFetching(false);
    }
    
    fetchProject();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title,
          description,
          category,
          is_visible: isVisible
        })
        .eq('id', params.id);

      if (error) throw error;
      
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
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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
