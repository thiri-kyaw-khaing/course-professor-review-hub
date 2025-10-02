import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Review } from "@/types";
import StarRating from "@/components/page-components/StarRating"; // Optional: for rating display

interface MyReviewCardProps {
  reviews?: Review[];
}

export default function MyReviewCourse({ reviews = [] }: MyReviewCardProps) {
  if (reviews.length === 0) {
    return (
      <div className="border border-gray-300 rounded-lg p-6 w-full mt-6 bg-gray-100">
        <p>No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {reviews.map((review) => {
        const isCourseReview = !!review.course;
        const isProfessorReview = !!review.professor;

        return (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>
                {isCourseReview ? review.course?.title : review.professor?.name}
              </CardTitle>
              <CardDescription>
                {isCourseReview
                  ? `Course: ${review.course?.code} (${review.course?.faculty})`
                  : `Professor in ${review.professor?.faculty}`}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 italic mb-2">"{review.comment}"</p>
              <div className="flex items-center gap-2">
                <StarRating value={review.rating} readOnly />
                <span className="text-sm text-gray-500">
                  {review.rating} / 5
                </span>
              </div>
            </CardContent>

            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Reviewed on {review.updatedAt}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
