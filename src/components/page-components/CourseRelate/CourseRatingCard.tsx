import { Star } from "lucide-react";

interface CourseRatingCardProps {
  // Define props if needed in the future
  code: string;
  name?: string;
  faculty?: string;
  averageRating?: number;
  totalReviews?: number;
}

export default function CourseRatingCard({
  code,
  name,
  faculty,
  averageRating,
  totalReviews,
}: CourseRatingCardProps) {
  // const filledStars = Math.floor(averageRating);
  // const hasHalfStar = averageRating % 1 >= 0.5;
  // //   const emptyStars = 5 - filledStars;
  // const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  const safeAverage = averageRating ?? 0; // 👈 fallback to 0 if undefined
  const filledStars = Math.floor(safeAverage);
  const hasHalfStar = safeAverage % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-2 border border-gray-300 rounded-lg p-4 mt-6 ">
      {/* Left side: Course info */}
      <div>
        <div className="flex items-center">
          <h3 className="font-semibold">{code}</h3>
          <h3 className="text-lg text-[#8B0000] font-medium text-start">
            {name}
          </h3>
        </div>
        <p className="text-gray-500 text-sm">{faculty}</p>
      </div>
      {/* Rating */}
      <div className="ml-auto flex flex-col justify-center items-end">
        <div className=" items-center gap-6">
          <div className="flex">
            {/* Full stars */}
            {[...Array(filledStars)].map((_, i) => (
              <Star
                key={`filled-${i}`}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}

            {/* Half star */}
            {hasHalfStar && (
              <div className="relative">
                <Star className="h-5 w-5 text-gray-300" />
                <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
            ))}
          </div>

          <span className="text-lg text-gray-600 font-semibold">
            {safeAverage.toFixed(1)}/5
          </span>
          <h1 className="text-sm">{totalReviews} Reviews</h1>
        </div>
      </div>
    </div>
  );
}
