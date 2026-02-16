'use client';

import { useState, useEffect } from 'react';
import Header from '../components/UI/Header';
import Controls from '../components/UI/Control';
import MapWrapper from '../components/Map/MapWrapper';
import AddBathroomForm from '../components/Bathroom/AddBathroomForm';
import BathroomDetailPanel from '../components/Bathroom/BathroomDetails';
import RatingForm from '../components/Rating/RatingForm';
import { loadBathrooms, saveBathroom, calculateAverages } from '../lib/services/storageService';
import { Bathroom, Location, NewBathroomData, CurrentRating } from '../lib/types';

/**
 * Main application page component
 */
export default function Home() {
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
  const [isAddingMode, setIsAddingMode] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<Location | null>(null);
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Load bathrooms from storage on mount
  useEffect(() => {
    setMounted(true);
    const loadedBathrooms = loadBathrooms();
    setBathrooms(loadedBathrooms);
  }, []);

  // Toggle adding mode
  const handleToggleAddMode = () => {
    setIsAddingMode(!isAddingMode);
    setNewLocation(null);
  };

  // Handle map click when in adding mode
  const handleMapClick = (location: Location) => {
    if (isAddingMode) {
      setNewLocation(location);
    }
  };

  // Handle marker click to view bathroom details
  const handleMarkerClick = (bathroom: Bathroom) => {
    if (!isAddingMode) {
      setSelectedBathroom(bathroom);
    }
  };

  // Add new bathroom
  const handleAddBathroom = (bathroomData: NewBathroomData) => {
    const bathroom: Bathroom = {
      id: Date.now().toString(),
      ...bathroomData,
      ratings: [],
      averages: { cleanliness: 0, supplies: 0, smell: 0 }
    };

    saveBathroom(bathroom);
    setBathrooms([...bathrooms, bathroom]);
    setNewLocation(null);
    setIsAddingMode(false);
  };

  // Submit a rating for a bathroom
  const handleSubmitRating = (rating: CurrentRating) => {
    if (!selectedBathroom) return;

    const updatedBathroom: Bathroom = { ...selectedBathroom };
    updatedBathroom.ratings.push({
      ...rating,
      timestamp: Date.now()
    });

    // Recalculate averages
    updatedBathroom.averages = calculateAverages(updatedBathroom.ratings);

    saveBathroom(updatedBathroom);
    setBathrooms(bathrooms.map(b => 
      b.id === updatedBathroom.id ? updatedBathroom : b
    ));
    setSelectedBathroom(updatedBathroom);
    setShowRatingForm(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="app-container">
      <Header />
      
      <Controls
        isAddingMode={isAddingMode}
        onToggleAddMode={handleToggleAddMode}
        bathroomCount={bathrooms.length}
      />

      <div className="map-container">
        <MapWrapper
          bathrooms={bathrooms}
          newLocation={newLocation}
          isAddingMode={isAddingMode}
          onMapClick={handleMapClick}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* Add Bathroom Form */}
      {newLocation && (
        <AddBathroomForm
          location={newLocation}
          onSubmit={handleAddBathroom}
          onCancel={() => setNewLocation(null)}
        />
      )}

      {/* Bathroom Detail Panel */}
      {selectedBathroom && !showRatingForm && (
        <BathroomDetailPanel
          bathroom={selectedBathroom}
          onRate={() => setShowRatingForm(true)}
          onClose={() => setSelectedBathroom(null)}
        />
      )}

      {/* Rating Form */}
      {showRatingForm && selectedBathroom && (
        <RatingForm
          bathroom={selectedBathroom}
          onSubmit={handleSubmitRating}
          onClose={() => setShowRatingForm(false)}
        />
      )}
    </div>
  );
}
