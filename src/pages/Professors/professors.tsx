import FacultyDropdown from "@/components/page-components/FacultyDropDown";
import RatingDropdown from "@/components/page-components/ratingDropDown";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProfessorListPage from "./professorlist";
import { professors } from "@/data";
import { professorQuery } from "@/api/query";
import { useQuery } from "@tanstack/react-query";

export default function ProfessorsPage() {
  const {
    data: professorsData,
    isLoading: professorsLoading,
    isError: professorsError,
  } = useQuery(professorQuery);

  if (professorsLoading) {
    return <div>Loading...</div>;
  }

  if (professorsError) {
    return <div>Error loading professors.</div>;
  }

  return (
    <>
      <>
        {/* Search professor and course card */}
        <div className="space-y-4 mt-4">
          <h1 className="text-4xl font-semibold">All Professors</h1>
          <h1 className="text-gray-500">
            Discover and learn about professors across Mae Fah Luang University
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
            <Button className="mt-4 bg-[#8B0000] text-white w-full sm:w-auto">
              Search
            </Button>
          </div>
        </div>
        {/* <CourseListPage courses={courses} /> */}
        <ProfessorListPage professors={professorsData?.professors} />
      </>
    </>
  );
}
