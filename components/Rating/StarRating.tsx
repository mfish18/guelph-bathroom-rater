'use client';

import { Star, LucideIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  label: string;
  icon: LucideIcon;
}

/**
 * Interactive star rating component
 */
const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, label, icon: Icon }) => {
  return (
    <div className="rating-container">
      <div className="rating-label">
        <Icon className="rating-label-icon" />
        <span className="rating-label-text">{label}</span>
      </div>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            className="rating-star-button"
            aria-label={`Rate ${star} stars`}
            type="button"
          >
            <Star
              className={star <= rating ? 'rating-star-filled' : 'rating-star-empty'}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
