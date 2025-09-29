import { courses } from "@/data";
import { useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const { courseId } = useParams();

  const course = courses.find((course) => course.id === Number(courseId));
  return <div>{course ? course.name : "Course not found"}</div>;
}
