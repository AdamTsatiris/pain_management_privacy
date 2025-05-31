/**
 * Safe localStorage wrapper with type checking and error handling
 */

/**
 * Get an item from localStorage with type safety
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Set an item in localStorage with error handling
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Remove an item from localStorage with error handling
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

/**
 * Clear all app-related data from localStorage
 */
export function clearAppData(): void {
  try {
    // Get all keys and filter for those that begin with our app prefix
    const appPrefix = 'painrelief-';
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(appPrefix)) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Error clearing app data from localStorage:', error);
  }
}