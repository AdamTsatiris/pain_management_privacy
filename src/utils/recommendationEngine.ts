import { BodyRegion, Recommendation } from '../models/types';
import { getRelatedRegions } from './regionUtils';

// Comprehensive database of exercises and stretches
const recommendationsDatabase: Recommendation[] = [
  // Head and Neck
  {
    id: 'neck-1',
    title: 'Gentle Neck Stretches',
    description: 'Release tension in your neck and shoulders with these gentle stretches.',
    steps: [
      'Sit or stand with a straight back',
      'Slowly tilt your head to the right, bringing your ear toward your shoulder',
      'Hold for 15-30 seconds',
      'Return to center and repeat on the left side',
      'Perform 3 sets on each side'
    ],
    duration: '5-7 minutes',
    intensity: 'Gentle',
    bodyRegions: ['head', 'neck'],
    imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg'
  },
  {
    id: 'neck-2',
    title: 'Chin Tucks',
    description: 'Strengthen deep neck flexors and improve posture.',
    steps: [
      'Sit or stand with your back straight',
      'Pull your chin straight back, creating a "double chin"',
      'Hold for 5 seconds',
      'Release and repeat 10 times',
      'Perform 3 sets'
    ],
    duration: '3-5 minutes',
    intensity: 'Gentle',
    bodyRegions: ['neck'],
    imageUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg'
  },
  
  // Shoulders and Arms
  {
    id: 'shoulder-1',
    title: 'Cross-Body Shoulder Stretch',
    description: 'Stretch the posterior shoulder and upper back.',
    steps: [
      'Bring your right arm across your chest',
      'Support it with your left arm',
      'Hold for 30 seconds',
      'Release and repeat on the other side',
      'Perform 2-3 sets per side'
    ],
    duration: '4-6 minutes',
    intensity: 'Moderate',
    bodyRegions: ['shoulder_left', 'shoulder_right'],
    imageUrl: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg'
  },
  {
    id: 'arm-1',
    title: 'Doorway Stretch',
    description: 'Stretch chest and anterior shoulder muscles.',
    steps: [
      'Stand in a doorway with arms raised to shoulder height',
      'Place forearms on doorframe',
      'Lean forward until you feel a stretch',
      'Hold for 20-30 seconds',
      'Repeat 3 times'
    ],
    duration: '5 minutes',
    intensity: 'Moderate',
    bodyRegions: ['shoulder_left', 'shoulder_right', 'chest'],
    imageUrl: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg'
  },
  
  // Back
  {
    id: 'back-1',
    title: 'Cat-Cow Stretch',
    description: 'Gentle spinal mobility exercise that helps relieve back tension.',
    steps: [
      'Start on hands and knees',
      'Arch your back while looking up (Cow)',
      'Round your back while tucking chin (Cat)',
      'Move slowly between positions',
      'Repeat 10-15 times'
    ],
    duration: '5-7 minutes',
    intensity: 'Gentle',
    bodyRegions: ['back_upper', 'back_lower'],
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
  },
  {
    id: 'back-2',
    title: 'Child\'s Pose',
    description: 'Relaxing stretch for the entire back.',
    steps: [
      'Kneel on the floor with toes together',
      'Sit back on heels and spread knees wide',
      'Extend arms forward or alongside body',
      'Hold for 1-3 minutes',
      'Breathe deeply throughout'
    ],
    duration: '3-5 minutes',
    intensity: 'Gentle',
    bodyRegions: ['back_lower', 'back_upper'],
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg'
  },
  
  // Legs
  {
    id: 'leg-1',
    title: 'Standing Hamstring Stretch',
    description: 'Stretch for tight hamstrings and lower back.',
    steps: [
      'Place foot on elevated surface',
      'Keep leg straight and toes pointing up',
      'Lean forward from hips',
      'Hold for 30 seconds',
      'Repeat on other leg'
    ],
    duration: '4-6 minutes',
    intensity: 'Moderate',
    bodyRegions: ['leg_upper_left', 'leg_upper_right', 'back_lower'],
    imageUrl: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg'
  },
  {
    id: 'hip-1',
    title: 'Hip Flexor Stretch',
    description: 'Stretch tight hip flexors and improve mobility.',
    steps: [
      'Kneel on one knee',
      'Keep front foot flat and knee at 90 degrees',
      'Tuck pelvis and lean forward slightly',
      'Hold for 30 seconds',
      'Switch sides and repeat'
    ],
    duration: '5 minutes',
    intensity: 'Moderate',
    bodyRegions: ['hip_left', 'hip_right'],
    imageUrl: 'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg'
  }
];

/**
 * Get personalized recommendations based on body region and pain intensity
 */
export function getRecommendations(region: BodyRegion, intensity: number): Recommendation[] {
  // Get related regions for comprehensive recommendations
  const relatedRegions = getRelatedRegions(region);
  
  // Filter recommendations for selected and related regions
  let filteredRecommendations = recommendationsDatabase.filter(rec => 
    rec.bodyRegions.some(r => relatedRegions.includes(r))
  );
  
  // Adjust recommendations based on pain intensity
  if (intensity >= 7) {
    // For high pain (7-10), only show gentle exercises
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.intensity === 'Gentle'
    );
  } else if (intensity >= 4) {
    // For moderate pain (4-6), prioritize gentle exercises but include moderate ones
    filteredRecommendations.sort((a, b) => 
      a.intensity === 'Gentle' ? -1 : b.intensity === 'Gentle' ? 1 : 0
    );
  }
  
  // Limit to 3 recommendations
  return filteredRecommendations.slice(0, 3);
}

/**
 * Get AI-powered recommendations based on user history and current pain
 */
export function getAIRecommendations(
  region: BodyRegion,
  intensity: number,
  history: Array<{ region: BodyRegion; intensity: number; timestamp: string }>
): Recommendation[] {
  // Analyze pain patterns
  const recentHistory = history.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const now = new Date();
    const daysDiff = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7; // Look at last 7 days
  });
  
  // Check for chronic vs acute pain
  const isChronicPain = recentHistory.length >= 3;
  
  // Get base recommendations
  let recommendations = getRecommendations(region, intensity);
  
  // Adjust based on patterns
  if (isChronicPain) {
    // For chronic pain, prioritize gentle, longer-term exercises
    recommendations = recommendations.filter(rec => rec.intensity === 'Gentle');
  }
  
  return recommendations;
}