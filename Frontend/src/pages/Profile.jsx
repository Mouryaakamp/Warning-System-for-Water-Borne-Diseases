import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useLanguage();
  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2024',
    totalDataEntries: 15,
  });

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'kn', label: 'ಕನ್ನಡ' },
    { value: 'as', label: 'অসমীয়া' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'brx', label: 'बड़ो' },
    { value: 'mni', label: 'মৈতৈলোন্' },
    { value: 'ne', label: 'नेपाली' },
  ];

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    if (window.confirm(t('logoutConfirm'))) {
      navigate('/login');
    }
  };

  const handleEditProfile = () => {
    alert(t('editProfileComing'));
  };

  const handleSettings = () => {
    alert(t('settingsComing'));
  };

  const handleHelp = () => {
    alert(t('helpComing'));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-4">
        {/* Profile Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('selectLanguage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('chooseLanguage')} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* User Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('accountStatistics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userInfo.totalDataEntries}</div>
                <div className="text-sm text-gray-600">{t('dataEntries')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">{t('regions')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('accountDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">{t('phone')}</span>
              <span className="text-gray-600">{userInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('memberSince')}</span>
              <span className="text-gray-600">{userInfo.joinDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleEditProfile} className="w-full">
            {t('editProfile')}
          </Button>
          
          <Button onClick={handleSettings} variant="secondary" className="w-full">
            {t('settings')}
          </Button>
          
          <Button onClick={handleHelp} variant="secondary" className="w-full">
            {t('helpSupport')}
          </Button>
          
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            {t('logout')}
          </Button>
        </div>
      </div>
    </div>
  );
}