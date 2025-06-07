import React, { useState } from 'react';
import { Activity, Shield, HelpCircle, Settings } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BodyModelViewer from './components/BodyModel/BodyModelViewer';
import PainSelectionPanel from './components/UI/PainSelectionPanel';
import RecommendationPanel from './components/UI/RecommendationPanel';
import ExerciseSession from './components/UI/ExerciseSession';
import PrivacyNotice from './components/UI/PrivacyNotice';
import HelpOverlay from './components/UI/HelpOverlay';
import SettingsPanel from './components/UI/SettingsPanel';
import { PainDataProvider } from './contexts/PainDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExerciseSession, setShowExerciseSession] = useState(false);

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <PainDataProvider>
          <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
            {/* Header */}
            <header className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-40">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <Activity className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                        PainRelief
                      </h1>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Privacy-Focused Pain Management
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Privacy Badge */}
                    <button
                      onClick={() => setShowPrivacyNotice(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      aria-label="Privacy information"
                    >
                      <Shield size={16} />
                      <span className="text-sm font-medium">Privacy First</span>
                    </button>
                    
                    {/* Help Button */}
                    <button
                      onClick={() => setShowHelp(true)}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Help"
                    >
                      <HelpCircle size={20} />
                    </button>
                    
                    {/* Settings Button */}
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Settings"
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-140px)]">
                {/* 3D Model Container - 60% width on large screens */}
                <div className="lg:col-span-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden">
                  <div className="h-full relative">
                    <BodyModelViewer />
                    
                    {/* Data Privacy Notice Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg p-3 border border-neutral-200/50 dark:border-neutral-700/50">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                          <Shield size={16} className="text-green-600" />
                          All data stays on your device - no server communication
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Side Panel - 40% width on large screens */}
                <div className="lg:col-span-2 space-y-6 overflow-y-auto">
                  {/* Pain Selection Panel */}
                  <PainSelectionPanel onStartSession={() => setShowExerciseSession(true)} />
                  
                  {/* Recommendations Panel */}
                  <RecommendationPanel />
                </div>
              </div>
            </main>
            
            {/* Modals and Overlays */}
            {showPrivacyNotice && (
              <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
            )}
            
            {showHelp && (
              <HelpOverlay onClose={() => setShowHelp(false)} />
            )}
            
            {showSettings && (
              <SettingsPanel onClose={() => setShowSettings(false)} />
            )}
            
            {showExerciseSession && (
              <ExerciseSession onClose={() => setShowExerciseSession(false)} />
            )}
          </div>
        </PainDataProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;