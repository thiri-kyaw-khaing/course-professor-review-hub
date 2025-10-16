import CourseCard from "@/components/page-components/CourseRelate/CourseCard";
import FacultyDropdown from "@/components/page-components/FacultyDropDown";
import RatingDropdown from "@/components/page-components/ratingDropDown";
import { Button } from "@/components/ui/button";
// import { courses } from "@/data";
import { Search } from "lucide-react";
import { Link } from "react-router";
import CourseListPage from "./CourseList";
import { courseQuery } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Course } from "@/types";
export default function Courses() {
  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery(courseQuery);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");

  const filteredCourses = (coursesData?.courses || []).filter(
    (course: Course) => {
      const matchesSearchTerm =
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFaculty =
        selectedFaculty === "all" || course.faculty === selectedFaculty;
      return matchesSearchTerm && matchesFaculty;
    }
  );

  if (coursesLoading) {
    return <div>Loading...</div>;
  }

  if (coursesError) {
    return <div>Error loading courses.</div>;
  }

  // const courses = coursesData || [];

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="mt-4 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
            <FacultyDropdown
              value={selectedFaculty}
              onChange={(value) => setSelectedFaculty(value)}
            />
          </div>
          <div className="mt-4 w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
            <RatingDropdown />
          </div>
          <Button className="mt-4 bg-[#8B0000] text-white w-full sm:w-auto">
            Search
          </Button>
        </div>
      </div>
      <CourseListPage courses={filteredCourses} />
    </>
  );
}
