import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      welcomeBack: 'Welcome Back',
      pleaseSignIn: 'Please sign in to continue',
      username: 'Username',
      password: 'Password',
      enterUsername: 'Enter your username',
      enterPassword: 'Enter your password',
      login: 'Login',
      pleaseEnterBoth: 'Please enter both username and password',
      usernameMinLength: 'Username must be at least 3 characters long',
      passwordMinLength: 'Password must be at least 6 characters long',
      region: 'Region',
      inputData: 'Input Data',
      profile: 'Profile',
      regions: 'Regions',
      selectRegionToExplore: 'Select a region to explore',
      selectRegionDropdown: 'Select Region',
      chooseRegionToExplore: 'Choose a region to explore',
      inputDataTitle: 'Input Data',
      enterInformation: 'Enter your information',
      fullName: 'Full Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      address: 'Address',
      notes: 'Notes',
      enterFullName: 'Enter your full name',
      enterEmail: 'Enter your email',
      enterPhone: 'Enter your phone number',
      enterAddress: 'Enter your address',
      additionalNotes: 'Any additional notes...',
      submitData: 'Submit Data',
      pleaseEnterName: 'Please enter your name',
      pleaseEnterEmail: 'Please enter your email',
      validEmail: 'Please enter a valid email address',
      dataSubmitted: 'Data submitted successfully!',
      profileTitle: 'Profile',
      manageAccount: 'Manage your account',
      accountStatistics: 'Account Statistics',
      dataEntries: 'Data Entries',
      accountDetails: 'Account Details',
      phone: 'Phone',
      memberSince: 'Member Since',
      editProfile: 'Edit Profile',
      settings: 'Settings',
      helpSupport: 'Help & Support',
      logout: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      editProfileComing: 'Profile editing feature coming soon!',
      settingsComing: 'Settings feature coming soon!',
      helpComing: 'Help feature coming soon!',
      selectLanguage: 'Select Language',
      chooseLanguage: 'Choose your language',
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};