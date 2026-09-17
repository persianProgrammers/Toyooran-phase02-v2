import React from 'react';
import { Award, Layers, ShieldCheck, Factory, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const TrustBar: React.FC = () => {
  const trustMetrics = [
    {
      icon: Award,
      value: '۵۰+ سال',
      label: 'تجربه و سابقه صنعتی',
      detail: 'بیش از ۵۰ سال تجربه در صنعت دام، طیور و آبزیان'
    },
    {
      icon: Layers,
      value: '۲۰۰+ پروژه',
      label: 'پروژه ملی و بین‌المللی',
      detail: 'اجرای فارم‌های گوشتی، تخم‌گذار، مادر و کارخانجات خوراک'
    },
    {
      icon: Factory,
      value: 'صفر تا ۱۰۰',
      label: 'طراحی، ساخت و تجهیز',
      detail: 'پوشش زنجیره کامل از نقشه و سوله تا خطوط اتوماسیون'
    },
    {
      icon: ShieldCheck,
      value: 'استاندارد مهندسی',
      label: 'گارانتی و خدمات پس از فروش',
      detail: 'تضمین اصالت متریال، تأمین قطعات فابریک و اورهال تخصصی'
    }
  ];

  return (
    <div className="w-full bg-white border-y border-slate-200 py-6 my-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#003F86]">
                  <Icon className="w-6 h-6 text-[#003F86]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-xs font-bold text-[#003F86]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-normal font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
