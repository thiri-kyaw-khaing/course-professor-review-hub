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
import type { Course, Professor } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Mail } from "lucide-react";
import CourseForm from "./CourseForm";
import CourseEditForm from "./CourseEditForm";
import { useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import StarRating from "../StarRating";
import ProfessorEditForm from "./professorEditForm";
interface ProfessorMangeCardProps {
  // Define any props if needed
  professors?: Professor[];
}
export default function ProfessorMangeCard({
  professors,
}: ProfessorMangeCardProps) {
  //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  return (
    <>
      <div className="flex  lg:grid-cols-2 gap-4  lg:gap-8 sm:gap-6 flex-wrap justify-center">
        {professors?.map((professor) => (
          <Card className="w-[600px]">
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={professor.image}
                  alt={professor.name}
                  className="h-full w-full object-cover"
                />
              </Avatar>

              <div className="flex flex-col">
                <CardTitle className="text-base font-semibold">
                  {professor.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {professor.faculty}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Mail className="inline-block mr-1 h-4 w-4" />
              {professor.email}

              <div className="flex items-center mt-2 space-x-2">
                <StarRating value={professor?.averageRating} readOnly />
                <p>{professor?.averageRating}</p>
                <p>({professor?.totalReviews} reviews)</p>
              </div>

              <div>
                <h4 className="font-semibold mt-4 mb-2">Education:</h4>
                <ul className="list-disc list-inside">
                  {professor.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gray-300 text-black hover:bg-gray-400"
                      //   onClick={() => setIsAddDialogOpen(true)

                      //   }
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Professor</DialogTitle>
                      <ProfessorEditForm professor={professor} />
                      {/* <DialogDescription>
                        Create a new course with all required information and
                        settings.
                      </DialogDescription> */}
                    </DialogHeader>
                    {/* Course Forms */}

                    {/* <CourseEditForm key={course.id} course={course} /> */}
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
