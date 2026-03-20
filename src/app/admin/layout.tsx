"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth(true); // require auth

  if (loading) {
    return (
      <div className="min-h-screen flex text-[#D4A574] items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Next.js router will redirect in useAuth hook
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors" dir="rtl">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pt-6 px-4 md:px-8 pb-12">
        {children}
      </main>
    </div>
  );
}
