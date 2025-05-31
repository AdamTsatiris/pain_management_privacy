import React from 'react';
import { usePainData } from '../../contexts/PainDataContext';
import { getPainColor } from '../../utils/colorUtils';
import { getRegionDisplayName } from '../../utils/regionUtils';
import { Save } from 'lucide-react';

const PainIntensitySlider: React.FC = () => {
  const { selectedRegion, painIntensity, setPainIntensity, savePainData } = usePainData();
  
  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPainIntensity(parseInt(e.target.value, 10));
  };
  
  const painColor = getPainColor(painIntensity);
  
  if (!selectedRegion) {
    return null;
  }
  
  return (
    <div className="card mb-6 fade-in">
      <h2 className="text-xl font-semibold mb-4">Pain Assessment</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">
          Selected Region: <span className="text-primary-500">{getRegionDisplayName(selectedRegion)}</span>
        </h3>
      </div>
      
      <div className="mb-6">
        <label htmlFor="pain-intensity" className="block text-sm font-medium mb-2">
          Pain Intensity (1-10)
        </label>
        <div className="flex items-center gap-4">
          <span className="text-neutral-600 dark:text-neutral-400">1</span>
          <input
            id="pain-intensity"
            type="range"
            min="1"
            max="10"
            value={painIntensity}
            onChange={handleIntensityChange}
            className="flex-1"
            style={{
              background: `linear-gradient(to right, #00B894, ${painColor}, #FF5252)`,
            }}
            aria-label="Pain intensity level"
          />
          <span className="text-neutral-600 dark:text-neutral-400">10</span>
        </div>
        
        <div className="mt-2 flex justify-between">
          <span className="text-healing-500">Mild</span>
          <span className="text-alert-500">Severe</span>
        </div>
        
        <div className="mt-4 text-center">
          <div 
            className="inline-block px-4 py-2 rounded-full font-bold text-white"
            style={{ backgroundColor: painColor }}
          >
            Level {painIntensity}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="btn btn-primary"
          onClick={savePainData}
          aria-label="Save pain data"
        >
          <Save size={18} className="mr-2" />
          Save
        </button>
      </div>
    </div>
  );
};

export default PainIntensitySlider;