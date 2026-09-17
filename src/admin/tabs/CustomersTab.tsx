import React, { useState } from 'react';
import { Users, Search, Plus, Mail, Phone, Building, User, Trash2, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CustomerContact } from '../../types';

export const CustomersTab: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<CustomerContact | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<CustomerContact>>({});

  const filteredCustomers = customers.filter(c =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phoneNumber.includes(searchTerm) ||
    (c.companyName && c.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) return;

    if (isCreating) {
      addCustomer({
        id: 'cust-' + Date.now(),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email || '',
        companyName: formData.companyName || '',
        role: formData.role || '',
        source: 'manual',
        notes: formData.notes || '',
        createdAt: new Date().toISOString()
      });
    } else if (isEditing) {
      updateCustomer(isEditing.id, formData);
    }
    
    setIsCreating(false);
    setIsEditing(null);
    setFormData({});
  };

  const openEdit = (customer: CustomerContact) => {
    setIsEditing(customer);
    setFormData(customer);
  };

  const openCreate = () => {
    setIsCreating(true);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>مدیریت مخاطبین و مشتریان ({customers.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            مشاهده، افزودن و ویرایش اطلاعات مخاطبین و مشتریان
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن مخاطب جدید</span>
        </button>
      </div>

      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 focus-within:border-amber-400 transition-colors">
        <Search className="w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="جستجو با نام، موبایل یا نام شرکت..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-none text-white text-sm px-3 py-2 focus:outline-none placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full py-10 text-center text-slate-500 text-sm">
            هیچ مخاطبی یافت نشد.
          </div>
        ) : (
          filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{customer.fullName}</h3>
                    {customer.companyName && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                        <Building className="w-3 h-3" />
                        <span>{customer.companyName} {customer.role && `(${customer.role})`}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => openEdit(customer)}
                  className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                >
                  ویرایش
                </button>
              </div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span dir="ltr" className="font-mono">{customer.phoneNumber}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span dir="ltr">{customer.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80  overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl mt-10 mb-10">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                {isCreating ? 'افزودن مخاطب جدید' : 'ویرایش اطلاعات مخاطب'}
              </h3>
              <button 
                onClick={() => { setIsCreating(false); setIsEditing(null); }}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">شماره تماس *</label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={formData.phoneNumber || ''}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 text-left"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">نام شرکت / سازمان</label>
                  <input
                    type="text"
                    value={formData.companyName || ''}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">سمت شغلی</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">ایمیل</label>
                  <input
                    type="email"
                    dir="ltr"
                    value={formData.email || ''}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400 text-left"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">یادداشت‌های داخلی</label>
                  <textarea
                    rows={3}
                    value={formData.notes || ''}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-400"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-800 mt-6">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('آیا از حذف این مخاطب اطمینان دارید؟')) {
                        deleteCustomer(isEditing.id);
                        setIsEditing(null);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1.5 px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف مخاطب</span>
                  </button>
                ) : <div />}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setIsEditing(null); }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>ذخیره اطلاعات</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
