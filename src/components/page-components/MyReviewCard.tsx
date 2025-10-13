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
import { Calendar } from "lucide-react";
import MyReviewCourse from "./CourseRelate/MyReviewCourse";
import MyReviewProfessor from "./CourseRelate/MyReviewProfessor";

interface MyReviewCardProps {
  reviews?: Review[];
}

export default function MyReviewCard({ reviews = [] }: MyReviewCardProps) {
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
        if (review.professorId === null) {
          return <MyReviewCourse review={review} key={review.id} />;
        } else {
          return <MyReviewProfessor review={review} key={review.id} />;
        }

        // const isProfessorReview = !!review.professor;
      })}
    </div>
  );
}
