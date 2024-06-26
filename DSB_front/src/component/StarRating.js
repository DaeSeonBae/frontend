import React, { useState } from 'react';
import '../component_style/starRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => setHoverRating(index);
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = (index) => onRatingChange(index);

  return (
    <div className='star-rating'>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`star ${index <= (hoverRating || rating) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
