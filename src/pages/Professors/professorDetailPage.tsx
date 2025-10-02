import { Button } from "@/components/ui/button";
import { professors } from "@/data";
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  PlusIcon,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/page-components/StarRating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export default function professorDetailPage() {
  const { professorId } = useParams();
  const professor = professors.find((p) => p.id === Number(professorId));
  const [rating, setRating] = useState(0);
  return (
    <>
      {professor ? (
        <div>
          <Link to="/courses" className="flex items-center mt-4">
            <Button variant="ghost" className="px-0 text-[#8B0000]">
              <ArrowLeft className=" h-4 w-4 text-[#8B0000]" />
              Back to Professors
            </Button>
          </Link>
          <div className="">
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <div className="border border-gray-300 rounded-lg p-6 mt-4 lg:w-3/4 sm:w-full">
                <Card className="mb-6">
                  <CardHeader className="flex flex-col lg:flex-row gap-4 items-center">
                    <Avatar className="h-30 w-30">
                      <AvatarImage src={professor.imageUrl} />
                      <AvatarFallback className="bg-mfu-red text-white text-3xl">
                        {professor.name
                          ? professor.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center lg:text-left space-y-2">
                      <CardTitle>{professor.name}</CardTitle>
                      <div className="flex items-center gap-1 text-gray-600">
                        <GraduationCap className="inline mr-1 h-5 w-5" />
                        <p>{professor.faculty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="inline mr-1 h-4 w-4" />
                        <p>{professor.office}</p>
                      </div>

                      <div className="flex items-center gap-1 mt-1">
                        <StarRating
                          value={professor.averageRating ?? 0}
                          readOnly={true}
                        />
                        <span>{professor.averageRating} / 5</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
              {/* Overall Course Rating */}
              <div className="border border-gray-300 rounded-md mt-4 p-6 lg:w-1/3 sm:w-full">
                <h2 className="text-lg font-semibold">Overall Course Rating</h2>
                <h1 className="text-4xl font-bold justify-center items-center text-center flex mt-6">
                  {professor.averageRating}
                </h1>
                {/* Rating */}
                <StarRating
                  value={professor.averageRating ?? 0}
                  readOnly={true}
                />
                <p className="text-gray-600 mt-2">
                  {professor.totalReviews} Reviews
                </p>
              </div>
            </div>

            <div className="lg:w-3/4 mt-6 sm:w-full">
              <Card>
                <CardHeader className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="text-center lg:text-left space-y-2">
                    <CardTitle>Contact & Office</CardTitle>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="inline mr-1 h-5 w-5" />
                      <p>{professor.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="inline mr-1 h-4 w-4" />
                      <p>{professor.office}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
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
                              Share your experience with Professor Unknown to
                              help other students.
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
                            <Button
                              type="submit"
                              className="bg-[#8B0000] w-full"
                            >
                              Submit Review
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </div>
                </div>
                <h1 className="text-gray-500 mb-4">Reviews from Students</h1>

                {!professor?.reviews || professor.reviews.length === 0 ? (
                  <h2 className="text-lg font-semibold">No reviews found.</h2>
                ) : (
                  professor.reviews.map((review) => {
                    return (
                      <div
                        key={review.id}
                        className="mb-4 border rounded-md p-4"
                      >
                        <div className="flex  items-center mb-2">
                          <h1 className="text-md font-semibold ">
                            Anonymous Student
                          </h1>
                          {/* Rating */}
                          <div className=" flex ml-auto gap-2 items-center">
                            <StarRating value={review.rating} readOnly={true} />
                            <h1 className="text-sm">{review.rating} / 5</h1>
                          </div>
                        </div>

                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    );
                  })
                )}

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
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>Professor not found</p>
        </>
      )}
    </>
  );
}
