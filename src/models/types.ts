// Body region definitions
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
}

// Pain data structure
export interface PainData {
  id: string;
  region: BodyRegion;
  intensity: number;
  type: PainType;
  timestamp: string;
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
}

// Color mapping for body regions by pain intensity
export interface RegionColorMap {
  [key: string]: string;
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