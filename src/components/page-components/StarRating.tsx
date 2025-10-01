// components/StarRating.tsx
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function StarRating({
  value,
  onChange,
  readOnly = false,
}: StarRatingProps) {
  const filledStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1); // set rating to 1-based index
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(filledStars)].map((_, i) => (
        <Star
          key={`filled-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => handleClick(i)}
        />
      ))}
      {hasHalfStar && (
        <div
          className="relative cursor-pointer hover:scale-110 transition-transform"
          onClick={() => handleClick(filledStars)}
        >
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => handleClick(filledStars + (hasHalfStar ? 1 : 0) + i)}
        />
      ))}
    </div>
  );
}
