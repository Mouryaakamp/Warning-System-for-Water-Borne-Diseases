import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[taluk,settaluk]=useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en');
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
  const talukOptions = ["Taluk1", "Taluk2", "Taluk3"]
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language);
  };

const handleLogin = async () => {
  if (!taluk || username.trim() === '' || password.trim() === '') {
    alert(t('pleaseEnterAllFields'));
    return;
  }

  if (username.length < 3) {
    alert(t('usernameMinLength'));
    return;
  }

  if (password.length < 6) {
    alert(t('passwordMinLength'));
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, taluk }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // ✅ Store token in localStorage
    localStorage.setItem("token", data.token);

    alert(`✅ Login successful for Taluk: ${taluk}`);
    navigate("/main");
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};



  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <CardTitle className="text-2xl">{t('welcomeBack')}</CardTitle>
          <CardDescription>{t('pleaseSignIn')}</CardDescription>
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

            <label className="text-sm font-medium">Taluk Name</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {taluk||"Select Taluk"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Taluk</DropdownMenuLabel>
                {talukOptions.map((taluk) => (
                  <DropdownMenuItem
                    key={taluk}
                    onClick={() => settaluk(taluk)}
                  >
                    {taluk}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>


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
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {t('login')}
          </Button>

          <Button
            onClick={handleAdminLogin}
            variant="secondary"
            className="w-full"
          >
            Admin Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}