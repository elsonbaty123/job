"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ImagePlus, LogOut, FolderTree } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/secret-dashboard-login");
  };

  const menuItems = [
    { name: "إدارة المشاريع", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "إضافة مشروع جديد", href: "/admin/add-project", icon: ImagePlus },
    { name: "إدارة الأقسام", href: "/admin/categories", icon: FolderTree },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-l border-gray-100 dark:border-gray-700 min-h-screen flex flex-col sticky top-0 transition-colors">
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-l from-[#D4A574] to-[#c18f5e] bg-clip-text text-transparent">
          لوحة الإدارة
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                isActive
                  ? "bg-[#F9E4E4] dark:bg-[#D4A574]/20 text-[#D4A574]"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-[#D4A574]"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
