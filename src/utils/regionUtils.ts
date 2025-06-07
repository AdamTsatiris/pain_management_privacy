import { BodyRegion } from '../models/types';

/**
 * Converts a region identifier to a human-readable display name
 */
export function getRegionDisplayName(region: BodyRegion): string {
  const nameMap: Record<BodyRegion, string> = {
    head: 'Head',
    neck: 'Neck',
    shoulder_left: 'Left Shoulder',
    shoulder_right: 'Right Shoulder',
    arm_upper_left: 'Left Upper Arm',
    arm_upper_right: 'Right Upper Arm',
    arm_lower_left: 'Left Forearm',
    arm_lower_right: 'Right Forearm',
    hand_left: 'Left Hand',
    hand_right: 'Right Hand',
    chest: 'Chest',
    abdomen: 'Abdomen',
    back_upper: 'Upper Back',
    back_lower: 'Lower Back',
    hip_left: 'Left Hip',
    hip_right: 'Right Hip',
    leg_upper_left: 'Left Thigh',
    leg_upper_right: 'Right Thigh',
    knee_left: 'Left Knee',
    knee_right: 'Right Knee',
    leg_lower_left: 'Left Calf',
    leg_lower_right: 'Right Calf',
    foot_left: 'Left Foot',
    foot_right: 'Right Foot'
  };
  
  return nameMap[region] || 'Unknown Region';
}

/**
 * Groups regions by body area for related exercises/recommendations
 */
export function getRelatedRegions(region: BodyRegion): BodyRegion[] {
  // Map of related body regions
  const relatedRegionsMap: Record<string, BodyRegion[]> = {
    // Head and neck
    head: ['head', 'neck'],
    neck: ['neck', 'head', 'back_upper', 'shoulder_left', 'shoulder_right'],
    
    // Upper limbs
    shoulder_left: ['shoulder_left', 'arm_upper_left', 'back_upper', 'neck'],
    shoulder_right: ['shoulder_right', 'arm_upper_right', 'back_upper', 'neck'],
    arm_upper_left: ['arm_upper_left', 'shoulder_left', 'arm_lower_left'],
    arm_upper_right: ['arm_upper_right', 'shoulder_right', 'arm_lower_right'],
    arm_lower_left: ['arm_lower_left', 'arm_upper_left', 'hand_left'],
    arm_lower_right: ['arm_lower_right', 'arm_upper_right', 'hand_right'],
    hand_left: ['hand_left', 'arm_lower_left'],
    hand_right: ['hand_right', 'arm_lower_right'],
    
    // Torso
    chest: ['chest', 'back_upper', 'abdomen'],
    abdomen: ['abdomen', 'chest', 'back_lower'],
    back_upper: ['back_upper', 'neck', 'shoulder_left', 'shoulder_right', 'back_lower'],
    back_lower: ['back_lower', 'back_upper', 'hip_left', 'hip_right'],
    
    // Lower limbs
    hip_left: ['hip_left', 'back_lower', 'leg_upper_left'],
    hip_right: ['hip_right', 'back_lower', 'leg_upper_right'],
    leg_upper_left: ['leg_upper_left', 'hip_left', 'knee_left', 'leg_lower_left'],
    leg_upper_right: ['leg_upper_right', 'hip_right', 'knee_right', 'leg_lower_right'],
    knee_left: ['knee_left', 'leg_upper_left', 'leg_lower_left'],
    knee_right: ['knee_right', 'leg_upper_right', 'leg_lower_right'],
    leg_lower_left: ['leg_lower_left', 'knee_left', 'leg_upper_left', 'foot_left'],
    leg_lower_right: ['leg_lower_right', 'knee_right', 'leg_upper_right', 'foot_right'],
    foot_left: ['foot_left', 'leg_lower_left'],
    foot_right: ['foot_right', 'leg_lower_right']
  };
  
  return relatedRegionsMap[region] || [region];
}