import { Button } from "@/components/ui/button";
import { courses } from "@/data";
import { Arrow } from "@radix-ui/react-popover";
import {
  ArrowLeft,
  Edit2Icon,
  EditIcon,
  MessageSquare,
  PlusIcon,
  Star,
  Text,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import StarRating from "@/components/page-components/StarRating";

export default function CourseDetailPage() {
  const { courseId } = useParams();

  const course = courses.find((course) => course.id === Number(courseId));
  const filledStars = Math.floor(course?.averageRating || 0);
  const hasHalfStar = (course?.averageRating ?? 0) % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  const [rating, setRating] = useState(0);
  return (
    <>
      <Link to="/courses" className="flex items-center mt-4">
        <Button variant="ghost" className="px-0 text-[#8B0000]">
          <ArrowLeft className=" h-4 w-4 text-[#8B0000]" />
          Back to Courses
        </Button>
      </Link>
      {/* Course Details */}
      {course ? (
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="border border-gray-300 rounded-lg p-6 mt-4 lg:w-3/4 sm:w-full">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold  mr-2">{course.code}</span>
              <span className="text-2xl text-[#8B0000] font-semibold">
                {course.name}
              </span>
              {/* <span className="border border-gray-300 rounded-md px-4 py-2 text-sm text-semibold ml-auto text-white bg-[#8B0000] items-end sm:items-start">
              {course.credits} Credits
            </span> */}
              <div className="mt-2 sm:mt-0 sm:ml-auto">
                <span className="border border-gray-300 rounded-md px-4 py-2 text-sm font-semibold text-white bg-[#8B0000] w-fit whitespace-nowrap">
                  {course.credits} Credits
                </span>
              </div>
            </div>

            <h1 className="text-xl font-semibold mt-4 text-gray-500">
              {course.faculty}
            </h1>

            <div className="border border-gray-300 rounded-md mt-6 p-6">
              <h2 className="text-lg font-semibold">Course Description</h2>
              <h2 className="text-gray-600 text-sm mt-3">
                {course.description}
              </h2>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md mt-4 p-6 lg:w-1/3 sm:w-full">
            <h2 className="text-lg font-semibold">Overall Course Rating</h2>
            <h1 className="text-4xl font-bold justify-center items-center text-center flex mt-6">
              {course.averageRating}
            </h1>
            {/* Rating */}
            <div className="flex items-center mb-2 ml-auto mt-6 justify-center">
              {[...Array(filledStars)].map((_, i) => (
                <Star
                  key={`filled-${course.id}-${i}`}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}

              {hasHalfStar && (
                <div className="relative">
                  <Star className="h-5 w-5 text-gray-300" />
                  <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              )}

              {[...Array(emptyStars)].map((_, i) => (
                <Star
                  key={`empty-${course.id}-${i}`}
                  className="h-5 w-5 text-gray-300"
                />
              ))}

              <div className="flex text-center flex mt-2">
                <h1 className="ml-2 text-sm text-gray-600">
                  {course.averageRating}/5
                </h1>
                <h1 className="text-sm text-gray-600 ml-2">
                  (Based on {course.totalReviews} Reviews)
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Course not found.</p>
      )}

      {/* Student Reviews */}
      <div className="lg:w-full sm:w-full border border-gray-300 rounded-lg p-6 mt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />

          <span className="text-lg ">Student Reviews</span>
          {/* <Link
            to={`/courses/${courseId}/reviews`}
            className="text-sm text-blue-500 hover:underline ml-auto"
          >
            <Button
              variant="secondary"
              className="px-0 text-white bg-[#8B0000] items-center hover:bg-[#8B0000]"
            >
              <PlusIcon className=" h-4 w-4 text-white" />
              Write a Review
            </Button>
          </Link> */}
          {/* Write review dialog */}
          <div className="ml-auto">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className=" text-white bg-[#8B0000] items-center hover:bg-[#8B0000]"
                  >
                    <PlusIcon className=" h-4 w-4 text-white" />
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                      Share your experience with Professor Unknown to help other
                      students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div>
                      <Label className="mb-1 block text-sm font-medium">
                        Rating
                      </Label>
                      <StarRating value={rating} onChange={setRating} />
                    </div>
                    <div className="grid gap-3">
                      {/* Comment Box */}
                      <div>
                        <Label htmlFor="comment">Your Review</Label>
                        <textarea
                          id="comment"
                          rows={4}
                          className="w-full mt-1 rounded-md border bg-muted p-3 text-sm"
                          placeholder="Share your thoughts about this course..."
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    {/* <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose> */}
                    <Button type="submit" className="bg-[#8B0000] w-full">
                      Submit Review
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
        <h1 className="text-gray-500">Reviews from Students</h1>

        <div className="border border-gray-300 rounded-md mt-6 p-6">
          {!course?.reviews || course.reviews.length === 0 ? (
            <h2 className="text-lg font-semibold">No reviews found.</h2>
          ) : (
            course.reviews.map((review) => {
              const filledStars = Math.floor(review.rating);
              const hasHalfStar = review.rating % 1 >= 0.5;
              const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

              return (
                <div key={review.id} className="mb-4 border rounded-md p-4">
                  <div className="flex  items-center mb-2">
                    <h1 className="text-md font-semibold mb-2">
                      Anonymous Student
                    </h1>
                    {/* Rating */}
                    <div className="flex items-center mb-2 ml-auto">
                      {[...Array(filledStars)].map((_, i) => (
                        <Star
                          key={`filled-${review.id}-${i}`}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}

                      {hasHalfStar && (
                        <div className="relative">
                          <Star className="h-5 w-5 text-gray-300" />
                          <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      )}

                      {[...Array(emptyStars)].map((_, i) => (
                        <Star
                          key={`empty-${review.id}-${i}`}
                          className="h-5 w-5 text-gray-300"
                        />
                      ))}

                      <span className="ml-2 text-sm text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600">{review.comment}</p>
                </div>
              );
            })
          )}
        </div>
        {/* <div className="border border-gray-300 rounded-md mt-6 p-6">
          {course?.reviews && course.reviews.length === 0 ? (
            <h2 className="text-lg font-semibold">No reviews found.</h2>
          ) : (
            course?.reviews?.map((review) => (
              <div key={review.id} className="mb-4 border rounded-md p-4">
                <h1 className="text-xl font-semibold text-sm mb-2">
                  Anonymous Student
                </h1>
                <h3 className="text-md font-semibold">{review.rating}</h3>

                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          )}
        </div> */}
      </div>
    </>
  );
}
