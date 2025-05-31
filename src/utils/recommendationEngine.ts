import { BodyRegion, Recommendation } from '../models/types';
import { getRelatedRegions } from './regionUtils';

// Sample recommendations database
// In a real application, this would be a more comprehensive database
const recommendationsDatabase: Recommendation[] = [
  // Head and Neck
  {
    id: 'head-1',
    title: 'Gentle Neck Stretches',
    description: 'Relieve tension in your neck and head with these gentle stretches.',
    steps: [
      'Sit or stand with a straight back.',
      'Slowly tilt your head to the right, bringing your ear toward your shoulder.',
      'Hold for 15-30 seconds, feeling the stretch along the left side of your neck.',
      'Return to center and repeat on the left side.',
      'Repeat 3 times on each side.'
    ],
    duration: '5 minutes',
    intensity: 'Gentle',
    bodyRegions: ['head', 'neck'],
    imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'head-2',
    title: 'Tension Headache Relief',
    description: 'Self-massage techniques to help relieve tension headaches.',
    steps: [
      'Find a quiet, comfortable place to sit.',
      'Place your thumbs on your temples and apply gentle circular pressure.',
      'Move your fingertips to the base of your skull and apply gentle pressure.',
      'Massage your scalp with your fingertips, moving from front to back.',
      'Take slow, deep breaths throughout the massage.'
    ],
    duration: '3-5 minutes',
    intensity: 'Gentle',
    bodyRegions: ['head'],
    imageUrl: 'https://images.pexels.com/photos/3760274/pexels-photo-3760274.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  
  // Back
  {
    id: 'back-1',
    title: 'Cat-Cow Stretch',
    description: 'A gentle flow between two yoga poses that helps stretch the back and core.',
    steps: [
      'Start on your hands and knees in a tabletop position.',
      'For Cat: Exhale, round your spine toward the ceiling, tucking your chin to your chest.',
      'For Cow: Inhale, drop your belly toward the floor and lift your head and tailbone up.',
      'Flow between the two positions, matching your breath to each movement.',
      'Repeat 10-12 times.'
    ],
    duration: '5 minutes',
    intensity: 'Gentle',
    bodyRegions: ['back_upper', 'back_lower'],
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'back-2',
    title: 'Child\'s Pose',
    description: 'A restful stretch that elongates the back and promotes relaxation.',
    steps: [
      'Kneel on the floor with your big toes touching and knees spread apart.',
      'Sit back on your heels and stretch your arms forward.',
      'Lower your torso between your thighs and rest your forehead on the floor.',
      'Hold the position while taking deep breaths.',
      'Stay in this position for 1-3 minutes.'
    ],
    duration: '3 minutes',
    intensity: 'Gentle',
    bodyRegions: ['back_lower', 'back_upper'],
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  
  // Shoulders and Arms
  {
    id: 'shoulder-1',
    title: 'Shoulder Rolls',
    description: 'Simple movement to release tension in the shoulders and upper back.',
    steps: [
      'Sit or stand with a straight spine.',
      'Roll your shoulders up toward your ears, then back and down in a circular motion.',
      'Perform 10 rolls in this backward direction.',
      'Reverse the direction, rolling your shoulders forward 10 times.',
      'Focus on keeping your breath steady and relaxed.'
    ],
    duration: '2 minutes',
    intensity: 'Gentle',
    bodyRegions: ['shoulder_left', 'shoulder_right', 'back_upper'],
    imageUrl: 'https://images.pexels.com/photos/7991361/pexels-photo-7991361.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'arm-1',
    title: 'Triceps Stretch',
    description: 'Stretch for the back of the upper arms to relieve tension.',
    steps: [
      'Raise one arm overhead and bend your elbow, placing your hand behind your head.',
      'Use your other hand to gently pull the elbow toward your head.',
      'Hold for 15-30 seconds, feeling the stretch in your triceps.',
      'Release and repeat on the other side.',
      'Complete 3 stretches on each arm.'
    ],
    duration: '3 minutes',
    intensity: 'Moderate',
    bodyRegions: ['arm_upper_left', 'arm_upper_right'],
    imageUrl: 'https://images.pexels.com/photos/4325484/pexels-photo-4325484.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  
  // Legs and Hips
  {
    id: 'hip-1',
    title: 'Seated Figure-Four Stretch',
    description: 'Effective stretch for the hips, glutes, and lower back.',
    steps: [
      'Sit on the edge of a chair with your feet flat on the floor.',
      'Place your right ankle on your left thigh, just above the knee.',
      'Keep your back straight and gently lean forward until you feel a stretch.',
      'Hold for 30-60 seconds.',
      'Switch legs and repeat on the other side.'
    ],
    duration: '4 minutes',
    intensity: 'Moderate',
    bodyRegions: ['hip_left', 'hip_right', 'back_lower'],
    imageUrl: 'https://images.pexels.com/photos/6453398/pexels-photo-6453398.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'leg-1',
    title: 'Standing Hamstring Stretch',
    description: 'Gentle stretch for the back of the thighs.',
    steps: [
      'Place your right foot on an elevated surface (like a step or low stool).',
      'Keep your leg straight and your toes pointing up.',
      'Lean forward slightly from your hips until you feel a stretch.',
      'Hold for 20-30 seconds.',
      'Switch legs and repeat on the other side.'
    ],
    duration: '3 minutes',
    intensity: 'Moderate',
    bodyRegions: ['leg_upper_left', 'leg_upper_right'],
    imageUrl: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  
  // Hands and Feet
  {
    id: 'hand-1',
    title: 'Hand and Wrist Stretches',
    description: 'Gentle exercises to relieve pain and stiffness in hands and wrists.',
    steps: [
      'Extend your arm with palm facing down.',
      'Gently pull your fingers back with your other hand until you feel a stretch.',
      'Hold for 15-30 seconds.',
      'Then, turn your palm up and gently press down on your fingers.',
      'Repeat both stretches 3 times on each hand.'
    ],
    duration: '4 minutes',
    intensity: 'Gentle',
    bodyRegions: ['hand_left', 'hand_right', 'arm_lower_left', 'arm_lower_right'],
    imageUrl: 'https://images.pexels.com/photos/4437541/pexels-photo-4437541.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'foot-1',
    title: 'Foot Rolling Exercise',
    description: 'Simple technique to relieve foot pain and plantar fasciitis.',
    steps: [
      'Sit in a chair and place a small ball (like a tennis ball) under your foot.',
      'Apply gentle pressure and roll the ball from your heel to the ball of your foot.',
      'Focus on areas that feel tight or painful.',
      'Continue for 1-2 minutes.',
      'Repeat with the other foot.'
    ],
    duration: '4 minutes',
    intensity: 'Gentle',
    bodyRegions: ['foot_left', 'foot_right'],
    imageUrl: 'https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

/**
 * Gets personalized recommendations based on body region and pain intensity
 */
export function getRecommendations(region: BodyRegion, intensity: number): Recommendation[] {
  // Get related regions for more comprehensive recommendations
  const relatedRegions = getRelatedRegions(region);
  
  // Filter recommendations that target the selected or related regions
  let filteredRecommendations = recommendationsDatabase.filter(rec => 
    rec.bodyRegions.some(r => relatedRegions.includes(r))
  );
  
  // Adjust recommendations based on pain intensity
  if (intensity <= 3) {
    // For mild pain, prioritize gentle exercises
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.intensity === 'Gentle'
    );
  } else if (intensity <= 7) {
    // For moderate pain, include both gentle and moderate exercises
    // but prioritize gentle ones for higher pain within this range
    filteredRecommendations.sort((a, b) => {
      if (intensity > 5) {
        // For pain levels 6-7, prefer gentler exercises
        return a.intensity === 'Gentle' ? -1 : b.intensity === 'Gentle' ? 1 : 0;
      }
      return 0; // No specific sorting for pain levels 4-5
    });
  } else {
    // For severe pain (8-10), strongly prioritize gentle exercises
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.intensity === 'Gentle'
    );
    
    // Add a warning for severe pain
    if (filteredRecommendations.length === 0) {
      // If no gentle exercises found, include some anyway but will add a warning
      filteredRecommendations = recommendationsDatabase.filter(rec => 
        rec.bodyRegions.some(r => relatedRegions.includes(r))
      );
    }
    
    // In a real app, we might add special recommendations for severe pain
    // or a prompt to consult a healthcare professional
  }
  
  // Limit to 3 recommendations for simplicity
  return filteredRecommendations.slice(0, 3);
}

/**
 * In a more sophisticated app, this function would use actual AI to generate
 * personalized recommendations based on user data history and specific conditions
 */
export function getAIRecommendations(region: BodyRegion, intensity: number, history: PainData[]): Recommendation[] {
  // This is a placeholder for an actual AI recommendation engine
  // For now, just use our basic recommendation function
  return getRecommendations(region, intensity);
}

// Mock type for the function above
interface PainData {
  region: BodyRegion;
  intensity: number;
  timestamp: string;
}