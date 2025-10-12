import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CourseCardProps {
  code: string;
  title?: string;
  faculty: string;
  credits: number;
  description: string;
  status?: "active" | "inactive";
}

export default function CourseCard({
  code,
  title,
  faculty,
  credits,
  description,
  status,
}: CourseCardProps) {
  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 mt-4">
        <div className="flex  gap-4 justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{code}</h2>

          <h2 className="text-xl font-semibold">{title}</h2>
          {/* <span
            className={cn(
              "border rounded-md px-2 text-sm py-1 items-end w-fit gap-4",
              status === "active" ? "bg-green-500" : "bg-red-500"
            )}
          >
            {status}
          </span> */}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-600 text-sm">{faculty}</p>
          <h1>-</h1>
          <span className="text-gray-600 text-sm">{credits} credits</span>
        </div>
        <p className="text-gray-600 text-sm mt-6">{description}</p>
      </div>
    </>
  );
}
