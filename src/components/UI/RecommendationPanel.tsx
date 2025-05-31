import React, { useMemo } from 'react';
import { usePainData } from '../../contexts/PainDataContext';
import { getRecommendations } from '../../utils/recommendationEngine';
import { Recommendation } from '../../models/types';
import { Clock, Activity, ChevronDown, ChevronUp } from 'lucide-react';

const RecommendationPanel: React.FC = () => {
  const { selectedRegion, painIntensity } = usePainData();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  
  const recommendations = useMemo(() => {
    if (!selectedRegion) return [];
    return getRecommendations(selectedRegion, painIntensity);
  }, [selectedRegion, painIntensity]);
  
  if (!selectedRegion || recommendations.length === 0) {
    return (
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          {!selectedRegion 
            ? "Select a body region to see personalized recommendations" 
            : "No recommendations available for this selection"}
        </p>
      </div>
    );
  }
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="card mb-6 fade-in">
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        These recommendations are generated locally based on your selection and are not medical advice.
      </p>
      
      <div className="space-y-4">
        {recommendations.map((recommendation: Recommendation) => (
          <RecommendationCard 
            key={recommendation.id}
            recommendation={recommendation}
            isExpanded={expandedId === recommendation.id}
            onToggle={() => toggleExpand(recommendation.id)}
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
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-750"
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
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
          )}
          
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            {description}
          </p>
          
          <h4 className="font-medium mb-2">Steps:</h4>
          <ol className="list-decimal ml-5 space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-neutral-700 dark:text-neutral-300">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;