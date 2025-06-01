import { 
  BodyRegion, 
  Exercise, 
  PainType,
  DifficultyLevel,
  ExerciseCategory,
  ExerciseSubcategory,
  Equipment
} from '../models/types';
import { getRelatedRegions } from './regionUtils';

// Comprehensive database of exercises and stretches
const exerciseDatabase: Exercise[] = [
  // HEAD AND NECK EXERCISES
  {
    id: 'neck-stretch-1',
    title: 'Gentle Neck Stretches',
    description: 'A series of gentle stretches to relieve neck tension and improve mobility.',
    category: 'stretch',
    subcategory: 'static_stretch',
    difficulty: 'beginner',
    painTypes: ['tension', 'chronic'],
    equipment: ['none'],
    duration: '5-7 minutes',
    targetRegions: {
      primary: ['neck'],
      secondary: ['shoulder_left', 'shoulder_right', 'back_upper']
    },
    instructions: {
      preparation: [
        'Sit or stand with a straight back',
        'Relax your shoulders',
        'Keep your chin level'
      ],
      execution: [
        'Slowly tilt your head to the right, bringing your ear toward your shoulder',
        'Hold for 15-30 seconds',
        'Return to center and repeat on the left side',
        'Perform 3 sets on each side'
      ],
      breathing: [
        'Breathe deeply and slowly throughout the stretch',
        'Exhale as you move into the stretch',
        'Maintain steady breathing while holding'
      ],
      modifications: [
        'Can be performed seated for better stability',
        'Use hand for gentle assistance if needed',
        'Reduce range of motion if experiencing discomfort'
      ]
    },
    commonMistakes: [
      'Lifting shoulders during stretch',
      'Moving too quickly',
      'Forcing the stretch beyond comfort',
      'Holding breath'
    ],
    safetyNotes: [
      'Stop if you feel sharp or shooting pain',
      'Avoid bouncing movements',
      'Keep movements slow and controlled'
    ],
    stopIndicators: [
      'Sharp or shooting pain',
      'Numbness or tingling',
      'Dizziness or headache',
      'Increased pain or discomfort'
    ],
    imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg'
  },
  
  // SHOULDER EXERCISES
  {
    id: 'shoulder-mobility-1',
    title: 'Shoulder Blade Squeezes',
    description: 'Improve posture and relieve upper back tension with controlled shoulder blade movements.',
    category: 'mobility',
    subcategory: 'postural_correction',
    difficulty: 'beginner',
    painTypes: ['tension', 'chronic'],
    equipment: ['none', 'chair'],
    duration: '3-5 minutes',
    targetRegions: {
      primary: ['shoulder_left', 'shoulder_right', 'back_upper'],
      secondary: ['neck']
    },
    instructions: {
      preparation: [
        'Sit or stand with good posture',
        'Arms relaxed at sides',
        'Shoulders level'
      ],
      execution: [
        'Squeeze shoulder blades together gently',
        'Hold for 5-10 seconds',
        'Release slowly',
        'Repeat 10 times'
      ],
      breathing: [
        'Inhale as you prepare',
        'Exhale as you squeeze',
        'Breathe normally while holding'
      ],
      modifications: [
        'Can be performed seated against a backrest',
        'Vary hold duration based on comfort',
        'Adjust squeeze intensity as needed'
      ]
    },
    commonMistakes: [
      'Lifting shoulders toward ears',
      'Holding breath',
      'Moving too quickly',
      'Excessive force'
    ],
    safetyNotes: [
      'Maintain neutral spine position',
      'Keep movements gentle and controlled',
      'Stop if pain increases'
    ],
    stopIndicators: [
      'Increased shoulder or neck pain',
      'Muscle spasms',
      'Tingling in arms or hands'
    ],
    imageUrl: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg'
  },
  
  // BACK EXERCISES
  {
    id: 'back-mobility-1',
    title: 'Cat-Cow Stretch',
    description: 'Gentle spinal mobility exercise to improve flexibility and reduce back tension.',
    category: 'mobility',
    subcategory: 'range_of_motion',
    difficulty: 'beginner',
    painTypes: ['tension', 'chronic'],
    equipment: ['yoga_mat'],
    duration: '5-7 minutes',
    targetRegions: {
      primary: ['back_upper', 'back_lower'],
      secondary: ['neck', 'abdomen']
    },
    instructions: {
      preparation: [
        'Start on hands and knees',
        'Hands shoulder-width apart',
        'Knees hip-width apart',
        'Neutral spine position'
      ],
      execution: [
        'Inhale: Drop belly, lift chest and tailbone (Cow)',
        'Exhale: Round spine, tuck chin and tailbone (Cat)',
        'Move slowly between positions',
        'Repeat 10-15 times'
      ],
      breathing: [
        'Inhale deeply during cow pose',
        'Exhale fully during cat pose',
        'Coordinate breath with movement'
      ],
      modifications: [
        'Perform seated in chair for limited mobility',
        'Reduce range of motion if needed',
        'Use pillows under knees for comfort'
      ]
    },
    commonMistakes: [
      'Moving too quickly',
      'Not coordinating breath with movement',
      'Collapsing shoulders',
      'Forcing range of motion'
    ],
    safetyNotes: [
      'Keep movements slow and controlled',
      'Maintain stable shoulder and hip position',
      'Stop if sharp pain occurs'
    ],
    stopIndicators: [
      'Sharp or shooting pain',
      'Increased discomfort',
      'Loss of balance',
      'Dizziness'
    ],
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
  }
];

