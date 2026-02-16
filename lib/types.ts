// Type definitions for the Bathroom Rater app

export interface Location {
  lat: number;
  lng: number;
}

export interface Rating {
  cleanliness: number;
  supplies: number;
  smell: number;
  timestamp: number;
}

export interface Averages {
  cleanliness: number;
  supplies: number;
  smell: number;
}

export interface Bathroom extends Location {
  id: string;
  building: string;
  floor: string;
  notes?: string;
  ratings: Rating[];
  averages: Averages;
}

export interface NewBathroomData extends Location {
  building: string;
  floor: string;
  notes?: string;
}

export interface CurrentRating {
  cleanliness: number;
  supplies: number;
  smell: number;
}
