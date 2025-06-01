import React from 'react';
import { ShieldCheck, X, Lock, Server, Database, Trash2 } from 'lucide-react';

interface PrivacyNoticeProps {
  onClose: () => void;
}

const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold flex items-center">
            <ShieldCheck size={24} className="text-healing-500 mr-2" />
            Your Privacy is Our Priority
          </h2>
          <button 
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={onClose}
            aria-label="Close privacy notice"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
              PainRelief is designed with privacy at its core. We believe your health data should remain yours alone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="bg-healing-100 dark:bg-healing-900 p-2 rounded-lg">
                <Lock size={24} className="text-healing-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">100% Local Processing</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  All data processing happens directly on your device. Nothing is ever sent to external servers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-healing-100 dark:bg-healing-900 p-2 rounded-lg">
                <Server size={24} className="text-healing-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">No External Communication</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  The app works entirely offline after initial load. No data transmission occurs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-healing-100 dark:bg-healing-900 p-2 rounded-lg">
                <Database size={24} className="text-healing-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Local Storage Only</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your preferences and pain data are stored only on your device using browser storage.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-healing-100 dark:bg-healing-900 p-2 rounded-lg">
                <Trash2 size={24} className="text-healing-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Data Control</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Clear your data anytime through settings. You have complete control over your information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">What We Store Locally:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Theme preference (light/dark mode)</li>
              <li>Pain records (region, intensity, timestamp)</li>
              <li>App settings and preferences</li>
            </ul>
          </div>
          
          <div className="bg-alert-50 dark:bg-alert-900/20 border border-alert-200 dark:border-alert-800 rounded-lg p-4">
            <p className="text-sm text-alert-800 dark:text-alert-200">
              <strong>Medical Disclaimer:</strong> This application is not a substitute for professional medical advice. 
              Always consult healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex justify-end">
          <button 
            className="btn btn-primary"
            onClick={onClose}
            aria-label="Accept privacy notice"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;