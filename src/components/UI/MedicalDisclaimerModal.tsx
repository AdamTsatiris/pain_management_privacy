import React from 'react';
import { AlertTriangle, Shield, Stethoscope, FileText } from 'lucide-react';

interface MedicalDisclaimerModalProps {
  onAccept: () => void;
}

const MedicalDisclaimerModal: React.FC<MedicalDisclaimerModalProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-500 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Important Medical Notice</h2>
              <p className="text-amber-100">Please read carefully before using this application</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} />
              Critical Safety Information
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
              This application provides general exercise suggestions only and is <strong>NOT a replacement for medical consultation</strong>. 
              The recommendations are for informational purposes and should not be considered medical advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <Stethoscope size={18} />
                Consult a Healthcare Professional For:
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Severe or persistent pain</li>
                <li>• Pain after injury or trauma</li>
                <li>• Any concerning symptoms</li>
                <li>• Before starting new exercises</li>
                <li>• If pain worsens during exercises</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                <Shield size={18} />
                Safety Guidelines:
              </h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Stop exercises if pain increases</li>
                <li>• Listen to your body</li>
                <li>• Start slowly and progress gradually</li>
                <li>• Individual results may vary</li>
                <li>• Use proper form and technique</li>
              </ul>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText size={18} />
              Terms of Use:
            </h4>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
              <p>
                By using this application, you acknowledge that:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>You understand this is not medical advice</li>
                <li>You will consult healthcare professionals for medical concerns</li>
                <li>You will stop exercises if you experience pain or discomfort</li>
                <li>You use this application at your own risk</li>
                <li>The developers are not liable for any injuries or health issues</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Emergency Situations:
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              If you experience severe pain, chest pain, difficulty breathing, or any emergency symptoms, 
              <strong> stop using this app immediately and seek emergency medical care</strong>.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                By clicking "I Understand", you confirm that you have read and understood this medical disclaimer.
              </p>
            </div>
            <button 
              onClick={onAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-w-[140px]"
              aria-label="Accept medical disclaimer and continue"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimerModal;