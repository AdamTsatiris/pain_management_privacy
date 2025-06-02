import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilityPreferences } from '../models/types';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorageUtils';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (newPrefs: Partial<AccessibilityPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  fontSize: 'normal',
  reduceMotion: false,
  screenReaderOptimized: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    return getLocalStorageItem('accessibility-preferences', defaultPreferences);
  });

  useEffect(() => {
    setLocalStorageItem('accessibility-preferences', preferences);
    
    // Apply accessibility classes to root element
    const root = document.documentElement;
    
    // High contrast mode
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Font size
    root.classList.remove('text-normal', 'text-large', 'text-x-large');
    root.classList.add(`text-${preferences.fontSize}`);
    
    // Reduced motion
    if (preferences.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Screen reader optimizations
    if (preferences.screenReaderOptimized) {
      root.classList.add('sr-optimized');
    } else {
      root.classList.remove('sr-optimized');
    }
  }, [preferences]);

  const updatePreferences = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};