/**
 * Get personalized recommendations based on body region, pain intensity, and type
 */
export function getRecommendations(
  region: BodyRegion,
  intensity: number,
  painType: PainType = 'tension',
  difficulty: DifficultyLevel = 'beginner',
  availableEquipment: Equipment[] = ['none']
): Exercise[] {
  // Get related regions for comprehensive recommendations
  const relatedRegions = getRelatedRegions(region);
  
  // Filter exercises based on multiple criteria
  let filteredExercises = exerciseDatabase.filter(exercise => {
    // Check if exercise targets selected or related regions
    const targetsRegion = [
      ...exercise.targetRegions.primary,
      ...exercise.targetRegions.secondary
    ].some(r => relatedRegions.includes(r));
    
    // Check if required equipment is available
    const hasRequiredEquipment = exercise.equipment.some(eq => 
      availableEquipment.includes(eq)
    );
    
    // Check pain type compatibility
    const suitableForPainType = exercise.painTypes.includes(painType);
    
    // Check difficulty level
    const appropriateDifficulty = exercise.difficulty === difficulty;
    
    return targetsRegion && hasRequiredEquipment && suitableForPainType && appropriateDifficulty;
  });
  
  // Adjust recommendations based on pain intensity
  if (intensity >= 7) {
    // For high pain (7-10), only show gentle exercises
    filteredExercises = filteredExercises.filter(exercise =>
      exercise.category === 'stretch' || exercise.category === 'relaxation'
    );
  } else if (intensity >= 4) {
    // For moderate pain (4-6), prioritize gentler exercises
    filteredExercises.sort((a, b) => {
      const categoryPriority = {
        stretch: 0,
        relaxation: 1,
        mobility: 2,
        strength: 3
      };
      return categoryPriority[a.category] - categoryPriority[b.category];
    });
  }
  
  // Ensure a mix of exercise types
  const categorizedExercises = {
    stretch: filteredExercises.filter(e => e.category === 'stretch'),
    mobility: filteredExercises.filter(e => e.category === 'mobility'),
    strength: filteredExercises.filter(e => e.category === 'strength'),
    relaxation: filteredExercises.filter(e => e.category === 'relaxation')
  };
  
  // Build final recommendation list
  const recommendations: Exercise[] = [];
  
  // Always include at least one stretch
  if (categorizedExercises.stretch.length > 0) {
    recommendations.push(categorizedExercises.stretch[0]);
  }
  
  // Add mobility or strength exercise if pain isn't severe
  if (intensity < 7 && categorizedExercises.mobility.length > 0) {
    recommendations.push(categorizedExercises.mobility[0]);
  }
  
  // Add relaxation exercise
  if (categorizedExercises.relaxation.length > 0) {
    recommendations.push(categorizedExercises.relaxation[0]);
  }
  
  // Fill remaining slots with other exercises
  while (recommendations.length < 3 && filteredExercises.length > recommendations.length) {
    const nextExercise = filteredExercises.find(e => 
      !recommendations.includes(e)
    );
    if (nextExercise) {
      recommendations.push(nextExercise);
    } else {
      break;
    }
  }
  
  return recommendations;
}

/**
 * Get AI-powered recommendations based on user history and current pain
 */
export function getAIRecommendations(
  region: BodyRegion,
  intensity: number,
  history: Array<{ region: BodyRegion; intensity: number; type: PainType; timestamp: string }>,
  userSettings: { preferredDifficulty: DifficultyLevel; equipment: Equipment[] }
): Exercise[] {
  // Analyze pain patterns
  const recentHistory = history.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const now = new Date();
    const daysDiff = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7; // Look at last 7 days
  });
  
  // Determine pain type based on history
  const painType = recentHistory.length >= 3 ? 'chronic' : 'acute';
  
  // Get recommendations using main function
  return getRecommendations(
    region,
    intensity,
    painType,
    userSettings.preferredDifficulty,
    userSettings.equipment
  );
}