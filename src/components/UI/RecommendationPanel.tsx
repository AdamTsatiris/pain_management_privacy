import React, { useMemo, useState } from 'react';
import { Activity, Clock, AlertTriangle, ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';
import { usePainData } from '../../contexts/PainDataContext';
import { getRecommendations } from '../../utils/recommendationEngine';
import { Recommendation } from '../../utils/recommendationEngine';

const RecommendationPanel: React.FC = () => {
  const { selectedRegion, painIntensity } = usePainData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const recommendations = useMemo(() => {
    if (!selectedRegion) return [];
    return getRecommendations(selectedRegion, painIntensity);
  }, [selectedRegion, painIntensity]);
  
  if (!selectedRegion) {
    return (
      <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50">Exercise Recommendations</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Select a body region to see personalized recommendations
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Exercise Recommendations</h2>
      
      {/* Medical Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Stethoscope className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" size={20} />
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
              Medical Disclaimer
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              These recommendations are for informational purposes only. Consult your doctor before starting. 
              Stop if pain increases.
            </p>
          </div>
        </div>
      </div>
      
      {/* Pain Level Warning for High Intensity */}
      {painIntensity >= 7 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">
                High Pain Level Detected
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                Due to your high pain level, only gentle exercises are recommended. 
                Consider consulting a healthcare professional.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            isExpanded={expandedId === recommendation.id}
            onToggle={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: Recommendation;
  isExpanded: boolean;
  onToggle: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isExpanded,
  onToggle
}) => {
  const { title, description, steps, duration, difficulty, imageUrl } = recommendation;
  
  const difficultyColor = useMemo(() => {
    switch (difficulty) {
      case 'Gentle': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Moderate': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Intense': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/30';
    }
  }, [difficulty]);
  
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-white/40 dark:bg-neutral-800/40">
      <button
        className="w-full flex justify-between items-center p-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <Activity className="text-blue-600 dark:text-blue-400" size={20} />
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{title}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Clock size={14} />
                {duration}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            {description}
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-neutral-900 dark:text-neutral-50">Steps:</h4>
              <ol className="list-decimal ml-5 space-y-2">
                {steps.map((step, index) => (
                  <li key={index} className="text-neutral-700 dark:text-neutral-300 text-sm">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            {/* Exercise Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <strong>Consult your doctor before starting.</strong> Stop if pain increases. 
                Listen to your body and modify as needed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;