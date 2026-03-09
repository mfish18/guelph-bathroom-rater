'use client';

import { Star, LucideIcon } from 'lucide-react';

interface AverageDisplayProps {
  average: number;
  label: string;
  icon: LucideIcon;
}

const AverageDisplay: React.FC<AverageDisplayProps> = ({ average, label, icon: Icon }) => {
  return (
    <div className="average-row">
      <Icon className="average-icon" />
      <span className="average-label">{label}:</span>
      <div className="average-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={star <= Math.round(average) ? 'average-star-small-filled' : 'average-star-small-empty'}
          />
        ))}
      </div>
      <span className="average-score">({average.toFixed(1)})</span>
    </div>
  );
};

export default AverageDisplay;
