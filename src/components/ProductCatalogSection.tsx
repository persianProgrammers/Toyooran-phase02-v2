import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Search,
  Layers, 
  Zap, 
  PhoneCall,
  ArrowLeft,
  Filter,
  Download
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

import { InnerScrollIndicator } from './InnerScrollIndicator';
import { LazyImage } from './LazyImage';

interface ProductCatalogSectionProps {
  products: Product[];
  selectedCategory?: ProductCategory | 'all';
  onSelectCategory?: (cat: ProductCategory | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onRequestQuoteForProduct: (product: Product) => void;
}

import { CategoryMarquee } from "./CategoryMarquee";



export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ 
  products, 
  selectedCategory: propSelectedCategory,
  onSelectCategory: propOnSelectCategory,
  onSelectProduct,
  onRequestQuoteForProduct
}) => {
  const [localCategory, setLocalCategory] = useState<ProductCategory | 'all'>('all');
  const selectedCategory = propSelectedCategory !== undefined ? propSelectedCategory : localCategory;
  
  const handleSelectCategory = (cat: ProductCategory | 'all') => {
    if (propOnSelectCategory) {
      propOnSelectCategory(cat);
    } else {
      setLocalCategory(cat);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "200px 0px" });

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (isInView) {
      setVisibleCount(prev => prev + 6);
    }
  }, [isInView]);

  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'generating' | 'downloading' | 'success'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const generatingTexts = [
    "در حال جمع‌آوری اطلاعات...",
    "در حال پردازش تصاویر...",
    "در حال صفحه‌آرایی کاتالوگ...",
    "در حال ساخت نسخه PDF...",
  ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloadStatus === 'generating') {
      interval = setInterval(() => {
        setTextIndex(i => (i + 1) % generatingTexts.length);
      }, 2500); // reduced from 4000 to flip faster since generation is now fast
    } else {
      setTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [downloadStatus]);

  const handleDownloadCatalog = async () => {
    if (downloadStatus !== 'idle') return;
    try {
      setDownloadStatus('generating');
      setDownloadProgress(0);
      
      const response = await fetch('/api/catalog.pdf');
      if (!response.ok) throw new Error('Failed to download PDF');
      
      setDownloadStatus('downloading');
      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      let loaded = 0;
      const chunks: Uint8Array[] = [];
      const reader = response.body?.getReader();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            loaded += value.length;
            if (total) {
              setDownloadProgress(Math.round((loaded / total) * 100));
            } else {
              setDownloadProgress((prev) => prev + 1);
            }
          }
        }
      }
      
      const blob = new Blob(chunks, { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `toyooran-catalog-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      setDownloadStatus('success');
      setTimeout(() => {
        setDownloadStatus('idle');
        setDownloadProgress(0);
      }, 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('خطا در دانلود کاتالوگ. لطفاً دوباره تلاش کنید.');
      setDownloadStatus('idle');
      setDownloadProgress(0);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustrial = true;
    return matchesCat && matchesSearch && matchesIndustrial;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="products" className="min-h-screen relative overflow-hidden z-0">
      {/* Dynamic Vibrant Mesh Gradient Background to match Magazine */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.15)_0%,_transparent_60%)]" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15)_0%,_transparent_60%)]" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[30%] right-[30%] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,_rgba(52,211,153,0.12)_0%,_transparent_60%)]" style={{ animationDuration: '12s' }} />
      </div>

      <div className="w-full min-h-[100dvh] flex flex-col justify-center relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          {/* 
            ========================================================
            HERO & HEADER (MINIMALIST)
            ========================================================
          */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-white/50 shadow-sm mb-6">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold text-slate-800">تجهیزات و ماشین‌آلات</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              فروشگاه <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-amber-500">محصولات</span>
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
              تجهیزات تخصصی مرغداری، ماشین‌آلات خطوط تولید خوراک و محصولات موردنیاز صنعت دام، طیور و آبزیان
            </p>
            
            <div className="flex flex-col items-center justify-center min-h-[100px]">
              {downloadStatus === 'idle' ? (
                <>
                  <button 
                    onClick={handleDownloadCatalog}
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-[#FF9F14] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base hover:scale-105 transition-all shadow-xl shadow-amber-500/20 hover:-translate-y-1"
                  >
                    <Download className="w-5 h-5" />
                    دانلود کاتالوگ
                  </button>
                  {/* Note: Wait message is hidden here as requested until clicked */}
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md bg-white p-5 rounded-3xl shadow-sm border border-amber-100 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 border border-amber-100 shrink-0">
                      {downloadStatus === 'generating' ? (
                        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      ) : downloadStatus === 'success' ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <Download className="w-5 h-5 text-amber-600 animate-bounce" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-bold text-slate-800 truncate" dir="rtl">
                          {downloadStatus === 'generating' ? generatingTexts[textIndex] 
                            : downloadStatus === 'success' ? 'دانلود با موفقیت انجام شد!'
                            : 'در حال دریافت فایل...'}
                        </span>
                        {downloadStatus === 'downloading' && (
                          <span className="text-xs font-black text-amber-600" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {downloadProgress}٪
                          </span>
                        )}
                      </div>
                      
                      {downloadStatus === 'generating' ? (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-1/3 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ transformOrigin: 'left' }} />
                        </div>
                      ) : downloadStatus === 'success' ? (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-full rounded-full" />
                        </div>
                      ) : (
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 transition-all duration-300 rounded-full" 
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {(downloadStatus === 'generating' || downloadStatus === 'downloading') && (
                    <p className="text-[10px] text-slate-400 text-center font-medium">
                      پردازش و آماده‌سازی فایل ممکن است تا ۱ دقیقه زمان ببرد. از شکیبایی شما سپاسگزاریم...
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        <InnerScrollIndicator />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12">
        {/* 
          ========================================================
          FILTERS & SEARCH
          ========================================================
        */}
          <div className="flex items-center justify-center gap-4 mb-8 w-full opacity-60 px-4">
            <div className="h-px bg-slate-400 flex-1 max-w-[40px] sm:max-w-[60px]" />
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-500 tracking-widest whitespace-nowrap">
              دسته‌بندی محصولات
            </h3>
            <div className="h-px bg-slate-400 flex-1 max-w-[40px] sm:max-w-[60px]" />
          </div>
          {/* Infinite Draggable Category Marquee */}
          <CategoryMarquee 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleSelectCategory} 
          />

          {/* Search & Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="relative w-full sm:w-[400px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی نام محصول یا کد..."
                className="w-full bg-white border border-slate-200 focus:border-[#003F86] rounded-2xl py-3.5 pr-12 pl-4 text-sm font-bold text-slate-800 transition-all outline-none placeholder:text-slate-400 placeholder:font-normal shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
        </div>
          </div>

        {/* 
          ========================================================
          PRODUCT GRID (DRIBBBLE STYLE / MINIMALIST)
          ========================================================
        */}
        <motion.div className="mt-2 sm:mt-4">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-slate-200 shadow-sm"
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                  <Filter className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">محصولی یافت نشد</h3>
                <p className="text-slate-500 mb-8 max-w-md">هیچ محصولی با این فیلترها وجود ندارد. لطفاً کلمات کلیدی یا دسته‌بندی را تغییر دهید.</p>
                <button 
                  onClick={() => { handleSelectCategory('all'); setSearchQuery('');  }}
                  className="px-8 py-3 rounded-full bg-[#003F86] text-white font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
                >
                  نمایش همه محصولات
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                  {displayedProducts.map((product, index) => (
                    <motion.div
                      
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                      key={`${product.id}-${selectedCategory}`}
                      className="group bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transform-gpu will-change-transform border border-slate-100 transition-all duration-300 flex flex-col"
                    >
                    {/* Image Area */}
                    <div 
                      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 mb-6 cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      <LazyImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                      {/* Floating Badges */}
                      <div className="absolute top-4 right-4 bg-white/90  px-4 py-1.5 rounded-full text-[11px] font-bold text-[#003F86] shadow-sm border border-white">
                        {product.categoryTitle.replace(/ مرغداری$/, '')}
                      </div>
                      
                      
                    </div>

                    {/* Content Area */}
                    <div className="px-2 flex-1 flex flex-col">
                      <div className="text-xs text-slate-400 font-bold mb-2">
                        کد محصول: {product.code}
                      </div>
                      
                      <h3 
                        className="text-xl md:text-2xl font-black text-slate-900 mb-8 group-hover:text-[#003F86] transition-colors cursor-pointer line-clamp-2"
                        onClick={() => onSelectProduct(product)}
                      >
                        {product.name}
                      </h3>

                      {/* Action Buttons */}
                      <div className="mt-auto flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRequestQuoteForProduct(product);
                          }}
                          className="flex-1 bg-[#003F86] hover:bg-blue-800 text-white py-3.5 px-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 flex justify-center items-center gap-2"
                        >
                          <PhoneCall className="w-4 h-4" />
                          استعلام قیمت
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="w-14 h-14 shrink-0 flex justify-center items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-2xl transition-colors"
                          title="مشاهده جزئیات کامل"
                        >
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          {/* Lazy Load Trigger */}
          {visibleCount < filteredProducts.length && (
            <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center mt-8">
              <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin opacity-50" />
            </div>
          )}
        </motion.div>

    </section>
  );
};
