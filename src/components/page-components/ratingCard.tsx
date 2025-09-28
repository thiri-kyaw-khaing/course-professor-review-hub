import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";
interface RatingCardProps {
  name: string;
  department: string;
  image?: string;
  rating: number;
  reviews?: number;
}
export default function RatingCard({
  name,
  department,
  image,
  rating,
  reviews,
}: RatingCardProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  //   const emptyStars = 5 - filledStars;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  return (
    <>
      <div className=" flex gap-4 border border-gray-300 rounded-lg p-4 mt-6">
        <img
          src={image}
          alt="Top Rated Professors"
          className="rounded-full w-16 h-16"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{department}</p>
        </div>

        {/* Rating */}
        <div className="ml-auto flex flex-col justify-center items-end">
          <div className="items-center gap-6">
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
              {rating.toFixed(1)}/5
            </span>
            <h1 className="text-sm">{reviews} Reviews</h1>
          </div>
        </div>
      </div>
    </>
  );
}
