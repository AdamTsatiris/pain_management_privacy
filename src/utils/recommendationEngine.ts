import { BodyRegion } from '../models/types';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Gentle' | 'Moderate' | 'Intense';
  category: 'Stretch' | 'Mobility' | 'Strength' | 'Relaxation';
  steps: string[];
  imageUrl?: string;
  targetRegions: BodyRegion[];
  equipment: string[];
  safetyNotes: string[];
}

// Comprehensive exercise database
const exerciseDatabase: Recommendation[] = [
  // HEAD AND NECK EXERCISES
  {
    id: 'neck-stretch-basic',
    title: 'Gentle Neck Stretches',
    description: 'Simple neck stretches to relieve tension and improve mobility in the neck and upper shoulders.',
    duration: '5-7 minutes',
    difficulty: 'Gentle',
    category: 'Stretch',
    targetRegions: ['neck', 'head', 'shoulder_left', 'shoulder_right'],
    equipment: ['None'],
    steps: [
      'Sit or stand with your back straight and shoulders relaxed',
      'Slowly tilt your head to the right, bringing your ear toward your shoulder',
      'Hold for 15-30 seconds, feeling a gentle stretch on the left side',
      'Return to center and repeat on the left side',
      'Perform 3 sets on each side'
    ],
    safetyNotes: [
      'Move slowly and avoid sudden movements',
      'Stop if you feel sharp or shooting pain',
      'Never force the stretch beyond comfort'
    ],
    imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg'
  },
  {
    id: 'neck-rotation',
    title: 'Neck Rotations',
    description: 'Gentle circular movements to improve neck mobility and reduce stiffness.',
    duration: '3-5 minutes',
    difficulty: 'Gentle',
    category: 'Mobility',
    targetRegions: ['neck', 'head'],
    equipment: ['None'],
    steps: [
      'Sit comfortably with your spine straight',
      'Slowly lower your chin toward your chest',
      'Gently rotate your head to the right in a half-circle motion',
      'Return to center and repeat to the left',
      'Perform 5 rotations in each direction'
    ],
    safetyNotes: [
      'Avoid full circular motions that extend the neck backward',
      'Keep movements slow and controlled',
      'Stop if you experience dizziness'
    ]
  },

  // SHOULDER EXERCISES
  {
    id: 'shoulder-blade-squeeze',
    title: 'Shoulder Blade Squeezes',
    description: 'Strengthen the muscles between your shoulder blades and improve posture.',
    duration: '3-5 minutes',
    difficulty: 'Gentle',
    category: 'Strength',
    targetRegions: ['shoulder_left', 'shoulder_right', 'back_upper'],
    equipment: ['None'],
    steps: [
      'Sit or stand with your arms at your sides',
      'Squeeze your shoulder blades together as if trying to hold a pencil between them',
      'Hold for 5-10 seconds',
      'Release slowly and repeat',
      'Perform 10-15 repetitions'
    ],
    safetyNotes: [
      'Keep your shoulders down, away from your ears',
      'Maintain normal breathing throughout',
      'Start with shorter holds if needed'
    ],
    imageUrl: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg'
  },
  {
    id: 'arm-circles',
    title: 'Gentle Arm Circles',
    description: 'Improve shoulder mobility and warm up the shoulder joints.',
    duration: '2-3 minutes',
    difficulty: 'Gentle',
    category: 'Mobility',
    targetRegions: ['shoulder_left', 'shoulder_right', 'arm_upper_left', 'arm_upper_right'],
    equipment: ['None'],
    steps: [
      'Stand with your feet shoulder-width apart',
      'Extend your arms out to the sides at shoulder height',
      'Make small circles forward for 10 repetitions',
      'Reverse direction and make small circles backward for 10 repetitions',
      'Gradually increase circle size if comfortable'
    ],
    safetyNotes: [
      'Start with small circles and increase size gradually',
      'Stop if you feel pain or discomfort',
      'Keep movements controlled and smooth'
    ]
  },

  // BACK EXERCISES
  {
    id: 'cat-cow-stretch',
    title: 'Cat-Cow Stretch',
    description: 'Gentle spinal mobility exercise to improve flexibility and reduce back tension.',
    duration: '5-7 minutes',
    difficulty: 'Gentle',
    category: 'Mobility',
    targetRegions: ['back_upper', 'back_lower', 'neck'],
    equipment: ['Yoga mat or soft surface'],
    steps: [
      'Start on your hands and knees with wrists under shoulders and knees under hips',
      'Inhale and arch your back, lifting your chest and tailbone (Cow pose)',
      'Exhale and round your spine, tucking your chin and tailbone (Cat pose)',
      'Move slowly between the two positions',
      'Repeat 10-15 times, coordinating with your breath'
    ],
    safetyNotes: [
      'Move slowly and avoid forcing the range of motion',
      'Keep your shoulders stable throughout the movement',
      'Stop if you experience sharp pain'
    ],
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
  },
  {
    id: 'knee-to-chest',
    title: 'Knee to Chest Stretch',
    description: 'Gentle lower back stretch that helps relieve tension and improve flexibility.',
    duration: '5-8 minutes',
    difficulty: 'Gentle',
    category: 'Stretch',
    targetRegions: ['back_lower', 'hip_left', 'hip_right'],
    equipment: ['Yoga mat or comfortable surface'],
    steps: [
      'Lie on your back with both knees bent and feet flat on the floor',
      'Bring one knee toward your chest, holding behind the thigh',
      'Hold for 20-30 seconds, feeling a gentle stretch in your lower back',
      'Lower the leg and repeat with the other side',
      'Perform 2-3 repetitions on each side'
    ],
    safetyNotes: [
      'Keep your lower back pressed gently against the floor',
      'Avoid pulling on your knee directly',
      'Breathe deeply throughout the stretch'
    ]
  },

  // ARM EXERCISES
  {
    id: 'wrist-circles',
    title: 'Wrist Circles and Stretches',
    description: 'Improve wrist mobility and relieve tension from repetitive activities.',
    duration: '3-5 minutes',
    difficulty: 'Gentle',
    category: 'Mobility',
    targetRegions: ['arm_lower_left', 'arm_lower_right', 'hand_left', 'hand_right'],
    equipment: ['None'],
    steps: [
      'Extend your arms in front of you at shoulder height',
      'Make slow circles with your wrists, 10 times in each direction',
      'Flex your wrists up and down 10 times',
      'Gently stretch each wrist by pulling back on your fingers',
      'Hold each stretch for 15-20 seconds'
    ],
    safetyNotes: [
      'Keep movements gentle and controlled',
      'Stop if you feel tingling or numbness',
      'Take breaks if you experience fatigue'
    ]
  },
  {
    id: 'tricep-stretch',
    title: 'Gentle Tricep Stretch',
    description: 'Stretch the back of your arms and improve shoulder flexibility.',
    duration: '3-4 minutes',
    difficulty: 'Gentle',
    category: 'Stretch',
    targetRegions: ['arm_upper_left', 'arm_upper_right', 'shoulder_left', 'shoulder_right'],
    equipment: ['None'],
    steps: [
      'Raise one arm overhead and bend the elbow, reaching down your back',
      'Use your other hand to gently pull the elbow toward your head',
      'Hold for 20-30 seconds, feeling a stretch along the back of your arm',
      'Switch arms and repeat',
      'Perform 2-3 repetitions on each side'
    ],
    safetyNotes: [
      'Apply gentle pressure only',
      'Stop if you feel pain in your shoulder or elbow',
      'Keep your spine straight throughout the stretch'
    ]
  },

  // LEG EXERCISES
  {
    id: 'hamstring-stretch',
    title: 'Seated Hamstring Stretch',
    description: 'Gentle stretch for the back of your thighs to improve flexibility.',
    duration: '5-7 minutes',
    difficulty: 'Gentle',
    category: 'Stretch',
    targetRegions: ['leg_upper_left', 'leg_upper_right', 'back_lower'],
    equipment: ['Chair'],
    steps: [
      'Sit on the edge of a chair with one leg extended straight',
      'Keep your heel on the ground and toes pointing up',
      'Lean forward slightly from your hips until you feel a stretch',
      'Hold for 20-30 seconds',
      'Switch legs and repeat'
    ],
    safetyNotes: [
      'Keep your back straight while leaning forward',
      'Stop if you feel pain behind your knee',
      'Breathe normally throughout the stretch'
    ]
  },
  {
    id: 'calf-stretch',
    title: 'Standing Calf Stretch',
    description: 'Stretch your calf muscles to improve lower leg flexibility.',
    duration: '4-6 minutes',
    difficulty: 'Gentle',
    category: 'Stretch',
    targetRegions: ['leg_lower_left', 'leg_lower_right', 'foot_left', 'foot_right'],
    equipment: ['Wall'],
    steps: [
      'Stand arm\'s length from a wall',
      'Place your hands against the wall',
      'Step your right foot back about 2-3 feet',
      'Keep your right heel on the ground and lean forward',
      'Hold for 20-30 seconds, then switch legs'
    ],
    safetyNotes: [
      'Keep your back leg straight and heel down',
      'Don\'t bounce during the stretch',
      'Adjust distance from wall as needed'
    ]
  },

  // RELAXATION EXERCISES
  {
    id: 'deep-breathing',
    title: 'Deep Breathing Exercise',
    description: 'Relaxation technique to reduce stress and muscle tension throughout the body.',
    duration: '5-10 minutes',
    difficulty: 'Gentle',
    category: 'Relaxation',
    targetRegions: ['chest', 'abdomen', 'neck', 'back_upper'],
    equipment: ['None'],
    steps: [
      'Sit or lie down in a comfortable position',
      'Place one hand on your chest and one on your abdomen',
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 2 counts',
      'Exhale slowly through your mouth for 6 counts',
      'Repeat for 5-10 cycles'
    ],
    safetyNotes: [
      'Don\'t force your breathing',
      'Stop if you feel dizzy or lightheaded',
      'Practice regularly for best results'
    ]
  },
  {
    id: 'progressive-relaxation',
    title: 'Progressive Muscle Relaxation',
    description: 'Systematic relaxation technique to release tension throughout your body.',
    duration: '10-15 minutes',
    difficulty: 'Gentle',
    category: 'Relaxation',
    targetRegions: ['head', 'neck', 'shoulder_left', 'shoulder_right', 'back_upper', 'back_lower'],
    equipment: ['Comfortable surface'],
    steps: [
      'Lie down comfortably and close your eyes',
      'Starting with your toes, tense each muscle group for 5 seconds',
      'Release the tension and notice the relaxation for 10 seconds',
      'Move progressively up your body: feet, calves, thighs, abdomen, arms, shoulders, neck, face',
      'End by taking several deep breaths and enjoying the full-body relaxation'
    ],
    safetyNotes: [
      'Don\'t tense muscles too forcefully',
      'Skip any areas that are injured or painful',
      'Practice in a quiet, comfortable environment'
    ]
  }
];

