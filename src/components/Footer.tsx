import React from "react";
import { AparatIcon } from "./AparatIcon";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  MessageCircle, 
  Linkedin,
  Youtube,
  Tv,
  Grid,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
  onSelectCategory: (id: string) => void;
  onOpenConsultation: () => void;
  onOpenQuote: () => void;
  companyInfo: any;
  categories: any[];
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory, onOpenConsultation, onOpenQuote, companyInfo, categories }) => {
  const navigation = [
    { title: 'صفحه اصلی', path: '/' },
    { title: 'درباره ما', path: '/about' },
    { title: 'پروژه‌ها', path: '/projects' },
    { title: 'محصولات', path: '/products' },
    { title: 'خدمات', path: '/services' },
    { title: 'مجله', path: '/magazine' },
    { title: 'تماس با ما', path: '/contact' },
  ];

  

  const mainPhone = '09151126258';
  const email = companyInfo?.email || 'info@pooyapoultry.com';
  const hq = companyInfo?.locations?.find(loc => loc.type === 'headquarter');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#020b18] pt-20 pb-6 overflow-hidden border-t border-white/5 z-20">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.05)_0%,_transparent_70%)] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & About (Span 4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-14 flex items-center justify-center">
                  <img src="/images/logo-wide.png" alt="Logo" className="h-full w-auto object-contain" />
               </div>
               <div>
                  <h3 className="text-xl font-black text-white tracking-tight">{companyInfo?.name}</h3>
                  <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">{companyInfo?.nameEn}</span>
               </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8 max-w-sm">
              شرکت طیوران صنعت پویا، با بیش از 50 سال سابقه، پیشگام در طراحی، تولید و اجرای تجهیزات پرورشی و کارخانجات خوراک دام و طیور در خاورمیانه است.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href={companyInfo?.socialLinks?.instagram || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.instagram) {
                    e.preventDefault();
                    toast('به زودی صفحه اینستاگرام ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all duration-300 group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={companyInfo?.socialLinks?.telegram || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.telegram) {
                    e.preventDefault();
                    toast('به زودی کانال تلگرام ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0088cc] hover:border-transparent transition-all duration-300 group">
                <Send className="w-4 h-4 ml-0.5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={companyInfo?.socialLinks?.aparat || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.aparat) {
                    e.preventDefault();
                    toast('به زودی کانال آپارات ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#263238] hover:border-transparent transition-all duration-300 group">
                <AparatIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={companyInfo?.socialLinks?.rubika || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.rubika) {
                    e.preventDefault();
                    toast('به زودی کانال روبیکا ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-[#ff7300] hover:to-[#7600b5] hover:border-transparent transition-all duration-300 group">
                <Grid className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={companyInfo?.socialLinks?.youtube || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.youtube) {
                    e.preventDefault();
                    toast('به زودی کانال یوتیوب ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#ff0000] hover:border-transparent transition-all duration-300 group">
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={companyInfo?.socialLinks?.linkedin || '#'} 
                onClick={(e) => {
                  if (!companyInfo?.socialLinks?.linkedin) {
                    e.preventDefault();
                    toast('به زودی صفحه لینکدین ما راه‌اندازی می‌شود', { icon: '✨' });
                  }
                }}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0a66c2] hover:border-transparent transition-all duration-300 group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              دسترسی سریع
            </h4>
            <ul className="space-y-3">
              {navigation.map((nav, idx) => (
                <li key={idx}>
                  <Link to={nav.path} className="text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors flex items-center gap-1.5 group">
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              خدمات و محصولات
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1.5 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  ماشین‌آلات کارخانجات خوراک
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1.5 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  تجهیزات مدرن مرغداری
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1.5 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  سازه‌ها و سوله‌های صنعتی
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-1.5 group">
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  مواد اولیه و مکمل‌های دارویی
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Span 3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              اطلاعات تماس
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold mb-1">تلفن مشاوره و فروش</span>
                  <a href="tel:09151126258" className="text-slate-300 hover:text-white font-medium text-sm transition-colors" dir="ltr">۰۹۱۵۱۱۲۶۲۵۸</a>
                </div>
              </div>
              
              {hq && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold mb-1">دفتر مرکزی</span>
                    <span className="text-slate-300 font-medium text-sm leading-relaxed">{hq.address}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Copyright & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>
            © {currentYear} تمامی حقوق این وب‌سایت متعلق به <span className="text-slate-300">{companyInfo?.name}</span> می‌باشد. طراحی و توسعه توسط <span className="text-slate-300">شرکت هزارتو</span>.
          </p>
          <div className="flex items-center gap-4">
             <a href="#" className="hover:text-slate-300 transition-colors">قوانین و مقررات</a>
             <div className="w-1 h-1 rounded-full bg-slate-700" />
             <a href="#" className="hover:text-slate-300 transition-colors">حریم خصوصی</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
