'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapClickHandler from './MapClickHandler';
import { GUELPH_CENTER, DEFAULT_ZOOM } from '../../lib/utils/constants';
import { Bathroom, Location } from '../../lib/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

if (typeof window !== 'undefined') {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface BathroomMapProps {
  bathrooms: Bathroom[];
  newLocation: Location | null;
  isAddingMode: boolean;
  onMapClick: (location: Location) => void;
  onMarkerClick: (bathroom: Bathroom) => void;
}

const BathroomMap: React.FC<BathroomMapProps> = ({ 
  bathrooms, 
  newLocation, 
  isAddingMode, 
  onMapClick, 
  onMarkerClick 
}) => {
  return (
    <MapContainer
      center={GUELPH_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <MapClickHandler 
        isAddingMode={isAddingMode} 
        onMapClick={onMapClick} 
      />
      {bathrooms.map((bathroom) => (
        <Marker
          key={bathroom.id}
          position={[bathroom.lat, bathroom.lng]}
          eventHandlers={{
            click: () => onMarkerClick(bathroom)
          }}
        />
      ))}

      {newLocation && (
        <Marker position={[newLocation.lat, newLocation.lng]} />
      )}
    </MapContainer>
  );
};

export default BathroomMap;
