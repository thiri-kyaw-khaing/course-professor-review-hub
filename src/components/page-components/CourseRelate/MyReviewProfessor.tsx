import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Review } from "@/types";
import StarRating from "../StarRating";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyReviewProfessor({ review }: { review: Review }) {
  return (
    <>
      <Card key={review.id}>
        <CardHeader>
          <CardTitle>{review.professor?.name}</CardTitle>
          <CardDescription>
            <div className="flex mr-1 text-xs text-muted-foreground">
              {`Professor: ${review.professor?.name} (${review.professor?.faculty})`}
              <div className="flex items-center gap-2 ml-auto">
                <StarRating value={review.rating} readOnly />
                <span className="text-sm text-gray-500">
                  {review.rating} / 5
                </span>
                <div className="flex space-x-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    //   onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    //   onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <span className="mr-1 text-xs text-muted-foreground">
              <Calendar className="inline mr-1 mb-1" size={12} />
              {review?.updatedAt}
            </span>
          </CardDescription>
          <div className="rounded-md border border-gray-300 p-4 mt-4 bg-gray-50">
            <p className="text-sm text-gray-500">{review.comment}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {`${review?.professor?.totalReviews} Reviews`}
          </p>
        </CardHeader>
      </Card>
    </>
  );
}
