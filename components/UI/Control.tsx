'use client';

import { Plus, X } from 'lucide-react';

interface ControlsProps {
  isAddingMode: boolean;
  onToggleAddMode: () => void;
  bathroomCount: number;
}

/**
 * Control panel for adding bathrooms and displaying stats
 */
const Controls: React.FC<ControlsProps> = ({ isAddingMode, onToggleAddMode, bathroomCount }) => {
  return (
    <div className="controls-bar">
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

      <div className="controls-count">
        {bathroomCount} bathroom{bathroomCount !== 1 ? 's' : ''} rated
      </div>
    </div>
  );
};

export default Controls;
