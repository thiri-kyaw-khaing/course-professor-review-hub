import { allReviewsQuery } from "@/api/query";
import MyReviewCard from "@/components/page-components/MyReviewCard";
import MyReviewCourse from "@/components/page-components/MyReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reviews } from "@/data";
import type { Review } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function MyReviewsPage() {
  const {
    data: allReviews,
    isLoading: allReviewsLoading,
    isError: allReviewsError,
  } = useQuery(allReviewsQuery);

  if (allReviewsLoading) {
    return <div>Loading...</div>;
  }

  if (allReviewsError) {
    return <div>Error loading reviews.</div>;
  }
  return (
    <>
      <div>
        <h1 className="text-3xl space-y-4 mt-4">My Reviews</h1>
        <p className="text-gray-600 mt-2">
          Manage and edit your course and professor reviews. Help other students
          make informed decisions.
        </p>
        <Tabs defaultValue="all" className="w-full mt-6">
          <TabsList className="bg-gray-100 p-1 rounded-full w-full flex">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              All Reviews
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="professors"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              Professors
            </TabsTrigger>
          </TabsList>

          {/* Content below (optional) */}
          <TabsContent value="all">
            {" "}
            <MyReviewCard reviews={allReviews.data} />
          </TabsContent>
          <TabsContent value="courses">
            <MyReviewCard
              reviews={allReviews.data.filter(
                (review: Review) => review.courseId !== null
              )}
            />
          </TabsContent>
          <TabsContent value="professors">
            <MyReviewCard
              reviews={allReviews.data.filter(
                (review: Review) => review.professorId !== null
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
