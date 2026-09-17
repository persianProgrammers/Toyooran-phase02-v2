import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  LogOut, 
  Sparkles, 
  Layers, 
  Bell,
  UserCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface AdminHeaderProps {
  onViewPublicSite: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onViewPublicSite }) => {
  const { adminUser, logout, quoteRequests, consultationRequests } = useData();

  const newQuotesCount = quoteRequests.filter(q => q.status === 'new').length;
  const newConsultationsCount = consultationRequests.filter(c => c.status === 'new').length;
  const totalPending = newQuotesCount + newConsultationsCount;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left / Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#003F86] border border-amber-400/80 flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 border-2 border-amber-400 rounded-lg transform rotate-45 flex items-center justify-center bg-[#003F86]">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">طیوران صنعت پویا</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                پنل مدیریت جامع
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block font-normal">
              سامانه کنترل داینامیک محتوا، محصولات، سفارشات و پایگاه دانش
            </span>
          </div>
        </div>

        {/* Right / Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Inquiries Notification Pill */}
          {totalPending > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{totalPending} درخواست بررسی نشده</span>
            </div>
          )}

          {/* View Live Public Site */}
          <button
            onClick={onViewPublicSite}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all shadow-sm group"
            title="مشاهده ظاهر سایت برای مشتریان"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">مشاهده وب‌سایت اصلی</span>
            <span className="md:hidden">مشاهده سایت</span>
          </button>

          {/* User Profile Tag */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-950/85 border border-slate-800 px-3 py-1.5 rounded-xl">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-200 block">
                {adminUser?.displayName || 'مدیر ارشد'}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                @{adminUser?.username || 'admin'}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-200 border border-rose-800/40 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
            title="خروج از حساب مدیریت"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">خروج</span>
          </button>

        </div>

      </div>
    </header>
  );
};