/**
 * Get personalized exercise recommendations based on selected body region and pain intensity
 */
export function getRecommendations(region: BodyRegion, painIntensity: number): Recommendation[] {
  // Filter exercises that target the selected region
  let relevantExercises = exerciseDatabase.filter(exercise => 
    exercise.targetRegions.includes(region)
  );

  // Adjust recommendations based on pain intensity
  if (painIntensity >= 7) {
    // High pain: Only gentle stretches and relaxation
    relevantExercises = relevantExercises.filter(exercise => 
      exercise.difficulty === 'Gentle' && 
      (exercise.category === 'Stretch' || exercise.category === 'Relaxation')
    );
  } else if (painIntensity >= 4) {
    // Moderate pain: Gentle exercises and some mobility
    relevantExercises = relevantExercises.filter(exercise => 
      exercise.difficulty === 'Gentle'
    );
  }

  // Sort by category priority (Stretch > Mobility > Strength > Relaxation for pain relief)
  const categoryPriority = { 'Stretch': 0, 'Mobility': 1, 'Strength': 2, 'Relaxation': 3 };
  relevantExercises.sort((a, b) => categoryPriority[a.category] - categoryPriority[b.category]);

  // Return top 3-5 recommendations
  const recommendations = relevantExercises.slice(0, 5);

  // If we don't have enough specific exercises, add some general relaxation exercises
  if (recommendations.length < 3) {
    const relaxationExercises = exerciseDatabase.filter(exercise => 
      exercise.category === 'Relaxation' && 
      !recommendations.includes(exercise)
    );
    recommendations.push(...relaxationExercises.slice(0, 3 - recommendations.length));
  }

  return recommendations;
}

