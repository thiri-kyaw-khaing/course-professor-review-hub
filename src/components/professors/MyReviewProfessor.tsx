import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Review } from "@/types";
import StarRating from "../page-components/StarRating";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReviewsStore } from "@/store/reviewStore";
import api from "@/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MyReviewProfessorEdit from "./MyReviewProfessorEdit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyReviewProfessor({ review }: { review: Review }) {
  const [openEditId, setOpenEditId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeReview } = useReviewsStore();

  const handleDeleteReview = async (reviewId: number) => {
    // if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      // ✅ Simulate or perform real API call (same as Postman)
      const res = await api.delete(
        "users/reviews",
        { data: { reviewId: reviewId } } // <-- important: send body in DELETE request
      );

      if (res.data.success) {
        removeReview(reviewId);
      } else {
        alert("Failed to delete review. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Something went wrong while deleting the review.");
    }
  };
  return (
    <>
      <Card key={review.id}>
        <CardHeader>
          <CardTitle>{review.professor?.name}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap mr-1 text-xs text-muted-foreground sm:mt-0">
              {`Professor: ${
                review.professor?.name
              } (${review.professor?.faculty.replace(/_/g, " ")})`}
              <div className="flex items-center gap-2 lg:ml-auto pr-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <StarRating value={review.rating} readOnly />
                  <span className="text-sm text-gray-500  ">
                    {review.rating} / 5
                  </span>
                </div>
                <div className="flex space-x-1 ml-4">
                  <div>
                    <Dialog
                      open={openEditId === review.id}
                      onOpenChange={(o) => setOpenEditId(o ? review.id : null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setOpenEditId(review.id)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Your Professor Review</DialogTitle>

                          {/* <DialogDescription>
                        Create a new course with all required information and
                        settings.
                      </DialogDescription> */}
                        </DialogHeader>
                        {/* Course Forms */}
                        <MyReviewProfessorEdit
                          key={review.id}
                          review={review}
                          onClose={() => setOpenEditId(null)}
                        />

                        {/* <CourseEditForm key={course.id} course={course} /> */}
                      </DialogContent>
                    </Dialog>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this review?
                        </AlertDialogTitle>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteReview(review.id)}
                          className="bg-[#8B0000] text-white hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
