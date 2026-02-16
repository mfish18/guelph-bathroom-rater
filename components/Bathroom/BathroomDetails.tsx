'use client';

import { X, Droplets, Trash2, Wind } from 'lucide-react';
import AverageDisplay from '../Rating/AverageDisplay';
import { Bathroom } from '../../lib/types';

interface BathroomDetailPanelProps {
  bathroom: Bathroom;
  onRate: () => void;
  onClose: () => void;
}

/**
 * Panel displaying bathroom details and average ratings
 */
const BathroomDetailPanel: React.FC<BathroomDetailPanelProps> = ({ bathroom, onRate, onClose }) => {
  const hasRatings = bathroom.ratings && bathroom.ratings.length > 0;

  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <h3 className="bathroom-name">{bathroom.building}</h3>
            <p className="bathroom-floor">{bathroom.floor}</p>
            {bathroom.notes && (
              <p className="bathroom-notes">{bathroom.notes}</p>
            )}
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

        {hasRatings ? (
          <div className="info-box">
            <h4 className="info-box-title">Average Ratings</h4>
            <AverageDisplay
              average={bathroom.averages.cleanliness}
              label="Cleanliness"
              icon={Droplets}
            />
            <AverageDisplay
              average={bathroom.averages.supplies}
              label="Supplies"
              icon={Trash2}
            />
            <AverageDisplay
              average={bathroom.averages.smell}
              label="Smell"
              icon={Wind}
            />
            <p className="text-xs text-gray-500 mt-2">
              {bathroom.ratings.length} rating{bathroom.ratings.length !== 1 ? 's' : ''}
            </p>
          </div>
        ) : (
          <div className="info-box-empty">
            <p className="info-box-empty-text">No ratings yet. Be the first to rate!</p>
          </div>
        )}

        <button
          onClick={onRate}
          className="btn-submit"
          type="button"
        >
          Rate This Bathroom
        </button>
      </div>
    </div>
  );
};

export default BathroomDetailPanel;
