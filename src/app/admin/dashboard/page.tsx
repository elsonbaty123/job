"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Trash2, Edit, Eye, EyeOff, Loader2 } from "lucide-react";
import type { Project } from "@/components/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth(true);

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
    if (!authLoading && user) {
      fetchProjects();
    }
  }, [user, authLoading]);

  const deleteProject = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع نهائياً؟")) return;
    
    try {
      // التحقق من الجلسة
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى");
        return;
      }
      
      // 1. Get images to delete from storage
      const { data: images } = await supabase
        .from('project_images')
        .select('storage_path')
        .eq('project_id', id);
        
      if (images && images.length > 0) {
        const paths = images.map(img => img.storage_path);
        await supabase.storage.from('project-images').remove(paths);
      }

      // 2. Delete project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setProjects(projects.filter(p => p.id !== id));
      toast.success("تم الحذف بنجاح");
    } catch (error: unknown) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      // التحقق من الجلسة أولاً
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى");
        return;
      }
      
      const { error } = await supabase
        .from('projects')
        .update({ is_visible: !currentStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setProjects(projects.map(p => p.id === id ? { ...p, is_visible: !currentStatus } : p));
      toast.success(currentStatus ? "تم إخفاء المشروع" : "تم إظهار المشروع");
    } catch (error: unknown) {
      console.error(error);
      toast.error("حدث خطأ أثناء تغيير حالة العرض");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#D4A574]" />
        <p className="text-lg text-gray-500 dark:text-gray-400">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2D2D2D] dark:text-white">إدارة المشاريع</h1>
        <span className="bg-[#F9E4E4] dark:bg-[#D4A574]/20 text-[#D4A574] px-4 py-2 rounded-lg font-bold">
          {projects.length} مشاريع
        </span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-right align-middle">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4">المشروع</th>
                <th className="px-6 py-4">القسم</th>
                <th className="px-6 py-4">التاريخ</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    لا توجد مشاريع مضافة حتى الآن.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden relative shrink-0">
                          {project.project_images?.[0] ? (
                            <Image 
                              src={project.project_images[0].image_url} 
                              alt="" 
                              fill
                              className="object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                          )}
                        </div>
                        <span className="font-medium text-[#2D2D2D] dark:text-gray-200 truncate max-w-[200px]">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-500 break-keep">
                      {format(new Date(project.created_at), "d MMMM yyyy", { locale: ar })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVisibility(project.id, project.is_visible)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          project.is_visible 
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40" 
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {project.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {project.is_visible ? "عام" : "مخفي"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/edit-project/${project.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
