import CourseCard from "@/components/page-components/CourseCard";
import type { Course } from "@/types";
import { Link } from "react-router-dom";
interface CourseListPageProps {
  courses: Course[];
}
export default function CourseListPage({ courses }: CourseListPageProps) {
  return (
    <div>
      {/* Course Cards */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`}>
              <CourseCard
                key={course.id}
                code={course.code}
                name={course.name}
                faculty={course.faculty}
                credits={course.credits}
                description={course.description}
                status={course.status}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
