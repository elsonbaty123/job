import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export const metadata = {
  title: "من نحن | Twze3at",
  description: "قصة مشروع توزيعات للصناعات اليدوية والتوزيعات للمناسبات الخاصة",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 text-[#2D2D2D] dark:text-white pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <section className="text-center py-12 md:py-20 mb-8 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4A574] to-[#b0845a] mb-6 inline-block">
            من نحن
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            نحن مشروع عائلي شغوف بصناعة التوزيعات اليدوية بكل حرفية وإتقان، هدفنا إضافة لمسة مميزة وجميلة لكل مناسباتكم لتصبح ذكرى لا تُنسى.
          </p>
        </section>

        {/* Our Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A574]/20 to-transparent mix-blend-overlay z-10"></div>
              {/* Workshop real image */}
              <div className="w-full h-full absolute inset-0">
                <Image src="/workshop.png" alt="ورشة عمل توزيعات" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-[#D4A574]">قصتنا</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              بدأنا رحلتنا من شغفنا المشترك بالتصميم والأعمال اليدوية. نؤمن بأن كل مناسبة لها طابعها الخاص، 
              ولذلك نولي اهتماماً كبيراً لأدق التفاصيل في كل قطعة نصنعها. 
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              عملنا لا يقتصر فقط على بيع منتج، بل نصنع تجربة فريدة تعبر عنكم في حفلات الزفاف، أعياد الميلاد، واللقاءات العائلية الدافئة.
            </p>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="mb-20 text-center bg-gray-50 dark:bg-gray-900/50 p-10 rounded-3xl">
          <h2 className="text-3xl font-bold text-[#2D2D2D] dark:text-white mb-10">لماذا تختارنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#D4A574]/20 text-[#D4A574] rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-bold">جودة عالية</h3>
              <p className="text-gray-500">نستخدم أفضل الخامات لضمان جمال منتجاتنا واستدامتها.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#D4A574]/20 text-[#D4A574] rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-bold">صناعة يدوية</h3>
              <p className="text-gray-500">كل قطعة تصنع بكل حب وشغف خصيصاً لمناسبتك.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-[#D4A574]/20 text-[#D4A574] rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-bold">تصاميم مخصصة</h3>
              <p className="text-gray-500">ننفذ تصاميم وأفكار تناسب ذوقك وتصميم حفلتك بالكامل.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">هل لديك مناسبة قريباً؟</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            لا تتردد في التواصل معنا لمناقشة أفكارك وتصميم أروع التوزيعات لك ولضيوفك.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/201092891727" className="flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
              <MessageCircle className="w-5 h-5"/> تواصل معنا الآن
            </a>
            <Link href="/#gallery" className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
               شاهد المعرض
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
