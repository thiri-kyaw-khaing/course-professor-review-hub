// import Card from "@/components/page-components/Card";
// import RatingCard from "@/components/page-components/ratingCard";
// import { Button } from "@/components/ui/button";
// import { Book, BookOpen, Search, Star, TrendingUp, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import { courses, professors } from "@/data";
// import CourseRatingCard from "@/components/page-components/CourseRelate/CourseRatingCard";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { courseQuery, professorQuery } from "@/api/query";
// import type { Course, Professor } from "@/types";
// export default function HomePage() {
//   const imgUrl = import.meta.env.VITE_IMG_URL;

//   const { data: professorsData } = useSuspenseQuery(professorQuery);
//   const { data: coursesData } = useSuspenseQuery(courseQuery);
//   return (
//     <>
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold text-center mt-4">
//           Find Your Perfect Course
//         </h1>
//         <p className="text-center mt-4 text-gray-400">
//           Discover courses and professors through honest student reviews
//         </p>

//         {/* Search professor and course card */}
//         {/* <div className="border border-gray-300 rounded-lg p-4 mt-6 mx-auto w-full md:w-2/3 lg:w-1/2">
//           <div className="border border-gray-300 rounded-lg p-2 flex items-center gap-2">
//             <Search className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search for professors or courses..."
//               className="w-full outline-none border-none focus:ring-0"
//             />
//           </div>
//           <div className="mt-4 flex justify-end"></div>
//         </div> */}

//         {/* Browse Buttons */}
//         <div className="flex justify-center gap-4 mt-4">
//           <Link to="/courses" className="flex justify-center mt-4">
//             <Button className="bg-[#8B0000] text-white px-4 py-2 rounded-lg hover:bg-[#a52a2a] transition">
//               Browse Courses
//             </Button>
//           </Link>
//           <Link to="/professors" className="flex justify-center mt-4">
//             <Button className=" text-[#8B0000] px-4 py-2 rounded-lg bg-white hover:bg-white border border-[#8B0000]">
//               Find Professors
//             </Button>
//           </Link>
//         </div>

//         {/* Card Components */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//           <Card
//             title="Total Professors"
//             description="2,233"
//             icon={<User size={60} />}
//           />
//           <Card
//             title="Total Courses"
//             description="1,234"
//             icon={<BookOpen size={60} />}
//           />
//           <Card
//             title="Total Reviews"
//             description="5,678"
//             icon={<Star size={60} />}
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           {/* Top Rated Professors */}
//           <div className="border border-gray-300 rounded-lg p-4 mt-6 ">
//             <div className="flex gap-4">
//               <TrendingUp className=" text-[#8B0000] mb-2" size={30} />
//               <h2 className="text-xl font-semibold mb-4">
//                 Top Rated Professors
//               </h2>
//             </div>
//             <span className="text-gray-500">
//               Professors with the highest student ratings
//             </span>
//             {professorsData?.professors
//               ?.slice(0, 4)
//               .map((professor: Professor) => (
//                 <div key={professor.id}>
//                   <RatingCard
//                     key={professor.id}
//                     name={professor.name}
//                     department={professor.faculty}
//                     image={imgUrl + professor?.image}
//                     rating={professor.averageRating}
//                     reviews={professor.totalReviews}
//                   />
//                 </div>
//               ))}
//           </div>
//           <div className="border border-gray-300 rounded-lg p-4 mt-6 ">
//             <div className="flex gap-4">
//               <BookOpen className=" text-[#8B0000] mb-2" size={30} />
//               <h2 className="text-xl font-semibold mb-4">
//                 Most Popular Courses
//               </h2>
//             </div>
//             <span className="text-gray-500">
//               Courses with the most student reviews
//             </span>
//             {coursesData?.courses?.slice(0, 4).map((course: Course) => (
//               <div key={course.id}>
//                 {/* <RatingCard
//                   key={professor.id}
//                   name={professor.name}
//                   department={professor.faculty}
//                   image={professor.image}
//                   rating={professor.rating}
//                   reviews={professor.reviews}
//                 /> */}
//                 <CourseRatingCard
//                   code={course.code}
//                   name={course.title}
//                   faculty={course.faculty}
//                   averageRating={course.averageRate}
//                   totalReviews={course.totalReviews}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import {
  allReviewsQuery,
  courseQuery,
  professorQuery,
  totalQuery,
} from "@/api/query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, TrendingUp, User } from "lucide-react";
import Card from "@/components/page-components/Card";
import RatingCard from "@/components/page-components/ratingCard";
import CourseRatingCard from "@/components/page-components/CourseRelate/CourseRatingCard";
import type { Course, Professor } from "@/types";

export default function HomePage() {
  const imgUrl = import.meta.env.VITE_IMG_URL || "http://localhost:8080";

  const {
    data: professorsData,
    isLoading: professorsLoading,
    isError: professorsError,
  } = useQuery(professorQuery);

  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery(courseQuery);

  const {
    data: totalReviewsData,
    isLoading: totalLoading,
    isError: totalError,
  } = useQuery(allReviewsQuery);

  if (professorsLoading || coursesLoading || totalLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading data...
      </div>
    );
  }

  if (professorsError || coursesError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }

  // ✅ Safe fallback for undefined data
  const professors = professorsData?.professors ?? [];
  const courses = coursesData?.courses ?? [];
  const totalReviews = totalReviewsData?.data ?? 0;

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Hero */}
      <h1 className="text-2xl font-bold text-center mt-4">
        Find Your Perfect Course
      </h1>
      <p className="text-center mt-2 text-gray-500">
        Discover courses and professors through honest student reviews
      </p>

      {/* Browse Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link to="/courses">
          <Button className="bg-[#8B0000] text-white px-4 py-2 rounded-lg hover:bg-[#a52a2a] transition">
            Browse Courses
          </Button>
        </Link>
        <Link to="/professors">
          <Button className="text-[#8B0000] px-4 py-2 rounded-lg bg-white hover:bg-white border border-[#8B0000]">
            Find Professors
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Card
          title="Total Professors"
          description={String(professors.length)}
          icon={<User size={60} />}
        />
        <Card
          title="Total Courses"
          description={String(courses.length)}
          icon={<BookOpen size={60} />}
        />
        <Card
          title="Total Reviews"
          description={String(totalReviews.length)}
          icon={<Star size={60} />}
        />
      </div>

      {/* Data Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Top Rated Professors */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-[#8B0000]" size={26} />
            <h2 className="text-xl font-semibold">Top Rated Professors</h2>
          </div>
          <p className="text-gray-500 mb-4">
            Professors with the highest student ratings
          </p>

          {professors.slice(0, 4).map((professor: Professor) => (
            <RatingCard
              key={professor.id}
              name={professor.name}
              department={professor.faculty}
              image={
                professor.image?.startsWith("http")
                  ? professor.image
                  : `${imgUrl}${professor.image ?? ""}`
              }
              rating={professor.averageRate ?? 0}
              reviews={professor.totalReviews ?? 0}
            />
          ))}
        </div>

        {/* Most Popular Courses */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-[#8B0000]" size={26} />
            <h2 className="text-xl font-semibold">Most Popular Courses</h2>
          </div>
          <p className="text-gray-500 mb-4">
            Courses with the most student reviews
          </p>

          {courses.slice(0, 4).map((course: Course) => (
            <CourseRatingCard
              key={course.id}
              code={course.code}
              name={course.title}
              faculty={course.faculty}
              averageRating={course.averageRate ?? 0}
              totalReviews={course.totalReviews ?? 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
