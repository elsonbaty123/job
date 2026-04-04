"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface InquiryFormProps {
  projectId?: string;
  projectTitle?: string;
  onClose?: () => void;
}

export default function InquiryForm({ projectId, projectTitle, onClose }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion_type: "",
    quantity: "",
    preferred_date: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        ...formData,
        project_id: projectId || null,
        quantity: formData.quantity ? parseInt(formData.quantity) : null,
      });

      if (error) throw error;

      toast.success("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
      
      setFormData({
        name: "", phone: "", email: "", occasion_type: "", quantity: "", preferred_date: "", notes: ""
      });

      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const occasionOptions = ["حفل زفاف", "خطوبة", "عيد ميلاد", "سبوع / استقبال مولود", "تخرج", "أخرى"];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-lg w-full mx-auto" dir="rtl">
      <h3 className="text-2xl font-bold text-[#D4A574] mb-6 text-center">
        {projectTitle ? `طلب توزيعة: ${projectTitle}` : "طلب توزيعات خاص"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">الاسم الكامل <span className="text-red-500">*</span></label>
          <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574]" placeholder="الاسم" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">رقم الهاتف <span className="text-red-500">*</span></label>
          <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574]" placeholder="رقم الهاتف (واتساب)" dir="ltr" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">نوع المناسبة</label>
            <select value={formData.occasion_type} onChange={(e) => setFormData({...formData, occasion_type: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574]">
              <option value="">اختر...</option>
              {occasionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">الكمية التقريبية</label>
            <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574]" placeholder="مثال: 50" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">تاريخ المناسبة</label>
          <input type="date" value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574]" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">ملاحظات إضافية</label>
          <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-[#D4A574] resize-none" placeholder="أي تفاصيل أخرى كالألوان المفضلة..." />
        </div>
      </div>

      <button disabled={loading} type="submit" className="mt-6 w-full bg-[#D4A574] hover:bg-[#b0845a] text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50">
        {loading ? "جاري الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}
