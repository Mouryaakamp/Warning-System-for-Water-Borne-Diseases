import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';

export default function AdminLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const navigate = useNavigate();
  const { t, changeLanguage } = useLanguage();

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

  const districts = [
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tripura', label: 'Tripura' },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAdminLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert(t('pleaseEnterBoth'));
      return;
    }

    if (username !== 'abcd' || password !== '12345678') {
      alert('Invalid admin credentials');
      return;
    }

    if (!selectedDistrict) {
      alert('Please select a district');
      return;
    }

    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="absolute top-4 left-4 text-blue-600"
        >
          ← Back
        </Button>

        <CardHeader className="text-center pt-12">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Administrator Access</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('selectLanguage')}</label>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('chooseLanguage')} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">District</label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('username')}</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('enterUsername')}
              autoCapitalize="none"
              autoCorrect="false"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
              autoCapitalize="none"
              autoCorrect="false"
            />
          </div>

          <Button 
            onClick={handleAdminLogin}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Admin Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}