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
interface CourseMangeCardProps {
  // Define any props if needed
  courses?: Course[];
}
export default function CourseMangeCard({ courses }: CourseMangeCardProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  return (
    <>
      <div className="flex lg:grid lg:grid-cols-2 gap-4  lg:gap-8 sm:gap-6 flex-wrap justify-center">
        {courses?.map((course) => (
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle>
                {course.code}:{course.name}
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
