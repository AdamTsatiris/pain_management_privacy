import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCcw, MousePointer, Sliders, Activity } from 'lucide-react';

interface HelpOverlayProps {
  onClose: () => void;
}

const HelpOverlay: React.FC<HelpOverlayProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Welcome to PainRelief',
      icon: <Activity size={40} className="text-primary-500" />,
      content: 'PainRelief helps you track and manage pain with privacy-focused technology. All data stays on your device.',
    },
    {
      title: 'Interactive 3D Model',
      icon: <RotateCcw size={40} className="text-primary-500" />,
      content: 'Rotate the 3D model by clicking and dragging. Zoom in and out using the scroll wheel or pinch gestures.',
    },
    {
      title: 'Select Body Regions',
      icon: <MousePointer size={40} className="text-primary-500" />,
      content: 'Click on any body region to select it. The selected region will be highlighted, allowing you to record pain data.',
    },
    {
      title: 'Record Pain Intensity',
      icon: <Sliders size={40} className="text-primary-500" />,
      content: 'Use the slider to indicate your pain level from 1 (mild) to 10 (severe). Your data is saved locally.',
    },
    {
      title: 'Get Recommendations',
      icon: <Activity size={40} className="text-primary-500" />,
      content: 'Based on your selections, the app will suggest exercises and stretches to help manage your pain.',
    },
  ];
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold">How to Use PainRelief</h2>
          <button 
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={onClose}
            aria-label="Close help"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            {steps[currentStep].icon}
            <h3 className="text-lg font-medium mt-4 mb-2">{steps[currentStep].title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {steps[currentStep].content}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              className="btn btn-secondary p-2"
              onClick={prevStep}
              disabled={currentStep === 0}
              aria-label="Previous step"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep
                      ? 'bg-primary-500'
                      : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
            
            <button
              className="btn btn-secondary p-2"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              aria-label="Next step"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-right">
          <button 
            className="btn btn-primary"
            onClick={onClose}
            aria-label="Close tutorial"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpOverlay;