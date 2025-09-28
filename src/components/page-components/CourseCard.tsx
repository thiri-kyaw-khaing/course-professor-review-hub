import { cn } from "@/lib/utils";

interface CourseCardProps {
  code: string;
  name: string;
  faculty: string;
  credits: number;
  description: string;
  status?: "active" | "inactive";
}

export default function CourseCard({
  code,
  name,
  faculty,
  credits,
  description,
  status,
}: CourseCardProps) {
  return (
    <>
      <div className="flex gap-2 border border-gray-300 rounded-lg p-4 mt-4">
        <h2 className="text-md font-semibold">{code}</h2>

        <p className="text-gray-500">{name}</p>
        <div className="ml-auto flex flex-col justify-center items-end">
          <p
            className={cn(
              "border rounded-md px-2 text-sm py-1",
              status === "active" ? "bg-green-500" : "bg-red-500"
            )}
          >
            {status}
          </p>
        </div>
      </div>
    </>
  );
}