/**
 * Get related body regions for more comprehensive recommendations
 */
export function getRelatedRegions(region: BodyRegion): BodyRegion[] {
  const relationshipMap: Record<BodyRegion, BodyRegion[]> = {
    head: ['neck'],
    neck: ['head', 'shoulder_left', 'shoulder_right', 'back_upper'],
    shoulder_left: ['neck', 'arm_upper_left', 'back_upper'],
    shoulder_right: ['neck', 'arm_upper_right', 'back_upper'],
    arm_upper_left: ['shoulder_left', 'arm_lower_left'],
    arm_upper_right: ['shoulder_right', 'arm_lower_right'],
    arm_lower_left: ['arm_upper_left', 'hand_left'],
    arm_lower_right: ['arm_upper_right', 'hand_right'],
    hand_left: ['arm_lower_left'],
    hand_right: ['arm_lower_right'],
    chest: ['back_upper', 'shoulder_left', 'shoulder_right'],
    abdomen: ['back_lower', 'chest'],
    back_upper: ['neck', 'shoulder_left', 'shoulder_right', 'back_lower'],
    back_lower: ['back_upper', 'hip_left', 'hip_right'],
    hip_left: ['back_lower', 'leg_upper_left'],
    hip_right: ['back_lower', 'leg_upper_right'],
    leg_upper_left: ['hip_left', 'leg_lower_left'],
    leg_upper_right: ['hip_right', 'leg_lower_right'],
    leg_lower_left: ['leg_upper_left', 'foot_left'],
    leg_lower_right: ['leg_upper_right', 'foot_right'],
    foot_left: ['leg_lower_left'],
    foot_right: ['leg_lower_right']
  };

  return [region, ...(relationshipMap[region] || [])];
}