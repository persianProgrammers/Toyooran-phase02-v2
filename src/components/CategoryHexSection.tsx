import React from 'react';
import { 
  Wheat, 
  Droplets, 
  Fan, 
  Factory, 
  Warehouse, 
  Pill, 
  ArrowLeft, 
  ChevronLeft,
  Sparkles,
  Thermometer,
  Snowflake,
  Wind,
  LayoutGrid,
  Database,
  MoreHorizontal
} from 'lucide-react';
import { ProductCategory, PageSection, CategoryInfo } from '../types';
import { CATEGORIES_DATA } from '../data/mockData';
import { LazyImage } from './LazyImage';

interface CategoryHexSectionProps {
  categories?: CategoryInfo[];
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateToProducts: () => void;
}

export const CategoryHexSection: React.FC<CategoryHexSectionProps> = ({
  categories = CATEGORIES_DATA,
  onSelectCategory,
  onNavigateToProducts,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Thermometer,
    Fan,
    Droplets,
    Snowflake,
    Wind,
    Wheat,
    LayoutGrid,
    Database,
    MoreHorizontal,
    Factory,
    Warehouse,
    Pill
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003F86] bg-blue-50 px-3 py-1 rounded-full mb-2 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>دسته‌بندی تجهیزات تخصصی مرغداری و خطوط خوراک</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              محصولات و تجهیزات تخصصی
            </h2>
            <p className="text-xs text-sm text-slate-600 mt-1 font-normal">
              تأمین و ساخت قطعات استاندارد با بالاترین کیفیت مهندسی و بازدهی انرژی
            </p>
          </div>

          <button
            onClick={onNavigateToProducts}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#003F86] hover:text-[#00224b] transition-colors group"
          >
            <span>مشاهده همه محصولات و کاتالوگ‌ها</span>
            <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Clean Category Cards (As specified in section 9 of document) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Factory;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Image Preview Strip */}
                <div className="relative h-36 -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-100">
                  <LazyImage
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                    {cat.badge}
                  </span>

                  {/* Icon on Image */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/90  flex items-center justify-center text-[#003F86] shadow-sm">
                    <Icon className="w-5 h-5 text-[#003F86]" />
                  </div>
                </div>

                {/* Body Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#003F86] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">
                    {cat.titleEn}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-amber-600 transition-colors">
                    مشاهده تجهیزات این بخش
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#003F86] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
