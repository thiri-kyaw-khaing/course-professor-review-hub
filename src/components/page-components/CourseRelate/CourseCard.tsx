import StarRating from "../StarRating";

interface CourseCardProps {
  code: string;
  title?: string;
  faculty: string;
  credits: number;
  description: string;
  rating?: number;
  status?: "active" | "inactive";
}

export default function CourseCard({
  code,
  title,
  faculty,
  credits,
  description,
  rating,
}: CourseCardProps) {
  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 mt-4">
        <div className="flex  gap-4 justify-between items-center mb-2">
          <h2 className="text-xl font-semibold  text-[#8B0000]">{code}</h2>

          <h2 className="text-xl font-semibold text-[#8B0000]">{title}</h2>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <StarRating value={rating ?? 0} readOnly={true} />
          <span>{rating} / 5</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-gray-600 text-sm"> {faculty.replace(/_/g, " ")}</p>
          <h1>-</h1>
          <span className="text-gray-600 text-sm">{credits} credits</span>
        </div>
        <p className="text-gray-600 text-sm mt-6">{description}</p>
      </div>
    </>
  );
}
