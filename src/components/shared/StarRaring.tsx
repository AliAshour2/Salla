import React from "react";
import StarRatings from "react-star-ratings";

type StarRatingProps = {
  rating: number;
  starRatedColor?: string;
  starDimension?: string;
  starSpacing?: string;
  numberOfStars?: number;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  starRatedColor = "#ffc107",
  starDimension = "20px",
  starSpacing = "1px",
  numberOfStars = 5,
}) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor={starRatedColor}
      starDimension={starDimension}
      starSpacing={starSpacing}
      numberOfStars={numberOfStars}
      name="rating"
    />
  );
};

export default StarRating;
