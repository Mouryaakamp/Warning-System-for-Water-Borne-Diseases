import React, { createContext, useContext, useState } from 'react';

const RegionContext = createContext();

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};

export const RegionProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const value = {
    selectedRegion,
    setSelectedRegion,
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
};