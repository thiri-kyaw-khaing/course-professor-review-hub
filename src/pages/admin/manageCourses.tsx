import { courseQuery } from "@/api/query";
import CourseForm from "@/components/page-components/admin/CourseForm";
import CourseMangeCard from "@/components/page-components/admin/CourseMangeCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { courses } from "@/data";
import { Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Course } from "@/types";

export default function ManageCoursesPage() {
  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery(courseQuery);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = (coursesData?.courses || []).filter(
    (course: Course) => {
      return (
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  if (coursesLoading) {
    return <div>Loading...</div>;
  }

  if (coursesError) {
    return <div>Error loading courses.</div>;
  }

  // const handleDeleteReview = async (reviewId: number) => {
  //   if (!window.confirm("Are you sure you want to delete this review?")) return;

  //   try {
  //     // ✅ Simulate or perform real API call (same as Postman)
  //     const res = await api.delete(
  //       "users/reviews",
  //       { data: { reviewId: reviewId } } // <-- important: send body in DELETE request
  //     );

  //     if (res.data.success) {
  //       alert(res.data.message || "Review deleted successfully.");
  //       // ✅ Remove it from local Zustand store
  //       removeReview(reviewId);
  //     } else {
  //       alert("Failed to delete review. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //     alert("Something went wrong while deleting the review.");
  //   }
  // };
  return (
    <>
      <div>
        {" "}
        <h1 className="text-3xl font-semibold mt-4">Manage Courses</h1>
        <p className="text-gray-500 mt-2">
          Add, edit, and manage course information and enrollment.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md mt-4 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, professors, departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#8B0000] text-white hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course with all required information and settings.
              </DialogDescription>
            </DialogHeader>
            {/* Course Forms */}
            <CourseForm />
          </DialogContent>
        </Dialog>
      </div>
      <CourseMangeCard courses={filteredCourses} />
    </>
  );
}
