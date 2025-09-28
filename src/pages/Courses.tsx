import CourseCard from "@/components/page-components/CourseCard";
import FacultyDropdown from "@/components/page-components/FacultyDropDown";
import RatingDropdown from "@/components/page-components/ratingDropDown";
import { courses } from "@/data";
import { Search } from "lucide-react";

export default function Courses() {
  return (
    <>
      {/* Search professor and course card */}
      <div className="space-y-4 mt-4">
        <h1 className="text-4xl font-semibold">All Courses</h1>
        <h1 className="text-gray-500">
          Browse and discover courses from across Mae Fah Luang University
        </h1>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mt-6 mx-auto w-full">
        <div className="border border-gray-300 rounded-lg p-2 flex items-center gap-2">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for professors or courses..."
            className="w-full outline-none border-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="mt-4 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
            <FacultyDropdown />
          </div>
          <div className="mt-4 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
            <RatingDropdown />
          </div>
        </div>
      </div>
      {/* Course Cards */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              code={course.code}
              name={course.name}
              faculty={course.faculty}
              credits={course.credits}
              description={course.description}
              status={course.status}
            />
          ))}
        </div>
      )}
    </>
  );
}
