import React, { useState } from 'react';
import { Send, User, Phone, FileText, Layers, CheckCircle2 } from 'lucide-react';

interface FreeConsultationFormProps {
  initialSubject?: string;
  initialProduct?: string;
  initialMessage?: string;
  className?: string;
}

export const FreeConsultationForm: React.FC<FreeConsultationFormProps> = ({
  initialSubject = '',
  initialProduct = '',
  initialMessage = '',
  className = ''
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    subject: initialSubject || 'مرغداری گوشتی',
    message: initialMessage + (initialProduct ? ` \nمحصول مورد نظر: ${initialProduct}` : ''),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setFormData({
        fullName: '',
        phoneNumber: '',
        subject: 'مرغداری گوشتی',
        message: '',
      });
    }, 1200);
  };

  return (
    <div className={`bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 flex flex-col relative overflow-hidden ${className}`}>
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(239,246,255,0.5)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(255,251,235,0.5)_0%,_transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-8 text-center sm:text-right">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">درخواست مشاوره تخصصی</h3>
        <p className="text-sm text-slate-500 font-medium">لطفاً فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.</p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100/50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-800 mb-2">درخواست شما ثبت شد!</h4>
            <p className="text-sm text-slate-500 text-center max-w-xs leading-relaxed">
              کارشناسان طیوران صنعت پویا به زودی برای مشاوره رایگان با شما تماس خواهند گرفت.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700 block">
                  نام و نام خانوادگی <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#003F86] transition-colors" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="نام خود را وارد کنید"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-11 pl-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:ring-4 focus:ring-[#003F86]/10 transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700 block">
                  شماره تماس <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#003F86] transition-colors" />
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="۰۹۱۲..."
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-11 pl-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:ring-4 focus:ring-[#003F86]/10 transition-all text-right font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 block">
                موضوع مشاوره
              </label>
              <div className="relative group">
                <Layers className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#003F86] transition-colors" />
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-11 pl-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#003F86] focus:ring-4 focus:ring-[#003F86]/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="مرغداری گوشتی">ماشین‌آلات و تجهیزات مرغداری</option>
                  <option value="کارخانه خوراک و مکمل">احداث کارخانه خوراک دام و طیور</option>
                  <option value="سوله و سالن صنعتی">ساخت سوله و سالن‌های صنعتی</option>
                  <option value="تجهیزات گرمایشی و جت هیتر">سیستم‌های گرمایشی و تهویه</option>
                  <option value="استعلام قیمت">استعلام قیمت</option>
                  <option value="سایر موارد">مشاوره عمومی / سایر</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 block">
                توضیحات تکمیلی
              </label>
              <div className="relative group">
                <FileText className="w-4 h-4 text-slate-400 absolute right-4 top-4 group-focus-within:text-[#003F86] transition-colors" />
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اگر جزئیات خاصی در نظر دارید، اینجا بنویسید..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-11 pl-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:ring-4 focus:ring-[#003F86]/10 transition-all resize-none leading-relaxed"
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-l from-[#003F86] to-[#0052A3] hover:from-[#002b5e] hover:to-[#004282] text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>ثبت درخواست مشاوره رایگان</span>
                    <Send className="w-4 h-4 -mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
