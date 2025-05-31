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

// Pain data structure
export interface PainData {
  id: string;
  region: BodyRegion;
  intensity: number;
  timestamp: string;
}

// Exercise/Stretch recommendation
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  intensity: 'Gentle' | 'Moderate' | 'Intense';
  bodyRegions: BodyRegion[];
  imageUrl?: string;
}

// User settings
export interface UserSettings {
  showIntroduction: boolean;
  dataRetentionDays: number;
  accessibilityMode: boolean;
}

// Color mapping for body regions by pain intensity
export interface RegionColorMap {
  [key: string]: string;
}