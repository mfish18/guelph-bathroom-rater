'use client';

import { X, Droplets, Trash2, Wind, Trash } from 'lucide-react';
import AverageDisplay from '../Rating/AverageDisplay';
import { Bathroom } from '../../lib/types';
import { useState } from 'react';

interface BathroomDetailPanelProps {
  bathroom: Bathroom;
  onRate: () => void;
  onClose: () => void;
  onDelete?: () => void; 
  hasRated: boolean;
  isAdmin: boolean;  
}

const BathroomDetailPanel: React.FC<BathroomDetailPanelProps> = ({ 
  bathroom, 
  onRate, 
  onClose,
  onDelete,
  hasRated,
  isAdmin
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const hasRatings = bathroom.ratings && bathroom.ratings.length > 0;

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

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

        {hasRated ? (
          <div className="info-box-empty mb-4">
            <p className="info-box-empty-text">✅ You have already rated this bathroom!</p>
          </div>
        ) : (
          <button
            onClick={onRate}
            className="btn-submit mb-4"
            type="button"
          >
            Rate This Bathroom
          </button>
        )}

        {isAdmin && (
          <>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <Trash className="w-4 h-4" />
                Delete Bathroom
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800 mb-3 font-medium">
                  Are you sure? This will delete all ratings!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded font-medium hover:bg-red-700 transition-colors text-sm"
                    type="button"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded font-medium hover:bg-gray-300 transition-colors text-sm"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BathroomDetailPanel;