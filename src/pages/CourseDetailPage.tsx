import { Button } from "@/components/ui/button";
import { courses } from "@/data";
import { Arrow } from "@radix-ui/react-popover";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const { courseId } = useParams();

  const course = courses.find((course) => course.id === Number(courseId));
  return (
    <>
      <Link to="/courses" className="flex items-center mt-4">
        <Button variant="ghost" className="px-0 text-[#8B0000]">
          <ArrowLeft className=" h-4 w-4 text-[#8B0000]" />
          Back to Courses
        </Button>
      </Link>
      {course ? (
        <div className="border border-gray-300 rounded-lg p-6 mt-4 lg:w-3/4 sm:w-full">
          <span className="text-3xl font-bold mb-2 mr-2">{course.code}</span>
          <span className="text-2xl text-[#8B0000] font-semibold">
            {course.name}
          </span>
          <span className="border border-gray-300 mt-4 rounded-md px-4 py-2 text-sm text-semibold ml-2 text-white bg-[#8B0000] items-end">
            {course.credits} Credits
          </span>

          <h1 className="text-xl font-semibold mt-4 text-gray-500">
            {course.faculty}
          </h1>

          <div className="border border-gray-300 rounded-md mt-6 p-6">
            <h2 className="text-lg font-semibold">Course Description</h2>
            <h2 className="text-gray-600 text-sm mt-3">{course.description}</h2>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Course not found.</p>
      )}
    </>
  );
}
