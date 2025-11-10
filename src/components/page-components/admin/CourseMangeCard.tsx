import { Button } from "@/components/ui/button";
import {
  Card,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit } from "lucide-react";
import CourseEditForm from "./CourseEditForm";
import { useState } from "react";
import { useCoursesStore } from "@/store/courseStore";
import api from "@/api";

interface CourseManageCardProps {
  courses?: Course[];
}

export default function CourseManageCard({ courses }: CourseManageCardProps) {
  const { removeCourse } = useCoursesStore();
  const [openEditId, setOpenEditId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Delete handler
  const handleDeleteCourse = async (courseId: number) => {
    try {
      setIsDeleting(true);
      const res = await api.delete("/admins/courses", {
        data: { courseId },
      });

      if (res.data.success) {
        console.log("✅ Course deleted:", courseId);
        removeCourse(courseId);
      } else {
        console.error(" Delete failed:", res.data);
      }
    } catch (error) {
      console.error(" Error deleting course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-8 sm:gap-6 flex-wrap justify-center">
      {courses?.map((course) => (
        <Card className="w-[600px]" key={course.id}>
          <CardHeader>
            <CardTitle>
              {course.code}: {course.title}
            </CardTitle>
            <CardDescription>
              {course.faculty.replace(/_/g, " ")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p>{course.description}</p>
          </CardContent>

          <CardFooter className="flex gap-4">
            {/* ✅ Edit Dialog */}
            <Dialog
              open={openEditId === course.id}
              onOpenChange={(o) => setOpenEditId(o ? course.id : null)}
            >
              <DialogTrigger asChild>
                <Button
                  className="bg-gray-300 text-black hover:bg-gray-400"
                  onClick={() => setOpenEditId(course.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>
                <CourseEditForm
                  key={course.id}
                  course={course}
                  onClose={() => setOpenEditId(null)}
                />
              </DialogContent>
            </Dialog>

            {/* ✅ Styled Delete Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#8B0000] text-white hover:bg-red-700"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this course?
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteCourse(course.id)}
                    className="bg-[#8B0000] text-white hover:bg-red-700"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
