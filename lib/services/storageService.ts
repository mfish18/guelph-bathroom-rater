/**
 * Client-side storage service for managing bathroom data
 * Uses localStorage for persistence
 */

import { Bathroom, Rating, Averages } from '../types';

const BATHROOM_PREFIX = 'bathroom:';
const BATHROOMS_LIST_KEY = 'bathrooms_list';

/**
 * Load all bathrooms from localStorage
 */
export const loadBathrooms = (): Bathroom[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const bathroomIds = JSON.parse(localStorage.getItem(BATHROOMS_LIST_KEY) || '[]') as string[];
    const bathrooms = bathroomIds
      .map(id => {
        const data = localStorage.getItem(`${BATHROOM_PREFIX}${id}`);
        return data ? JSON.parse(data) as Bathroom : null;
      })
      .filter((bathroom): bathroom is Bathroom => bathroom !== null);
    return bathrooms;
  } catch (error) {
    console.error('Error loading bathrooms:', error);
    return [];
  }
};

/**
 * Save a bathroom to localStorage
 */
export const saveBathroom = (bathroom: Bathroom): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Save the bathroom data
    localStorage.setItem(`${BATHROOM_PREFIX}${bathroom.id}`, JSON.stringify(bathroom));
    
    // Update the list of bathroom IDs
    const bathroomIds = JSON.parse(localStorage.getItem(BATHROOMS_LIST_KEY) || '[]') as string[];
    if (!bathroomIds.includes(bathroom.id)) {
      bathroomIds.push(bathroom.id);
      localStorage.setItem(BATHROOMS_LIST_KEY, JSON.stringify(bathroomIds));
    }
    
    return true;
  } catch (error) {
    console.error('Error saving bathroom:', error);
    return false;
  }
};

/**
 * Delete a bathroom from localStorage
 */
export const deleteBathroom = (bathroomId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(`${BATHROOM_PREFIX}${bathroomId}`);
    
    // Update the list of bathroom IDs
    const bathroomIds = JSON.parse(localStorage.getItem(BATHROOMS_LIST_KEY) || '[]') as string[];
    const updatedIds = bathroomIds.filter(id => id !== bathroomId);
    localStorage.setItem(BATHROOMS_LIST_KEY, JSON.stringify(updatedIds));
    
    return true;
  } catch (error) {
    console.error('Error deleting bathroom:', error);
    return false;
  }
};

/**
 * Calculate average ratings from an array of ratings
 */
export const calculateAverages = (ratings: Rating[]): Averages => {
  if (!ratings || ratings.length === 0) {
    return { cleanliness: 0, supplies: 0, smell: 0 };
  }

  const totals = ratings.reduce((acc, r) => ({
    cleanliness: acc.cleanliness + r.cleanliness,
    supplies: acc.supplies + r.supplies,
    smell: acc.smell + r.smell
  }), { cleanliness: 0, supplies: 0, smell: 0 });

  const count = ratings.length;
  return {
    cleanliness: totals.cleanliness / count,
    supplies: totals.supplies / count,
    smell: totals.smell / count
  };
};
