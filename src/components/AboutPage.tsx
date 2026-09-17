import React from 'react';
import { LazyImage } from './LazyImage';
import { motion } from 'motion/react';
import { Building2, CheckCircle2, Factory, Globe2 } from 'lucide-react';
import { SEO } from './SEO';
import { InnerScrollIndicator } from './InnerScrollIndicator';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-blueprint-light min-h-screen relative">
      <SEO 
        title="درباره طیوران صنعت پویا"
        description="مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی با بیش از ۵۰ سال تجربه در صنعت دام، طیور و آبزیان."
      />
      
      {/* Background patterns similar to other pages */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.15)_0%,_transparent_60%)]" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15)_0%,_transparent_60%)]" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[30%] right-[30%] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,_rgba(52,211,153,0.12)_0%,_transparent_60%)]" style={{ animationDuration: '12s' }} />
      </div>

      <div className="w-full min-h-[100dvh] flex flex-col justify-center relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
            
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-white/50 shadow-sm mb-6">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold text-slate-800">توسعه صنعتی و تجهیزات مدرن</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              درباره شرکت <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-amber-500">طیوران صنعت</span> پویا
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              بیش از ۵۰ سال تجربه در مشاوره، طراحی و اجرای پروژه‌های عظیم صنعتی در حوزه‌های دام، طیور و آبزیان در سطح ملی و بین‌المللی.
            </p>
          </motion.div>
        
        </div>
        <InnerScrollIndicator />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-24">
        
        {/* Section 1: Intro */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-white/50 overflow-hidden relative backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-96 lg:h-auto bg-slate-100">
               <LazyImage
                  src="/images/about-toyooran.jpg"
                  alt="طیوران صنعت پویا"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-50/50 backdrop-blur-sm text-[#003F86] px-4 py-2 rounded-xl mb-6 self-start font-bold text-sm border border-blue-100/50">
                <Building2 className="w-4 h-4" />
                درباره طیوران صنعت پویا
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-6">
                مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی
              </h1>
              
              <p className="text-slate-600 leading-relaxed text-lg mb-8 text-justify font-medium">
                شرکت طیوران صنعت پویا با بیش از ۵۰ سال تجربه در صنعت دام، طیور و آبزیان، مجری بیش از ۲۰۰ پروژه ملی و بین‌المللی است. ما به عنوان یک مرجع تخصصی، راهکارهای جامع توسعه، طراحی، ساخت و تجهیز کامل سوله و کارخانجات را ارائه می‌دهیم.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#003F86]/10 flex items-center justify-center shrink-0 shadow-sm border border-[#003F86]/10">
                    <CheckCircle2 className="w-6 h-6 text-[#003F86]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">لایسنس معتبر بین‌المللی</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">تنها تولیدکننده بشقاب‌های پروانه‌ای تحت لیسانس Butterfly Concepts آمریکا با تاییدیه FDA.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 shadow-sm border border-amber-500/10">
                    <Factory className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">تولید تخصصی ماشین‌آلات</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">تولیدکننده تخصصی انواع جت هیتر، تجهیزات گرمایشی و ماشین‌آلات خطوط تولید خوراک دام و طیور.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 shadow-sm border border-emerald-500/10">
                    <Globe2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">گستره فعالیت و توسعه</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">دارای دفتر تحقیق و توسعه (R&D) مستقر در دانشگاه منابع طبیعی گلستان و حضور فعال در بازارهای داخلی و خارجی.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50/80 backdrop-blur p-6 rounded-2xl border border-slate-200/60 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
                 <div className="text-slate-700 text-sm font-bold flex items-center gap-2">
                   تلفن دفتر مرکزی:
                   <span className="font-mono text-[#003F86] text-base">۰۵۱۳۶۶۶۵۶۰۰</span>
                 </div>
                 <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
                 <div className="text-slate-700 text-sm font-bold flex items-center gap-2">
                   مشاوره فروش:
                   <span className="font-mono text-[#003F86] text-base">۰۹۱۵۱۱۲۶۲۵۸</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
