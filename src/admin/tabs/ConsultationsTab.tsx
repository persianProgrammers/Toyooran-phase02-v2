import React, { useState } from 'react';
import { 
  MessageSquareText, 
  Search, 
  Phone, 
  Calendar, 
  Trash2, 
  Eye, 
  X, 
  Save, 
  AlertCircle, 
  PhoneCall,
  User
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ConsultationRequest } from '../../types';

export const ConsultationsTab: React.FC = () => {
  const { consultationRequests, updateConsultationStatus, deleteConsultationRequest } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewingConsultation, setViewingConsultation] = useState<ConsultationRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const statusOptions = [
    { value: 'new', label: 'جدید و پاسخ داده نشده', badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
    { value: 'contacted', label: 'پاسخ داده شد / تماس گرفته شد', badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { value: 'archived', label: 'بایگانی شده', badgeClass: 'bg-slate-800 text-slate-400 border-slate-700' },
  ];

  const openModal = (c: ConsultationRequest) => {
    setViewingConsultation(c);
    setAdminNote(c.adminNotes || '');
  };

  const handleSaveNote = () => {
    if (viewingConsultation) {
      updateConsultationStatus(viewingConsultation.id, viewingConsultation.status, adminNote);
      setViewingConsultation({ ...viewingConsultation, adminNotes: adminNote });
    }
  };

  const handleChangeStatus = (status: ConsultationRequest['status']) => {
    if (viewingConsultation) {
      updateConsultationStatus(viewingConsultation.id, status, adminNote);
      setViewingConsultation({ ...viewingConsultation, status });
    }
  };

  const filtered = consultationRequests.filter(c => {
    const matchesSearch = 
      c.formData.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.formData.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.formData.message && c.formData.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-amber-400" />
            <span>صندوق پیام‌ها و درخواست‌های مشاوره فوری ({consultationRequests.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            پیام‌های ارسال شده از بخش تماس، مشاوره فنی هوشمند و استعلام‌های کوتاه
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
            placeholder="جستجو در نام، شماره تماس یا متن پیام..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 pl-10 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-amber-400"
        >
          <option value="all">همه وضعیت‌ها ({consultationRequests.length})</option>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold">
              <tr>
                <th className="p-3.5">نام متقاضی</th>
                <th className="p-3.5">شماره تماس</th>
                <th className="p-3.5">خلاصه پیام</th>
                <th className="p-3.5">زمان ترجیحی تماس</th>
                <th className="p-3.5">تاریخ ثبت</th>
                <th className="p-3.5">وضعیت</th>
                <th className="p-3.5 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    پیامی با این مشخصات یافت نشد.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const statusObj = statusOptions.find(s => s.value === c.status);
                  return (
                    <tr key={c.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {c.formData.fullName}
                      </td>
                      <td className="p-3.5 font-mono text-amber-400 font-bold">
                        <a href={`tel:${c.formData.phoneNumber}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{c.formData.phoneNumber}</span>
                        </a>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs truncate">
                        {c.formData.message || '—'}
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {c.formData.preferredTime || 'در اولین فرصت'}
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {c.createdAt}
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold inline-block ${statusObj?.badgeClass}`}>
                          {statusObj?.label}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openModal(c)}
                            className="px-2.5 py-1.5 bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>بررسی</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(c.id)}
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

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80  flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>تایید حذف پیام مشاوره</span>
            </h3>
            <p className="text-xs text-slate-300">آیا از حذف این پیام اطمینان دارید؟</p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  deleteConsultationRequest(deleteConfirmId);
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

      {/* Detail Modal */}
      {viewingConsultation && (
        <div className="fixed inset-0 z-50 bg-slate-950/80  flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">پیام مشاوره و تماس</h3>
              </div>
              <button
                onClick={() => setViewingConsultation(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950/85 p-4 rounded-3xl border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">نام متقاضی:</span>
                <span className="text-white font-bold">{viewingConsultation.formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">شماره تلفن:</span>
                <a href={`tel:${viewingConsultation.formData.phoneNumber}`} className="text-amber-400 font-mono font-bold hover:underline">
                  {viewingConsultation.formData.phoneNumber}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">زمان ترجیحی تماس:</span>
                <span className="text-slate-200">{viewingConsultation.formData.preferredTime || 'هر زمان'}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">متن پیام یا سوال فنی:</span>
                <p className="text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                  {viewingConsultation.formData.message || 'درخواست تماس سریع برای مشاوره خط تولید و تجهیزات مرغداری'}
                </p>
              </div>
            </div>

            {/* Status Change */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">وضعیت پیگیری:</label>
              <div className="grid grid-cols-3 gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => handleChangeStatus(s.value as any)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      viewingConsultation.status === s.value
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Note */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">یادداشت داخلی</label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={2}
                placeholder="یادداشت پیگیری..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleSaveNote}
                className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                ذخیره یادداشت
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <a
                href={`tel:${viewingConsultation.formData.phoneNumber}`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>برقراری تماس</span>
              </a>

              <button
                onClick={() => setViewingConsultation(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                بستن
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
