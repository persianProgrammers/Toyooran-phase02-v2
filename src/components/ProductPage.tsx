import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowRight, PhoneCall, Sparkles, Layers, Package, Zap, Settings } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { NotFoundPage } from './NotFoundPage';
import { SEO } from './SEO';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useData();

  const product = products.find(p => p.id === productId || p.code === productId);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title={`${product.name} | Toyooran`}
        description={product.shortDescription || product.fullDescription}
        ogType="product"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#003F86] transition-colors mb-8 text-sm font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به محصولات</span>
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* 1. عکس محصول */}
            <div className="bg-slate-100 p-8 lg:p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-l border-slate-200">
              <div className="relative w-full aspect-square max-w-lg rounded-3xl overflow-hidden shadow-sm bg-white border border-slate-200 mb-6">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto w-full max-w-lg pb-2 custom-scrollbar">
                  {product.gallery.map((img, idx) => (
                    <div key={idx} className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-slate-200 bg-white cursor-pointer hover:border-[#003F86] transition-colors">
                      <LazyImage
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {/* 4. دسته بندی */}
                  <span className="bg-blue-50 text-[#003F86] text-xs font-bold px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    {product.categoryTitle.replace(/ مرغداری$/, '')}
                  </span>
                  
                  {/* 2. کد محصول */}
                  <span className="font-mono text-sm font-black bg-amber-400/20 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-amber-400/30">
                    <Package className="w-4 h-4" />
                    کد: {product.code}
                  </span>
                </div>
                
                {/* 3. نام محصول */}
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-2">
                  {product.name}
                </h1>
                {product.nameEn && (
                  <h2 className="text-sm font-mono text-slate-400 tracking-wider">
                    {product.nameEn}
                  </h2>
                )}
              </div>

              {/* 5. معرفی محصول */}
              <div className="mb-10">
                <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  معرفی محصول
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium text-justify">
                  {product.fullDescription}
                </p>
              </div>

              {/* 6. ویژگی‌های محصول */}
              {product.advantages && product.advantages.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#003F86]" />
                    ویژگی‌های محصول
                  </h3>
                  <ul className="space-y-3">
                    {product.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 shrink-0 shadow-sm" />
                        <span className="text-sm text-slate-700 leading-relaxed font-bold">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7. مشخصات فنی محصول */}
              {product.specs && product.specs.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-500" />
                    مشخصات فنی
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-right text-sm text-slate-700">
                      <tbody>
                        {product.specs.map((spec, idx) => (
                          <tr key={idx} className="border-b border-slate-100 last:border-b-0 even:bg-slate-50">
                            <th className="py-3 px-4 font-bold bg-slate-100/50 w-1/3 whitespace-nowrap">{spec.label}</th>
                            <td className="py-3 px-4">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="flex-1 bg-[#003F86] hover:bg-blue-800 text-white py-4 px-8 rounded-2xl font-black text-base transition-all shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 flex justify-center items-center gap-3 group"
                >
                  <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>استعلام قیمت</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
