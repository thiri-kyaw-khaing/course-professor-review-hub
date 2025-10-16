import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import CourseForm from "./CourseForm";
import CourseEditForm from "./CourseEditForm";
import { useState } from "react";
import { useReviewsStore } from "@/store/reviewStore";
import api from "@/api";
import { useCoursesStore } from "@/store/courseStore";
interface CourseMangeCardProps {
  // Define any props if needed
  courses?: Course[];
}
export default function CourseMangeCard({ courses }: CourseMangeCardProps) {
  const { removeCourse } = useCoursesStore();

  const handleDeleteCourse = async (courseId: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      // ✅ Simulate or perform real API call (same as Postman)
      const res = await api.delete(
        "/admins/courses",
        { data: { courseId: courseId } } // <-- important: send body in DELETE request
      );

      if (res.data.success) {
        alert(res.data.message || "Course deleted successfully.");
        // ✅ Remove it from local Zustand store
        removeCourse(courseId);
      } else {
        alert("Failed to delete course. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Something went wrong while deleting the course.");
    }
  };
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  return (
    <>
      <div className="flex lg:grid lg:grid-cols-2 gap-4  lg:gap-8 sm:gap-6 flex-wrap justify-center">
        {courses?.map((course) => (
          <Card className="w-[600px]" key={course.id}>
            <CardHeader>
              <CardTitle>
                {course.code}:{course.title}
              </CardTitle>
              <CardDescription>{course.faculty}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
            </CardContent>
            <CardFooter className="flex gap-4">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Course</DialogTitle>
                      {/* <DialogDescription>
                        Create a new course with all required information and
                        settings.
                      </DialogDescription> */}
                    </DialogHeader>
                    {/* Course Forms */}

                    <CourseEditForm key={course.id} course={course} />
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="bg-[#8B0000] text-white hover:bg-red-700"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
