"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Trash2, Eye, EyeOff } from "lucide-react";
import type { Project } from "@/components/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_images (image_url)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data as unknown as Project[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("projects")
      .update({ is_visible: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("حدث خطأ أثناء تعديل حالة المشروع");
    } else {
      toast.success("تم تحديث حالة المشروع بنجاح");
      setProjects(projects.map(p => p.id === id ? { ...p, is_visible: !currentStatus } : p));
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المشروع نهائياً؟")) return;

    // Supabase will cascade delete project_images, but storage objects need manual deletion.
    const project = projects.find(p => p.id === id);
    if (project) {
      // 1. Delete from storage using simple delete for time being
      // This is a simplified version; ideally we fetch all storage_paths and delete them.
      const { data: images } = await supabase.from('project_images').select('storage_path').eq('project_id', id);
      if (images && images.length > 0) {
        const paths = images.map(img => img.storage_path);
        await supabase.storage.from("project-images").remove(paths);
      }
    }

    // 2. Delete from DB
    const { error } = await supabase.from("projects").delete().eq("id", id);
    
    if (error) {
      toast.error("حدث خطأ أثناء الحذف");
    } else {
      toast.success("تم حذف المشروع بنجاح");
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2D2D2D]">إدارة المشاريع</h1>
        <span className="bg-[#F9E4E4] text-[#D4A574] px-4 py-2 rounded-lg font-bold">
          {projects.length} مشاريع
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right align-middle">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">المشروع</th>
                <th className="px-6 py-4">القسم</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    جاري التحميل...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    لا توجد مشاريع مضافة حتى الآن.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                          {project.project_images?.[0] ? (
                            <Image 
                              src={project.project_images[0].image_url} 
                              alt="" 
                              fill
                              className="object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <span className="font-medium text-[#2D2D2D] truncate max-w-[200px]">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[150px]">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 break-keep">
                      {format(new Date(project.created_at), "d MMMM yyyy", { locale: ar })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVisibility(project.id, project.is_visible)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          project.is_visible 
                            ? "bg-green-100 text-green-700 hover:bg-green-200" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {project.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {project.is_visible ? "عام" : "مخفي"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
