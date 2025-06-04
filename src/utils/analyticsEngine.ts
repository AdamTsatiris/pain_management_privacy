import { PainData, WellnessData, ProgressData } from '../models/types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, parseISO } from 'date-fns';

/**
 * Analyzes pain patterns over time
 */
export function analyzePainPatterns(painData: PainData[]): {
  commonRegions: string[];
  timePatterns: { [key: string]: number };
  weatherCorrelations: { [key: string]: number };
  triggers: { [key: string]: number };
} {
  const patterns = {
    commonRegions: {} as { [key: string]: number },
    timePatterns: {} as { [key: string]: number },
    weatherCorrelations: {} as { [key: string]: number },
    triggers: {} as { [key: string]: number },
  };

  painData.forEach(entry => {
    // Analyze regions
    patterns.commonRegions[entry.region] = (patterns.commonRegions[entry.region] || 0) + 1;

    // Analyze time patterns
    const hour = new Date(entry.timestamp).getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    patterns.timePatterns[timeOfDay] = (patterns.timePatterns[timeOfDay] || 0) + 1;

    // Analyze weather correlations if available
    if (entry.weather) {
      patterns.weatherCorrelations[entry.weather.condition] = 
        (patterns.weatherCorrelations[entry.weather.condition] || 0) + 1;
    }

    // Analyze triggers
    entry.triggers?.forEach(trigger => {
      patterns.triggers[trigger] = (patterns.triggers[trigger] || 0) + 1;
    });
  });

  return {
    commonRegions: Object.entries(patterns.commonRegions)
      .sort(([,a], [,b]) => b - a)
      .map(([region]) => region),
    timePatterns: patterns.timePatterns,
    weatherCorrelations: patterns.weatherCorrelations,
    triggers: patterns.triggers,
  };
}

/**
 * Calculates wellness correlations with pain levels
 */
export function analyzeWellnessCorrelations(
  painData: PainData[],
  wellnessData: WellnessData[]
): {
  stressCorrelation: number;
  sleepCorrelation: number;
  activityCorrelation: number;
  hydrationCorrelation: number;
} {
  const correlations = {
    stress: [] as [number, number][],
    sleep: [] as [number, number][],
    activity: [] as [number, number][],
    hydration: [] as [number, number][],
  };

  // Match wellness data with pain data by timestamp (same day)
  painData.forEach(pain => {
    const painDate = format(parseISO(pain.timestamp), 'yyyy-MM-dd');
    const matchingWellness = wellnessData.find(w => 
      format(parseISO(w.timestamp), 'yyyy-MM-dd') === painDate
    );

    if (matchingWellness) {
      correlations.stress.push([matchingWellness.stressLevel, pain.intensity]);
      correlations.sleep.push([matchingWellness.sleepQuality, pain.intensity]);
      correlations.activity.push([matchingWellness.activityLevel, pain.intensity]);
      correlations.hydration.push([matchingWellness.hydrationLevel, pain.intensity]);
    }
  });

  return {
    stressCorrelation: calculateCorrelation(correlations.stress),
    sleepCorrelation: calculateCorrelation(correlations.sleep),
    activityCorrelation: calculateCorrelation(correlations.activity),
    hydrationCorrelation: calculateCorrelation(correlations.hydration),
  };
}

/**
 * Analyzes exercise effectiveness
 */
export function analyzeExerciseEffectiveness(progressData: ProgressData[]): {
  mostEffective: string[];
  painReduction: number;
  adherenceRate: number;
  difficultyTrends: { [key: string]: number };
} {
  const exerciseStats = {} as { 
    [key: string]: { 
      totalRating: number; 
      count: number; 
      painReduction: number;
      completed: number;
    } 
  };

  progressData.forEach(progress => {
    progress.exercises.forEach(exercise => {
      if (!exerciseStats[exercise.exerciseId]) {
        exerciseStats[exercise.exerciseId] = {
          totalRating: 0,
          count: 0,
          painReduction: 0,
          completed: 0,
        };
      }

      exerciseStats[exercise.exerciseId].totalRating += exercise.difficulty;
      exerciseStats[exercise.exerciseId].count += 1;
      exerciseStats[exercise.exerciseId].painReduction += progress.painLevelChange;
      exerciseStats[exercise.exerciseId].completed += exercise.completed ? 1 : 0;
    });
  });

  const mostEffective = Object.entries(exerciseStats)
    .sort(([,a], [,b]) => 
      (b.painReduction / b.count) - (a.painReduction / a.count)
    )
    .map(([id]) => id);

  const totalExercises = progressData.reduce(
    (sum, p) => sum + p.exercises.length, 
    0
  );
  const completedExercises = progressData.reduce(
    (sum, p) => sum + p.exercises.filter(e => e.completed).length, 
    0
  );

  return {
    mostEffective,
    painReduction: progressData.reduce((sum, p) => sum + p.painLevelChange, 0) / progressData.length,
    adherenceRate: completedExercises / totalExercises,
    difficultyTrends: Object.fromEntries(
      Object.entries(exerciseStats).map(([id, stats]) => [
        id,
        stats.totalRating / stats.count,
      ])
    ),
  };
}

/**
 * Calculate Pearson correlation coefficient
 */
function calculateCorrelation(data: [number, number][]): number {
  if (data.length < 2) return 0;

  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  data.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  });

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}