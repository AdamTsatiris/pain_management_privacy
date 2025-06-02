import React from 'react';
import { Settings, Eye, Type, Monitor, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const AccessibilityMenu: React.FC = () => {
  const { preferences, updatePreferences, resetPreferences } = useAccessibility();

  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg" role="dialog" aria-label="Accessibility settings">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings size={20} />
          Accessibility Settings
        </h2>
      </div>

      <div className="space-y-6">
        {/* High Contrast Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={20} />
            <label htmlFor="high-contrast" className="font-medium">
              High Contrast Mode
            </label>
          </div>
          <button
            id="high-contrast"
            role="switch"
            aria-checked={preferences.highContrast}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              preferences.highContrast ? 'bg-primary-500' : 'bg-neutral-200'
            }`}
            onClick={() => updatePreferences({ highContrast: !preferences.highContrast })}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Type size={20} />
            <label htmlFor="font-size" className="font-medium">
              Font Size
            </label>
          </div>
          <select
            id="font-size"
            value={preferences.fontSize}
            onChange={(e) => updatePreferences({ fontSize: e.target.value as 'normal' | 'large' | 'x-large' })}
            className="w-full p-2 border rounded-md bg-white dark:bg-neutral-700"
            aria-label="Select font size"
          >
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        {/* Reduce Motion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor size={20} />
            <label htmlFor="reduce-motion" className="font-medium">
              Reduce Motion
            </label>
          </div>
          <button
            id="reduce-motion"
            role="switch"
            aria-checked={preferences.reduceMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              preferences.reduceMotion ? 'bg-primary-500' : 'bg-neutral-200'
            }`}
            onClick={() => updatePreferences({ reduceMotion: !preferences.reduceMotion })}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.reduceMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Screen Reader Optimizations */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={20} />
            <label htmlFor="screen-reader" className="font-medium">
              Screen Reader Optimizations
            </label>
          </div>
          <button
            id="screen-reader"
            role="switch"
            aria-checked={preferences.screenReaderOptimized}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              preferences.screenReaderOptimized ? 'bg-primary-500' : 'bg-neutral-200'
            }`}
            onClick={() => updatePreferences({ screenReaderOptimized: !preferences.screenReaderOptimized })}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.screenReaderOptimized ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetPreferences}
          className="w-full flex items-center justify-center gap-2 p-2 mt-4 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
          aria-label="Reset accessibility settings to defaults"
        >
          <RotateCcw size={16} />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;