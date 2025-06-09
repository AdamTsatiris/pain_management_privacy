import React, { useState, useEffect } from 'react';
import { Activity, Shield, HelpCircle, Settings, AlertTriangle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BodyModelViewer from './components/BodyModel/BodyModelViewer';
import PainSelectionPanel from './components/UI/PainSelectionPanel';
import RecommendationPanel from './components/UI/RecommendationPanel';
import ExerciseSession from './components/UI/ExerciseSession';
import PrivacyNotice from './components/UI/PrivacyNotice';
import HelpOverlay from './components/UI/HelpOverlay';
import SettingsPanel from './components/UI/SettingsPanel';
import MedicalDisclaimerModal from './components/UI/MedicalDisclaimerModal';
import { PainDataProvider } from './contexts/PainDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExerciseSession, setShowExerciseSession] = useState(false);
  const [showMedicalDisclaimer, setShowMedicalDisclaimer] = useState(false);

  // Check if user has seen medical disclaimer
  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('painrelief-medical-disclaimer-accepted');
    if (!hasSeenDisclaimer) {
      setShowMedicalDisclaimer(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('painrelief-medical-disclaimer-accepted', 'true');
    setShowMedicalDisclaimer(false);
  };

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <PainDataProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
            {/* Medical Disclaimer Header - Always Visible but Compact */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
              <div className="container mx-auto">
                <div className="flex items-center gap-3 text-sm">
                  <AlertTriangle className="text-amber-600 dark:text-amber-400 flex-shrink-0" size={16} />
                  <div className="text-amber-800 dark:text-amber-200 flex-1">
                    <strong>MEDICAL DISCLAIMER:</strong> This app provides general information only and is NOT a substitute for professional medical advice. Always consult your healthcare provider for persistent pain or before starting exercises.
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <header className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg border-b border-blue-200/50 dark:border-neutral-700/50 sticky top-0 z-40 shadow-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Activity className="text-white" size={24} />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                        PainRelief
                      </h1>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Professional Pain Management
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Privacy Badge */}
                    <button
                      onClick={() => setShowPrivacyNotice(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 rounded-lg hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-900/50 dark:hover:to-emerald-900/50 transition-all duration-200 shadow-sm"
                      aria-label="Privacy information"
                    >
                      <Shield size={16} />
                      <span className="text-sm font-medium">Privacy First</span>
                    </button>
                    
                    {/* Help Button */}
                    <button
                      onClick={() => setShowHelp(true)}
                      className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Help"
                    >
                      <HelpCircle size={20} className="text-blue-600 dark:text-blue-400" />
                    </button>
                    
                    {/* Settings Button */}
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Settings"
                    >
                      <Settings size={20} className="text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main Content - Fixed Layout to Prevent Blocking */}
            <main className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
                {/* 3D Model Container - 65% width, completely clear for interaction */}
                <div className="lg:col-span-8 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/30 dark:border-neutral-700/50 overflow-hidden">
                  <BodyModelViewer />
                </div>
                
                {/* Side Panel - 35% width, all disclaimers and content here */}
                <div className="lg:col-span-4 space-y-6 overflow-y-auto">
                  {/* Pain Selection Panel */}
                  <PainSelectionPanel onStartSession={() => setShowExerciseSession(true)} />
                  
                  {/* Recommendations Panel */}
                  <RecommendationPanel />
                  
                  {/* Privacy Notice in Sidebar */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="text-green-600 dark:text-green-400" size={20} />
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Privacy Protected
                      </h3>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      All data stays on your device. No server communication. Your privacy is guaranteed.
                    </p>
                  </div>
                </div>
              </div>
            </main>
            
            {/* Modals and Overlays */}
            {showMedicalDisclaimer && (
              <MedicalDisclaimerModal onAccept={handleAcceptDisclaimer} />
            )}
            
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