import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  X, 
  Save, 
  AlertCircle,
  Building,
  Check,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { QuoteRequest } from '../../types';

export const QuotesTab: React.FC = () => {
  const { quoteRequests, updateQuoteStatus, deleteQuoteRequest } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewingQuote, setViewingQuote] = useState<QuoteRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const statusOptions = [
    { value: 'new', label: 'جدید و بررسی نشده', badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { value: 'in_review', label: 'در حال بررسی مهندسی', badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { value: 'contacted', label: 'تماس اولیه گرفته شد', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { value: 'completed', label: 'استعلام قیمت ارسال شد', badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
    { value: 'archived', label: 'بایگانی شده', badgeClass: 'bg-slate-800 text-slate-400 border-slate-700' },
  ];

  const openQuoteModal = (q: QuoteRequest) => {
    setViewingQuote(q);
    setAdminNote(q.adminNotes || '');
  };

  const handleSaveNote = () => {
    if (viewingQuote) {
      updateQuoteStatus(viewingQuote.id, viewingQuote.status, adminNote);
      setViewingQuote({ ...viewingQuote, adminNotes: adminNote });
    }
  };

  const handleChangeStatus = (status: QuoteRequest['status']) => {
    if (viewingQuote) {
      updateQuoteStatus(viewingQuote.id, status, adminNote);
      setViewingQuote({ ...viewingQuote, status });
    }
  };

  const filteredQuotes = quoteRequests.filter(q => {
    const matchesSearch = 
      q.formData.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.formData.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.formData.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.formData.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>صندوق درخواست‌های استعلام استعلام قیمت ({quoteRequests.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            مدیریت سرنخ‌های فروش، بررسی متراژ سالن و تجهیزات انتخابی متقاضیان
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو بر اساس نام متقاضی، شماره موبایل، شهر، نوع پروژه..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 pl-10 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-amber-400"
        >
          <option value="all">همه وضعیت‌ها ({quoteRequests.length})</option>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Quotes Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold">
              <tr>
                <th className="p-3.5">نام متقاضی</th>
                <th className="p-3.5">شماره تماس</th>
                <th className="p-3.5">نوع پروژه و ظرفیت</th>
                <th className="p-3.5">شهر / استان</th>
                <th className="p-3.5">تاریخ ثبت</th>
                <th className="p-3.5">وضعیت</th>
                <th className="p-3.5 text-center">جزئیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    درخواستی با این مشخصات یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => {
                  const statusObj = statusOptions.find(s => s.value === q.status);
                  return (
                    <tr key={q.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {q.formData.fullName}
                      </td>
                      <td className="p-3.5 font-mono text-amber-400 font-bold">
                        <a href={`tel:${q.formData.phoneNumber}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{q.formData.phoneNumber}</span>
                        </a>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-200 font-medium block">{q.formData.projectType}</span>
                        <span className="text-[11px] text-slate-400 block">{q.formData.capacity}</span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {q.formData.city}
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {q.createdAt}
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold inline-block ${statusObj?.badgeClass}`}>
                          {statusObj?.label}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openQuoteModal(q)}
                            className="px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>بررسی</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(q.id)}
                            className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80  flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>تایید حذف استعلام قیمت</span>
            </h3>
            <p className="text-xs text-slate-300">آیا از حذف این رکورد استعلام قیمت اطمینان دارید؟</p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  deleteQuoteRequest(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3.5 py-2 bg-rose-600 text-white rounded-xl text-xs font-black"
              >
                حذف قطعی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail & Action Modal */}
      {viewingQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80  flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-black text-white">جزئیات درخواست استعلام قیمت</h3>
                  <span className="text-[11px] text-slate-400 font-mono">شناسه: {viewingQuote.id} • {viewingQuote.createdAt}</span>
                </div>
              </div>
              <button
                onClick={() => setViewingQuote(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Information Card */}
            <div className="bg-slate-950/85 p-4 rounded-3xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">نام و نام خانوادگی متقاضی:</span>
                <span className="text-white font-bold text-sm block mt-0.5">{viewingQuote.formData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">شماره تماس مستقیم:</span>
                <a 
                  href={`tel:${viewingQuote.formData.phoneNumber}`}
                  className="text-amber-400 hover:underline font-mono font-bold text-sm block mt-0.5"
                >
                  {viewingQuote.formData.phoneNumber}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">نوع پروژه:</span>
                <span className="text-slate-200 font-medium block mt-0.5">{viewingQuote.formData.projectType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">ظرفیت / ابعاد سالن:</span>
                <span className="text-slate-200 font-medium block mt-0.5">{viewingQuote.formData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">استان و شهر:</span>
                <span className="text-slate-200 font-medium block mt-0.5">{viewingQuote.formData.city}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">زمان‌بندی احداث یا تجهیز:</span>
                <span className="text-slate-200 font-medium block mt-0.5">{viewingQuote.formData.timeline || 'فوری'}</span>
              </div>
            </div>

            {/* Equipment Needed Checklist */}
            {viewingQuote.formData.equipmentNeeded && viewingQuote.formData.equipmentNeeded.length > 0 && (
              <div className="bg-slate-950/85 p-4 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">تجهیزات و خدمات مورد نیاز متقاضی:</span>
                <div className="flex flex-wrap gap-2">
                  {viewingQuote.formData.equipmentNeeded.map((eq, eIdx) => (
                    <span key={eIdx} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-xl text-xs font-medium">
                      ✓ {eq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Note */}
            {viewingQuote.formData.additionalNotes && (
              <div className="bg-slate-950/85 p-4 rounded-3xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400 block">توضیحات تکمیلی مشتری:</span>
                <p className="text-xs text-slate-200 leading-relaxed">{viewingQuote.formData.additionalNotes}</p>
              </div>
            )}

            {/* Status Change Buttons */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-300">تغییر وضعیت این درخواست:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => handleChangeStatus(s.value as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      viewingQuote.status === s.value
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">یادداشت داخلی تیم فروش و پیگیری</label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="ثبت نتیجه تماس با مشتری، شماره استعلام قیمت صادره، تاریخ پیگیری بعدی..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-amber-400 leading-relaxed"
              />
              <button
                type="button"
                onClick={handleSaveNote}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>ذخیره یادداشت پیگیری</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <a
                href={`tel:${viewingQuote.formData.phoneNumber}`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تماس با مشتری</span>
              </a>

              <button
                onClick={() => setViewingQuote(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                بستن پنجره
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
