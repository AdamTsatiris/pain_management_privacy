import React from 'react';
import { usePainData } from '../../contexts/PainDataContext';
import { getPainColor } from '../../utils/colorUtils';
import { getRegionDisplayName } from '../../utils/regionUtils';
import { Save, X, Play, Sliders } from 'lucide-react';

interface PainSelectionPanelProps {
  onStartSession: () => void;
}

const PainSelectionPanel: React.FC<PainSelectionPanelProps> = ({ onStartSession }) => {
  const { selectedRegion, painIntensity, setPainIntensity, savePainData, selectRegion } = usePainData();
  
  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPainIntensity(parseInt(e.target.value, 10));
  };
  
  const handleSave = () => {
    savePainData();
  };
  
  const handleClearSelection = () => {
    selectRegion(null);
    setPainIntensity(5);
  };
  
  const painColor = getPainColor(painIntensity);
  const intensityLabel = painIntensity <= 3 ? 'Mild' : painIntensity <= 6 ? 'Moderate' : 'Severe';
  
  if (!selectedRegion) {
    return (
      <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sliders className="text-blue-600 dark:text-blue-400\" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
            Select a Body Region
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Click on any part of the 3D model to begin your pain assessment and get personalized exercise recommendations.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Pain Assessment
        </h2>
        <button
          onClick={handleClearSelection}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Clear selection"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Selected Region */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
          Selected Region
        </h3>
        <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          {getRegionDisplayName(selectedRegion)}
        </p>
      </div>
      
      {/* Pain Intensity Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="pain-intensity" className="font-medium text-neutral-900 dark:text-neutral-50">
            Pain Intensity
          </label>
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: painColor }}
          >
            {painIntensity}/10 - {intensityLabel}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <input
              id="pain-intensity"
              type="range"
              min="1"
              max="10"
              value={painIntensity}
              onChange={handleIntensityChange}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #F59E0B 50%, #EF4444 100%)`,
              }}
              aria-label="Pain intensity level"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>1 - No Pain</span>
              <span>5 - Moderate</span>
              <span>10 - Severe</span>
            </div>
          </div>
          
          {/* Pain Level Descriptions */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className={`p-2 rounded-lg text-center ${painIntensity <= 3 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`}>
              <div className="font-medium">Mild (1-3)</div>
              <div>Barely noticeable</div>
            </div>
            <div className={`p-2 rounded-lg text-center ${painIntensity >= 4 && painIntensity <= 6 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`}>
              <div className="font-medium">Moderate (4-6)</div>
              <div>Noticeable discomfort</div>
            </div>
            <div className={`p-2 rounded-lg text-center ${painIntensity >= 7 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`}>
              <div className="font-medium">Severe (7-10)</div>
              <div>Significant pain</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Save pain data"
        >
          <Save size={18} />
          Save Assessment
        </button>
        
        <button 
          onClick={onStartSession}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Start exercise session"
        >
          <Play size={18} />
          Start Exercises
        </button>
      </div>
      
      {/* High Pain Warning */}
      {painIntensity >= 7 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>High Pain Level Detected:</strong> Consider consulting a healthcare professional. 
            Only gentle exercises will be recommended.
          </p>
        </div>
      )}
    </div>
  );
};

export default PainSelectionPanel;