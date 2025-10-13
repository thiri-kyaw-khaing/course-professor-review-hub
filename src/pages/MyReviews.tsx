import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { allReviewsQuery } from "@/api/query";
import { useReviewsStore } from "@/store/reviewStore";
import MyReviewCard from "@/components/page-components/MyReviewCard";
import type { Review } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyReviewsPage() {
  // ✅ Always declare hooks first
  const { reviews, setReviews } = useReviewsStore();

  const {
    data: allReviews,
    isLoading: allReviewsLoading,
    isError: allReviewsError,
  } = useQuery(allReviewsQuery);

  // ✅ Hooks must not be inside conditional
  useEffect(() => {
    if (allReviews?.data) {
      setReviews(allReviews.data);
    }
  }, [allReviews, setReviews]);

  // ✅ Conditional rendering happens *after* hooks
  if (allReviewsLoading) {
    return <div>Loading...</div>;
  }

  if (allReviewsError) {
    return <div>Error loading reviews.</div>;
  }

  return (
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
        {/* use reviews from reviewStore to update ui no reload needed */}
        <TabsContent value="all">
          <MyReviewCard reviews={reviews} />
        </TabsContent>

        <TabsContent value="courses">
          <MyReviewCard
            reviews={reviews.filter(
              (review: Review) => review.courseId !== null
            )}
          />
        </TabsContent>

        <TabsContent value="professors">
          <MyReviewCard
            reviews={reviews.filter(
              (review: Review) => review.professorId !== null
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
