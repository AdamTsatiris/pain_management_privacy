import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Exercise, ExerciseRoutine, PainData } from '../models/types';
import { format } from 'date-fns';

/**
 * Export exercise routine as PDF
 */
export async function exportRoutinePDF(routine: ExerciseRoutine): Promise<string> {
  const pdf = new jsPDF();
  let yOffset = 20;

  // Add title
  pdf.setFontSize(20);
  pdf.text(routine.name, 20, yOffset);
  yOffset += 10;

  // Add description
  pdf.setFontSize(12);
  pdf.text(routine.description, 20, yOffset);
  yOffset += 20;

  // Add exercises
  routine.exercises.forEach((exercise, index) => {
    // Exercise title
    pdf.setFontSize(14);
    pdf.text(`${index + 1}. ${exercise.title}`, 20, yOffset);
    yOffset += 10;

    // Exercise details
    pdf.setFontSize(10);
    const details = [
      `Duration: ${exercise.duration}`,
      `Equipment: ${exercise.equipment.join(', ')}`,
      'Instructions:',
      ...exercise.instructions.execution.map((step, i) => `  ${i + 1}. ${step}`),
    ];

    details.forEach(line => {
      // Check if we need a new page
      if (yOffset > 270) {
        pdf.addPage();
        yOffset = 20;
      }
      pdf.text(line, 30, yOffset);
      yOffset += 5;
    });

    yOffset += 10;
  });

  // Add footer with date
  pdf.setFontSize(8);
  pdf.text(
    `Generated on ${format(new Date(), 'PPP')}`,
    20,
    pdf.internal.pageSize.height - 10
  );

  return pdf.output('dataurlstring');
}

/**
 * Generate shareable routine link
 */
export function generateRoutineLink(routine: ExerciseRoutine): string {
  // Create a minimal version of the routine without personal data
  const shareableRoutine = {
    name: routine.name,
    description: routine.description,
    exercises: routine.exercises.map(exercise => ({
      id: exercise.id,
      title: exercise.title,
      duration: exercise.duration,
      difficulty: exercise.difficulty,
    })),
    duration: routine.duration,
    difficulty: routine.difficulty,
  };

  // Encode the routine data
  const encodedData = btoa(JSON.stringify(shareableRoutine));
  
  // Return a shareable link format
  return `${window.location.origin}/share/${encodedData}`;
}

/**
 * Export pain data as CSV
 */
export function exportPainDataCSV(painData: PainData[]): string {
  const headers = [
    'Date',
    'Region',
    'Intensity',
    'Type',
    'Notes',
    'Stress Level',
    'Sleep Quality',
    'Activity Level',
    'Hydration Level',
  ].join(',');

  const rows = painData.map(entry => [
    format(new Date(entry.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    entry.region,
    entry.intensity,
    entry.type,
    entry.notes?.replace(/,/g, ';'),
    entry.stressLevel || '',
    entry.sleepQuality || '',
    entry.activityLevel || '',
    entry.hydrationLevel || '',
  ].join(','));

  return [headers, ...rows].join('\n');
}

/**
 * Generate exercise cards for printing
 */
export async function generateExerciseCards(exercises: Exercise[]): Promise<string[]> {
  const cards: string[] = [];

  for (const exercise of exercises) {
    // Create a temporary div for the exercise card
    const cardElement = document.createElement('div');
    cardElement.className = 'exercise-card';
    cardElement.innerHTML = `
      <h3>${exercise.title}</h3>
      <p>${exercise.description}</p>
      <div class="instructions">
        ${exercise.instructions.execution.map((step, i) => 
          `<p>${i + 1}. ${step}</p>`
        ).join('')}
      </div>
      ${exercise.imageUrl ? `<img src="${exercise.imageUrl}" alt="${exercise.title}" />` : ''}
    `;

    // Convert the card to an image
    const canvas = await html2canvas(cardElement);
    cards.push(canvas.toDataURL());

    // Clean up
    cardElement.remove();
  }

  return cards;
}