import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, RotateCcw, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { usePainData } from '../../contexts/PainDataContext';
import { getRecommendations, Recommendation } from '../../utils/recommendationEngine';

interface ExerciseSessionProps {
  onClose: () => void;
}

const ExerciseSession: React.FC<ExerciseSessionProps> = ({ onClose }) => {
  const { selectedRegion, painIntensity } = usePainData();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const recommendations = selectedRegion ? getRecommendations(selectedRegion, painIntensity) : [];
  const currentExercise = recommendations[currentExerciseIndex];

  // Parse duration to seconds (simplified - assumes "X-Y minutes" format)
  const parseDurationToSeconds = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) * 60 : 300; // Default to 5 minutes
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const handleStartExercise = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(parseDurationToSeconds(currentExercise.duration));
    }
    setIsPlaying(true);
  };

  const handlePauseExercise = () => {
    setIsPlaying(false);
  };

  const handleExerciseComplete = () => {
    setCompletedExercises(prev => new Set([...prev, currentExerciseIndex]));
    
    if (currentExerciseIndex < recommendations.length - 1) {
      // Move to next exercise
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
        setTimeRemaining(0);
        setIsPlaying(false);
      }, 1000);
    } else {
      // Session complete
      setSessionComplete(true);
    }
  };

  const handleSkipExercise = () => {
    handleExerciseComplete();
  };

  const handleRestartSession = () => {
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
    setIsPlaying(false);
    setSessionComplete(false);
    setCompletedExercises(new Set());
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedRegion || recommendations.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
            <h2 className="text-xl font-semibold mb-2">No Exercises Available</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Please select a body region first to get personalized exercise recommendations.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h2 className="text-xl font-semibold mb-2">Session Complete!</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Great job! You've completed all recommended exercises. How do you feel?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleRestartSession}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Restart
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-xl font-semibold">Exercise Session</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Exercise {currentExerciseIndex + 1} of {recommendations.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {completedExercises.size}/{recommendations.length} completed
            </span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / recommendations.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercise Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentExercise && (
            <div className="space-y-6">
              {/* Exercise Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{currentExercise.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {currentExercise.description}
                </p>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {currentExercise.duration}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentExercise.difficulty === 'Gentle' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : currentExercise.difficulty === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {currentExercise.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                    {currentExercise.category}
                  </span>
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="flex justify-center gap-3">
                  {!isPlaying ? (
                    <button
                      onClick={handleStartExercise}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Play size={20} />
                      {timeRemaining === 0 ? 'Start' : 'Resume'}
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseExercise}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Pause size={20} />
                      Pause
                    </button>
                  )}
                  
                  <button
                    onClick={handleSkipExercise}
                    className="bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <SkipForward size={20} />
                    Skip
                  </button>
                </div>
              </div>

              {/* Exercise Image */}
              {currentExercise.imageUrl && (
                <div className="text-center">
                  <img
                    src={currentExercise.imageUrl}
                    alt={currentExercise.title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Instructions */}
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Instructions:</h4>
                <ol className="space-y-2">
                  {currentExercise.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Safety Notes */}
              {currentExercise.safetyNotes.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Safety Notes:
                  </h4>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    {currentExercise.safetyNotes.map((note, index) => (
                      <li key={index} className="flex gap-2">
                        <span>•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSession;