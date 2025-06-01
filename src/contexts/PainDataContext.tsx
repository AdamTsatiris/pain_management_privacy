import React, { createContext, useContext, useState, useEffect } from 'react';
import { BodyRegion, PainData } from '../models/types';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '../utils/localStorageUtils';

interface PainDataContextType {
  painData: PainData[];
  selectedRegion: BodyRegion | null;
  painIntensity: number;
  selectRegion: (region: BodyRegion | null) => void;
  setPainIntensity: (intensity: number) => void;
  savePainData: () => void;
  clearPainData: () => void;
}

const PainDataContext = createContext<PainDataContextType | undefined>(undefined);

export const PainDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [painData, setPainData] = useState<PainData[]>(() => {
    return getLocalStorageItem('painrelief-data', []);
  });
  
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  const [painIntensity, setPainIntensity] = useState<number>(5);

  useEffect(() => {
    setLocalStorageItem('painrelief-data', painData);
  }, [painData]);

  const selectRegion = (region: BodyRegion | null) => {
    setSelectedRegion(region);
  };

  const savePainData = () => {
    if (!selectedRegion) return;
    
    const newEntry: PainData = {
      id: crypto.randomUUID(),
      region: selectedRegion,
      intensity: painIntensity,
      timestamp: new Date().toISOString(),
    };
    
    setPainData(prev => [newEntry, ...prev]);
    setSelectedRegion(null);
    setPainIntensity(5);
  };

  const clearPainData = () => {
    setPainData([]);
    removeLocalStorageItem('painrelief-data');
    setSelectedRegion(null);
    setPainIntensity(5);
  };

  return (
    <PainDataContext.Provider
      value={{
        painData,
        selectedRegion,
        painIntensity,
        selectRegion,
        setPainIntensity,
        savePainData,
        clearPainData,
      }}
    >
      {children}
    </PainDataContext.Provider>
  );
};

export const usePainData = (): PainDataContextType => {
  const context = useContext(PainDataContext);
  if (context === undefined) {
    throw new Error('usePainData must be used within a PainDataProvider');
  }
  return context;
};