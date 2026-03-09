'use client';

import { Plus, X } from 'lucide-react';

interface ControlsProps {
  isAddingMode: boolean;
  onToggleAddMode: () => void;
  bathroomCount: number;
  isAdmin: boolean; 
}

const Controls: React.FC<ControlsProps> = ({ 
  isAddingMode, 
  onToggleAddMode, 
  bathroomCount,
  isAdmin 
}) => {
  return (
    <div className="controls-bar">
      {isAdmin && (
        <>
          <button
            onClick={onToggleAddMode}
            className={`btn-toggle ${isAddingMode ? 'btn-toggle-active' : 'btn-toggle-inactive'}`}
            type="button"
          >
            {isAddingMode ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAddingMode ? 'Cancel Adding' : 'Add Bathroom'}
          </button>

          {isAddingMode && (
            <div className="controls-info-message">
              Click anywhere on the map to add a bathroom location
            </div>
          )}
        </>
      )}

      <div className={`${isAdmin ? 'ml-auto' : ''} text-sm text-gray-600 flex items-center`}>
        {bathroomCount} bathroom{bathroomCount !== 1 ? 's' : ''} rated
      </div>
    </div>
  );
};

export default Controls;