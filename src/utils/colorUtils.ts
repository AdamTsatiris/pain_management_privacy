/**
 * Gets the color representing a pain intensity level (1-10)
 * Returns a hex color string that changes from green (mild) to yellow (moderate) to red (severe)
 */
export function getPainColor(intensity: number): string {
  // Ensure intensity is within valid range
  const level = Math.max(1, Math.min(10, intensity));
  
  // For levels 1-3 (mild): Green to Yellow-Green
  if (level <= 3) {
    const ratio = (level - 1) / 2;
    return interpolateColor('#00B894', '#AED246', ratio);
  }
  
  // For levels 4-7 (moderate): Yellow-Green to Orange
  if (level <= 7) {
    const ratio = (level - 4) / 3;
    return interpolateColor('#AED246', '#FF9500', ratio);
  }
  
  // For levels 8-10 (severe): Orange to Red
  const ratio = (level - 8) / 2;
  return interpolateColor('#FF9500', '#FF5252', ratio);
}

/**
 * Interpolates between two hex colors
 */
function interpolateColor(color1: string, color2: string, ratio: number): string {
  // Convert hex to RGB
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  
  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}