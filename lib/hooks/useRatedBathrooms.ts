'use client';

import { useState, useEffect } from 'react';

export const useRatedBathrooms = () => {
  const [ratedBathrooms, setRatedBathrooms] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem('rated_bathrooms');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRatedBathrooms(new Set(parsed));
      } catch (error) {
        console.error('Error loading rated bathrooms:', error);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('rated_bathrooms', JSON.stringify([...ratedBathrooms]));
  }, [ratedBathrooms]);

  const hasRated = (bathroomId: string): boolean => {
    return ratedBathrooms.has(bathroomId);
  };

  const markAsRated = (bathroomId: string) => {
    setRatedBathrooms(prev => new Set([...prev, bathroomId]));
  };

  return { hasRated, markAsRated };
};