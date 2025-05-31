import React from 'react';
import { X, Moon, Sun, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePainData } from '../../contexts/PainDataContext';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { clearPainData } = usePainData();
  const [showDataClearConfirm, setShowDataClearConfirm] = React.useState(false);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Appearance</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Switch between light and dark theme
              </p>
            </div>
            <button 
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-700"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          {/* Privacy Notice */}
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-900">
            <h3 className="font-medium mb-2">Privacy Information</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              All your pain data is stored locally on your device and never sent to any server.
              The recommendations are generated entirely on your device.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              This application does not use cookies or tracking technologies.
            </p>
          </div>
          
          {/* Data Management */}
          <div>
            <h3 className="font-medium mb-2">Data Management</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Clear all your saved pain data from this device
            </p>
            
            {!showDataClearConfirm ? (
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDataClearConfirm(true)}
                aria-label="Clear all data"
              >
                <Trash2 size={16} className="mr-2" />
                Clear All Data
              </button>
            ) : (
              <div className="border border-alert-300 rounded-lg p-4 bg-alert-50 dark:bg-neutral-900 dark:border-alert-500">
                <p className="text-sm text-alert-700 dark:text-alert-400 mb-3">
                  Are you sure? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button 
                    className="btn bg-alert-500 text-white hover:bg-alert-600"
                    onClick={() => {
                      clearPainData();
                      setShowDataClearConfirm(false);
                    }}
                    aria-label="Confirm clear data"
                  >
                    Yes, Clear Data
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowDataClearConfirm(false)}
                    aria-label="Cancel clear data"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-right">
          <button 
            className="btn btn-primary"
            onClick={onClose}
            aria-label="Close settings"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;