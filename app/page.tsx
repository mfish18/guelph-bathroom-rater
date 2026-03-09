'use client';

import { useState, useEffect } from 'react';
import Header from '../components/UI/Header';
import Controls from '../components/UI/Control';
import MapWrapper from '../components/Map/MapWrapper';
import AddBathroomForm from '../components/Bathroom/AddBathroomForm';
import BathroomDetailPanel from '../components/Bathroom/BathroomDetails';
import RatingForm from '../components/Rating/RatingForm';
import { useIsAdmin } from '../lib/hooks/useIsAdmin';
import { useRatedBathrooms } from '../lib/hooks/useRatedBathrooms';
import { loadBathrooms, saveBathroom, calculateAverages, deleteBathroom } from '../lib/services/storageService';
import { Bathroom, Location, NewBathroomData, CurrentRating } from '../lib/types';

export default function Home() {
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
  const [isAddingMode, setIsAddingMode] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<Location | null>(null);
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  // Check if current user is admin
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  
  // Track which bathrooms user has rated
  const { hasRated, markAsRated } = useRatedBathrooms();

  // Load bathrooms from storage on mount
  useEffect(() => {
    const initBathrooms = async () => {
      setMounted(true);
      const loadedBathrooms = await loadBathrooms();
      setBathrooms(loadedBathrooms);
    };
    initBathrooms();
  }, []);

  // Toggle adding mode (only works if admin)
  const handleToggleAddMode = () => {
    if (!isAdmin) return; // Safety check
    setIsAddingMode(!isAddingMode);
    setNewLocation(null);
  };

  // Handle map click when in adding mode
  const handleMapClick = (location: Location) => {
    if (isAddingMode && isAdmin) { // Only allow if admin
      setNewLocation(location);
    }
  };

  // Handle marker click to view bathroom details
  const handleMarkerClick = (bathroom: Bathroom) => {
    if (!isAddingMode) {
      setSelectedBathroom(bathroom);
    }
  };

  // Add new bathroom (only if admin)
  const handleAddBathroom = async (bathroomData: NewBathroomData) => {
    if (!isAdmin) return; // Safety check
    
    const bathroom: Bathroom = {
      id: Date.now().toString(),
      ...bathroomData,
      ratings: [],
      averages: { cleanliness: 0, supplies: 0, smell: 0 }
    };

    await saveBathroom(bathroom);
    setBathrooms([...bathrooms, bathroom]);
    setNewLocation(null);
    setIsAddingMode(false);
  };

  // Delete bathroom (only if admin)
  const handleDeleteBathroom = async () => {
    if (!isAdmin || !selectedBathroom) return; // Safety check
    
    const success = await deleteBathroom(selectedBathroom.id);
    
    if (success) {
      // Remove from local state
      setBathrooms(bathrooms.filter(b => b.id !== selectedBathroom.id));
      setSelectedBathroom(null);
    } else {
      alert('Failed to delete bathroom. Please try again.');
    }
  };

  // Submit a rating for a bathroom
  const handleSubmitRating = async (rating: CurrentRating) => {
    if (!selectedBathroom) return;
    
    // Check if user already rated this bathroom
    if (hasRated(selectedBathroom.id)) {
      alert('You have already rated this bathroom!');
      return;
    }

    const updatedBathroom: Bathroom = { ...selectedBathroom };
    updatedBathroom.ratings.push({
      ...rating,
      timestamp: Date.now()
    });

    // Recalculate averages
    updatedBathroom.averages = calculateAverages(updatedBathroom.ratings);

    await saveBathroom(updatedBathroom);
    
    // Mark as rated in this session
    markAsRated(selectedBathroom.id);
    
    setBathrooms(bathrooms.map(b => 
      b.id === updatedBathroom.id ? updatedBathroom : b
    ));
    setSelectedBathroom(updatedBathroom);
    setShowRatingForm(false);
  };

  if (!mounted || adminLoading) {
    return null; // Or add a loading spinner
  }

  return (
    <div className="app-container">
      <Header />
      
      <Controls
        isAddingMode={isAddingMode}
        onToggleAddMode={handleToggleAddMode}
        bathroomCount={bathrooms.length}
        isAdmin={isAdmin}
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

      {/* Add Bathroom Form - Only show if admin */}
      {newLocation && isAdmin && (
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
          onDelete={isAdmin ? handleDeleteBathroom : undefined}
          hasRated={hasRated(selectedBathroom.id)}
          isAdmin={isAdmin}
        />
      )}

      {/* Rating Form - Only show if user hasn't rated yet */}
      {showRatingForm && selectedBathroom && !hasRated(selectedBathroom.id) && (
        <RatingForm
          bathroom={selectedBathroom}
          onSubmit={handleSubmitRating}
          onClose={() => setShowRatingForm(false)}
        />
      )}
    </div>
  );
}