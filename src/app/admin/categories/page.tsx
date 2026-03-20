"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Edit2, Check, X, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setCategories(data as Category[]);
    } else if (error) {
      console.error(error);
      toast.error("تأكد من إنشاء جدول categories في قاعدة البيانات أولاً");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: newCategoryName.trim() }])
      .select()
      .single();

    if (error) {
      toast.error("حدث خطأ أثناء إضافة القسم (قد يكون الاسم مكرراً)");
      console.error(error);
    } else if (data) {
      toast.success("تم إضافة القسم بنجاح");
      setCategories([...categories, data as Category]);
      setNewCategoryName("");
    }
  };

  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditCategoryName(cat.name);
  };

  const saveEdit = async (id: string, oldName: string) => {
    if (!editCategoryName.trim() || editCategoryName.trim() === oldName) {
      setEditingId(null);
      return;
    }

    // 1. Update the category name in `categories` table
    const { error: updateCatError } = await supabase
      .from('categories')
      .update({ name: editCategoryName.trim() })
      .eq('id', id);

    if (updateCatError) {
      toast.error("حدث خطأ أثناء تعديل القسم");
      console.error(updateCatError);
      return;
    }

    // 2. Update all projects that had the old category name to the new one
    await supabase
      .from('projects')
      .update({ category: editCategoryName.trim() })
      .eq('category', oldName);

    toast.success("تم تعديل القسم بنجاح");
    setCategories(categories.map(c => c.id === id ? { ...c, name: editCategoryName.trim() } : c));
    setEditingId(null);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم نهائياً؟ (ملاحظة: المشاريع المرتبطة به لن تُحذف)")) return;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("حدث خطأ أثناء الحذف");
      console.error(error);
    } else {
      toast.success("تم الحذف بنجاح");
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D2D2D] dark:text-white mb-8">إدارة الأقسام والفئات</h1>

        {/* Add Category Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">إضافة قسم جديد</h2>
          <form onSubmit={addCategory} className="flex gap-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="اكتب اسم القسم هنا..."
              required
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#D4A574] hover:bg-[#b0845a] text-white rounded-lg font-bold shadow-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              إضافة
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-right align-middle">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4">اسم القسم</th>
                <th className="px-6 py-4 w-32 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">جاري التحميل...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">لا توجد أقسام مسجلة. قم بإنشاء أول قسم الآن.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      {editingId === category.id ? (
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="w-full max-w-sm px-3 py-2 border border-[#D4A574] rounded-lg focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(category.id, category.name);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                      ) : (
                        <span className="font-medium text-[#2D2D2D] dark:text-gray-200">
                          {category.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {editingId === category.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(category.id, category.name)}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="حفظ"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="إلغاء"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(category)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="تعديل"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
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
