import { CurrentRating } from '../types';

// University of Guelph coordinates
export const GUELPH_CENTER: [number, number] = [43.5320, -80.2258];

// Default map zoom level
export const DEFAULT_ZOOM: number = 16;

// Rating categories
export const RATING_CATEGORIES = {
  CLEANLINESS: 'cleanliness',
  SUPPLIES: 'supplies',
  SMELL: 'smell'
} as const;

// Initial rating state
export const INITIAL_RATING: CurrentRating = {
  cleanliness: 0,
  supplies: 0,
  smell: 0
};
