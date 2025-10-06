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
interface CourseMangeCardProps {
  // Define any props if needed
  courses?: Course[];
}
export default function CourseMangeCard({ courses }: CourseMangeCardProps) {
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
                <Button variant="outline" className="bg-gray-200 text-black ">
                  Edit
                </Button>
              </div>
              <div>
                <Button variant="outline" className="bg-[#8B0000] text-white">
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
