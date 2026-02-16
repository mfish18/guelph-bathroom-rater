'use client';

import { useState } from 'react';
import { Location, NewBathroomData } from '../../lib/types';

interface AddBathroomFormProps {
  location: Location;
  onSubmit: (bathroomData: NewBathroomData) => void;
  onCancel: () => void;
}

interface FormData {
  building: string;
  floor: string;
  notes: string;
}

/**
 * Form for adding a new bathroom location
 */
const AddBathroomForm: React.FC<AddBathroomFormProps> = ({ location, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    building: '',
    floor: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (formData.building && formData.floor) {
      onSubmit({
        ...location,
        ...formData
      });
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-panel">
        <h3 className="modal-title mb-4">Add Bathroom Details</h3>

        <div className="form-group">
          <div>
            <label className="form-label">Building Name</label>
            <input
              type="text"
              value={formData.building}
              onChange={(e) => handleChange('building', e.target.value)}
              className="form-input"
              placeholder="e.g., MacNaughton Building"
            />
          </div>

          <div>
            <label className="form-label">Floor</label>
            <input
              type="text"
              value={formData.floor}
              onChange={(e) => handleChange('floor', e.target.value)}
              className="form-input"
              placeholder="e.g., 2nd Floor"
            />
          </div>

          <div>
            <label className="form-label">Notes (Optional)</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="form-input"
              placeholder="e.g., Near the library entrance"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={!formData.building || !formData.floor}
            className="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="button"
          >
            Add Bathroom
          </button>
          <button
            onClick={onCancel}
            className="btn-secondary"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBathroomForm;
