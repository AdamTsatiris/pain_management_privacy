import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface PrivacyNoticeProps {
  onClose: () => void;
}

const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden rotate-in">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold flex items-center">
            <ShieldCheck size={20} className="text-healing-500 mr-2" />
            Privacy First
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
          <h3 className="font-medium text-lg mb-3">Your Data Stays on Your Device</h3>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            PainRelief is designed with privacy as a core principle. Here's what that means for you:
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="bg-healing-100 dark:bg-healing-900 text-healing-500 p-1 rounded-full mr-2 mt-0.5">
                <ShieldCheck size={16} />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                <strong>No Data Transmission:</strong> All pain data, selections, and settings remain on your device only.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-healing-100 dark:bg-healing-900 text-healing-500 p-1 rounded-full mr-2 mt-0.5">
                <ShieldCheck size={16} />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                <strong>Local Processing:</strong> AI recommendations are generated entirely on your device.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-healing-100 dark:bg-healing-900 text-healing-500 p-1 rounded-full mr-2 mt-0.5">
                <ShieldCheck size={16} />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                <strong>No Tracking:</strong> We don't use cookies or analytics that track your usage.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-healing-100 dark:bg-healing-900 text-healing-500 p-1 rounded-full mr-2 mt-0.5">
                <ShieldCheck size={16} />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                <strong>User Control:</strong> You can delete all your data at any time through settings.
              </span>
            </li>
          </ul>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Note: This application is not a substitute for medical advice. Always consult healthcare professionals for medical concerns.
          </p>
        </div>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-right">
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