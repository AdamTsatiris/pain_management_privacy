/**
 * Safe localStorage wrapper with type checking and error handling
 */

const APP_PREFIX = 'painrelief-';

/**
 * Get an item from localStorage with type safety
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(APP_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Set an item in localStorage with error handling
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(APP_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

/**
 * Remove an item from localStorage with error handling
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(APP_PREFIX + key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

/**
 * Clear all app-related data from localStorage
 */
export function clearAppData(): void {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(APP_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing app data from localStorage:', error);
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = APP_PREFIX + 'test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}