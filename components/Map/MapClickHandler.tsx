'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Location } from '../../lib/types';

interface MapClickHandlerProps {
  isAddingMode: boolean;
  onMapClick: (location: Location) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ isAddingMode, onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    if (isAddingMode) {
      const handleClick = (e: LeafletMouseEvent) => {
        onMapClick({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      };

      map.on('click', handleClick);
      return () => {
        map.off('click', handleClick);
      };
    }
  }, [map, isAddingMode, onMapClick]);

  return null;
};

export default MapClickHandler;
