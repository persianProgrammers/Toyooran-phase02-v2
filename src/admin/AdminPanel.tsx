import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { OverviewTab } from './tabs/OverviewTab';
import { ProductsTab } from './tabs/ProductsTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ArticlesTab } from './tabs/ArticlesTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { QuotesTab } from './tabs/QuotesTab';
import { ConsultationsTab } from './tabs/ConsultationsTab';
import { CustomersTab } from './tabs/CustomersTab';
import { CompanyCmsTab } from './tabs/CompanyCmsTab';
import { HeroCmsTab } from './tabs/HeroCmsTab';
import { AiConfigTab } from './tabs/AiConfigTab';
import { MediaTab } from './tabs/MediaTab';
import { BackupTab } from './tabs/BackupTab';
import { SecurityTab } from './tabs/SecurityTab';

interface AdminPanelProps {
  onViewPublicSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onViewPublicSite }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Estedad',sans-serif] flex flex-col" dir="rtl">
      
      {/* Top Navigation Bar */}
      <AdminHeader onViewPublicSite={onViewPublicSite} />

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar */}
        <AdminSidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-950/90">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'overview' && <OverviewTab onNavigateTab={setCurrentTab} />}
            {currentTab === 'products' && <ProductsTab />}
            {currentTab === 'projects' && <ProjectsTab />}
            {currentTab === 'services' && <ServicesTab />}
            {currentTab === 'articles' && <ArticlesTab />}
            {currentTab === 'categories' && <CategoriesTab />}
            {currentTab === 'quotes' && <QuotesTab />}
            {currentTab === 'consultations' && <ConsultationsTab />}
            {currentTab === 'customers' && <CustomersTab />}
            {currentTab === 'company' && <CompanyCmsTab />}
            {currentTab === 'hero' && <HeroCmsTab />}
            {currentTab === 'ai' && <AiConfigTab />}
            {currentTab === 'media' && <MediaTab />}
            {currentTab === 'backup' && <BackupTab />}
            {currentTab === 'security' && <SecurityTab />}
          </div>
        </main>

      </div>

    </div>
  );
};
