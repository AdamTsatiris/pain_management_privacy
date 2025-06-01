import React, { useMemo, useState } from 'react';
import { Activity, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { usePainData } from '../../contexts/PainDataContext';
import { getRecommendations } from '../../utils/recommendationEngine';
import { Recommendation } from '../../models/types';

const RecommendationPanel: React.FC = () => {
  const { selectedRegion, painIntensity } = usePainData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const recommendations = useMemo(() => {
    if (!selectedRegion) return [];
    return getRecommendations(selectedRegion, painIntensity);
  }, [selectedRegion, painIntensity]);
  
  if (!selectedRegion) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Exercise Recommendations</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Select a body region to see personalized recommendations
        </p>
      </div>
    );
  }
  
  return (
    <div className="card mb-6 fade-in">
      <h2 className="text-xl font-semibold mb-4">Exercise Recommendations</h2>
      
      {/* Medical Disclaimer */}
      <div className="bg-alert-50 dark:bg-alert-900/20 border border-alert-200 dark:border-alert-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-alert-500 shrink-0 mt-1" size={20} />
          <div>
            <p className="text-sm text-alert-800 dark:text-alert-200 mb-2">
              These recommendations are generated based on your input and are not medical advice.
            </p>
            <p className="text-sm text-alert-700 dark:text-alert-300">
              Please consult a healthcare professional for persistent or severe pain.
            </p>
          </div>
        </div>
      </div>
      
      {/* Pain Level Warning for High Intensity */}
      {painIntensity >= 7 && (
        <div className="bg-alert-50 dark:bg-alert-900/20 border border-alert-200 dark:border-alert-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-alert-800 dark:text-alert-200">
            Due to your high pain level, only gentle exercises are recommended.
            Consider consulting a healthcare professional.
          </p>
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
  const { title, description, steps, duration, intensity, imageUrl } = recommendation;
  
  const intensityColor = useMemo(() => {
    switch (intensity) {
      case 'Gentle': return 'text-healing-500';
      case 'Moderate': return 'text-primary-500';
      case 'Intense': return 'text-alert-500';
      default: return 'text-neutral-500';
    }
  }, [intensity]);
  
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-750"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <Activity className="text-primary-500" size={20} />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
            <Clock size={14} className="mr-1" />
            {duration}
          </span>
          <span className={`text-sm ${intensityColor} ml-2`}>
            {intensity}
          </span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
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
              <h4 className="font-medium mb-2">Steps:</h4>
              <ol className="list-decimal ml-5 space-y-2">
                {steps.map((step, index) => (
                  <li key={index} className="text-neutral-700 dark:text-neutral-300">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div>
                <span className="font-medium">Duration:</span> {duration}
              </div>
              <div>
                <span className="font-medium">Intensity:</span>{' '}
                <span className={intensityColor}>{intensity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;