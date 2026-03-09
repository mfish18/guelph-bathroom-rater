'use client';

import { useState } from 'react';
import { X, Droplets, Trash2, Wind } from 'lucide-react';
import StarRating from './StarRating';
import { INITIAL_RATING } from '../../lib/utils/constants';
import { Bathroom, CurrentRating } from '../../lib/types';

interface RatingFormProps {
  bathroom: Bathroom;
  onSubmit: (rating: CurrentRating) => void;
  onClose: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ bathroom, onSubmit, onClose }) => {
  const [currentRating, setCurrentRating] = useState<CurrentRating>(INITIAL_RATING);

  const handleSubmit = () => {
    if (currentRating.cleanliness > 0 || currentRating.supplies > 0 || currentRating.smell > 0) {
      onSubmit(currentRating);
      setCurrentRating(INITIAL_RATING);
    }
  };

  const isFormEmpty = currentRating.cleanliness === 0 && 
                      currentRating.supplies === 0 && 
                      currentRating.smell === 0;

  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Rate Bathroom</h3>
            <p className="modal-subtitle">
              {bathroom.building} - {bathroom.floor}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-close"
            aria-label="Close"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          <StarRating
            rating={currentRating.cleanliness}
            onRate={(rating) => setCurrentRating({ ...currentRating, cleanliness: rating })}
            label="Cleanliness"
            icon={Droplets}
          />

          <StarRating
            rating={currentRating.supplies}
            onRate={(rating) => setCurrentRating({ ...currentRating, supplies: rating })}
            label="Supplies (TP, Soap, etc.)"
            icon={Trash2}
          />

          <StarRating
            rating={currentRating.smell}
            onRate={(rating) => setCurrentRating({ ...currentRating, smell: rating })}
            label="Smell"
            icon={Wind}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isFormEmpty}
          className="btn-submit mt-6"
          type="button"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingForm;
