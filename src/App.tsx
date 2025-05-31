import React, { useState } from 'react';
import { Activity, HelpCircle, Settings } from 'lucide-react';
import MainLayout from './layouts/MainLayout';
import BodyModelViewer from './components/BodyModel/BodyModelViewer';
import PainIntensitySlider from './components/UI/PainIntensitySlider';
import RecommendationPanel from './components/UI/RecommendationPanel';
import SettingsPanel from './components/UI/SettingsPanel';
import HelpOverlay from './components/UI/HelpOverlay';
import PrivacyNotice from './components/UI/PrivacyNotice';
import { useTheme } from './contexts/ThemeContext';
import { usePainData } from './contexts/PainDataContext';

function App() {
  const { theme } = useTheme();
  const { selectedRegion } = usePainData();
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-neutral-800 shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="text-primary-500" />
            <h1 className="text-xl font-semibold">PainRelief</h1>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-secondary p-2"
              onClick={() => setShowHelp(true)}
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
            <button
              className="btn btn-secondary p-2"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* 3D Model Container */}
          <div className="w-full lg:w-2/3 h-[40vh] lg:h-full relative">
            <BodyModelViewer />
            {!selectedRegion && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-neutral-500 dark:text-neutral-400 pointer-events-none">
                <p>Rotate and click on a body region to select</p>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-1/3 p-4 overflow-y-auto bg-neutral-50 dark:bg-neutral-900">
            <PainIntensitySlider />
            <RecommendationPanel />
          </div>
        </div>

        {/* Modals */}
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
        
        {showHelp && (
          <HelpOverlay onClose={() => setShowHelp(false)} />
        )}

        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
      </div>
    </MainLayout>
  );
}

export default App;