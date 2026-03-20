"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const menuItems = [
    { name: "إدارة المشاريع", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "إضافة مشروع جديد", href: "/admin/add-project", icon: PlusCircle },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen border-l border-gray-100 flex flex-col pt-6 hidden md:flex">
      <div className="px-6 mb-8">
        <h2 className="text-[#2D2D2D] text-xl font-bold">لوحة الإدارة</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                isActive 
                  ? "bg-[#F9E4E4] text-[#D4A574]" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </aside>
  );
}
