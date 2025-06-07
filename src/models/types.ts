// Body region definitions - Enhanced with more specific regions
export type BodyRegion = 
  | 'head'
  | 'neck'
  | 'shoulder_left'
  | 'shoulder_right'
  | 'arm_upper_left'
  | 'arm_upper_right'
  | 'arm_lower_left'
  | 'arm_lower_right'
  | 'hand_left'
  | 'hand_right'
  | 'chest'
  | 'abdomen'
  | 'back_upper'
  | 'back_lower'
  | 'hip_left'
  | 'hip_right'
  | 'leg_upper_left'
  | 'leg_upper_right'
  | 'knee_left'
  | 'knee_right'
  | 'leg_lower_left'
  | 'leg_lower_right'
  | 'foot_left'
  | 'foot_right';

// Pain types
export type PainType = 'acute' | 'chronic' | 'tension' | 'strain';

// Exercise difficulty levels
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Exercise categories
export type ExerciseCategory = 'stretch' | 'strength' | 'mobility' | 'relaxation';

// Exercise subcategories
export type ExerciseSubcategory =
  // Stretches
  | 'static_stretch'
  | 'dynamic_stretch'
  | 'pnf_stretch'
  | 'relaxation_stretch'
  // Strengthening
  | 'isometric'
  | 'resistance_band'
  | 'bodyweight'
  | 'core_stabilization'
  // Mobility
  | 'joint_mobility'
  | 'range_of_motion'
  | 'postural_correction'
  | 'movement_pattern'
  // Relaxation
  | 'breathing'
  | 'progressive_relaxation'
  | 'mindfulness'
  | 'stress_reduction';

// Equipment types
export type Equipment = 'none' | 'chair' | 'wall' | 'resistance_band' | 'foam_roller' | 'yoga_mat';

// Exercise/Stretch recommendation
export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: ExerciseCategory;
  subcategory: ExerciseSubcategory;
  difficulty: DifficultyLevel;
  painTypes: PainType[];
  equipment: Equipment[];
  duration: string;
  targetRegions: {
    primary: BodyRegion[];
    secondary: BodyRegion[];
  };
  instructions: {
    preparation: string[];
    execution: string[];
    breathing: string[];
    modifications: string[];
  };
  commonMistakes: string[];
  safetyNotes: string[];
  stopIndicators: string[];
  imageUrl?: string;
  videoUrl?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'any';
  weatherSensitive?: boolean;
  weatherConditions?: string[];
}

// Pain data structure
export interface PainData {
  id: string;
  region: BodyRegion;
  intensity: number;
  type: PainType;
  timestamp: string;
  notes?: string;
  weather?: {
    temperature: number;
    humidity: number;
    pressure: number;
    condition: string;
  };
  effectiveness?: number;
  triggers?: string[];
  stressLevel?: number;
  sleepQuality?: number;
  activityLevel?: number;
  hydrationLevel?: number;
}

// User settings
export interface UserSettings {
  showIntroduction: boolean;
  dataRetentionDays: number;
  accessibilityMode: boolean;
  preferredDifficulty: DifficultyLevel;
  equipment: Equipment[];
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  reduceMotion: boolean;
  language: string;
  screenReaderOptimized: boolean;
  reminderPreferences: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    frequency: number;
  };
  routinePreferences: {
    maxDuration: number;
    preferredTime: string[];
    excludedExercises: string[];
    adaptations: string[];
  };
}

// Accessibility preferences
export interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  reduceMotion: boolean;
  screenReaderOptimized: boolean;
}

// Tutorial step interface
export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  action?: string;
}

// Wellness tracking
export interface WellnessData {
  timestamp: string;
  stressLevel: number;
  sleepQuality: number;
  activityLevel: number;
  hydrationLevel: number;
  mood: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
}

// Exercise routine
export interface ExerciseRoutine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: DifficultyLevel;
  targetRegions: BodyRegion[];
  schedule: {
    daysOfWeek: number[];
    timeOfDay: string;
  };
  created: string;
  modified: string;
}

// Progress tracking
export interface ProgressData {
  routineId: string;
  timestamp: string;
  completed: boolean;
  exercises: {
    exerciseId: string;
    completed: boolean;
    difficulty: number;
    notes?: string;
  }[];
  overallRating: number;
  painLevelChange: number;
}