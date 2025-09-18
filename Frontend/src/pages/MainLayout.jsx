import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import Region from './Region';
import InputData from './InputData';
import Profile from './Profile';

export default function MainLayout() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('health');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'health':
        return <Region />;
      case 'input-data':
        return <InputData />;
      case 'profile':
        return <Profile />;
      default:
        return <Region />;
    }
  };

  return (
    
    <div className="flex flex-col h-screen bg-gray-50">
      
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>

      <div className="flex border-t bg-white shadow-lg">
        <Button
          variant={activeTab === 'health' ? 'default' : 'ghost'}
          className="flex-1 flex-col h-16 gap-1"
          onClick={() => setActiveTab('health')}
        >
          <span className="material-icons text-lg">public</span>
          <span className="text-xs">{t('health')}</span>
        </Button>

        <Button
          variant={activeTab === 'input-data' ? 'default' : 'ghost'}
          className="flex-1 flex-col h-16 gap-1"
          onClick={() => setActiveTab('input-data')}
        >
          <span className="material-icons text-lg">data_usage</span>
          <span className="text-xs">{t('inputData')}</span>
        </Button>

        <Button
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          className="flex-1 flex-col h-16 gap-1"
          onClick={() => setActiveTab('profile')}
        >
          <span className="material-icons text-lg">person</span>
          <span className="text-xs">{t('profile')}</span>
        </Button>
      </div>
    </div>
  );
}