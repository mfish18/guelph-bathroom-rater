'use client';

import dynamic from 'next/dynamic';
import { Bathroom, Location } from '../../lib/types';

interface MapWrapperProps {
  bathrooms: Bathroom[];
  newLocation: Location | null;
  isAddingMode: boolean;
  onMapClick: (location: Location) => void;
  onMarkerClick: (bathroom: Bathroom) => void;
}

// Dynamically import the map component with no SSR
const BathroomMap = dynamic(
  () => import('./BathroomMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }
);

const MapWrapper: React.FC<MapWrapperProps> = (props) => {
  return <BathroomMap {...props} />;
};

export default MapWrapper;
