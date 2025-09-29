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
          <ArrowLeft className="mr-2 h-4 w-4 text-[#8B0000]" />
          Back to Courses
        </Button>
      </Link>
      {course ? (
        <div></div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Course not found.</p>
      )}
    </>
  );
}
