import { Button } from "@/components/ui/button";
import { professors } from "@/data";
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  PlusIcon,
} from "lucide-react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { oneProfessorQuery } from "@/api/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Review } from "@/types";

export default function ProfessorDetailPage() {
  // const { professorId } = useParams();
  // const professor = professors.find((p) => p.id === Number(professorId));
  const { professorId } = useLoaderData();
  const { data: professor } = useSuspenseQuery(oneProfessorQuery(professorId));
  const [rating, setRating] = useState(0);
  const imgUrl = import.meta.env.VITE_IMG_URL;
  return (
    <>
      {professor ? (
        <div>
          {/* Back button */}
          <Link to="/professors" className="flex items-center mt-4">
            <Button variant="ghost" className="px-0 text-[#8B0000]">
              <ArrowLeft className="h-4 w-4 text-[#8B0000]" />
              Back to Professors
            </Button>
          </Link>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* LEFT: 3/4 */}
            <div className="flex flex-col gap-4 lg:w-3/4 w-full">
              {/* Professor Card */}
              <Card>
                <CardHeader className="flex flex-col lg:flex-row gap-4 items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={imgUrl + professor.data.image} />
                    <AvatarFallback className="bg-mfu-red text-white text-3xl">
                      {professor.data.name
                        ? professor.data.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center lg:text-left space-y-2">
                    <CardTitle>{professor.data.name}</CardTitle>
                    <div className="flex items-center gap-1 text-gray-600">
                      <GraduationCap className="inline mr-1 h-5 w-5" />
                      <p>{professor.data.faculty}</p>
                    </div>
                    {/* <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="inline mr-1 h-4 w-4" />
                      <p>{professor.data.office}</p>
                    </div> */}
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="inline mr-1 h-5 w-5" />
                      <p>{professor.data.email}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating
                        value={professor.data.averageRate ?? 0}
                        readOnly={true}
                      />
                      <span>{professor.data.averageRate} / 5</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Contact & Office
              <Card>
                <CardHeader className="space-y-2">
                  <CardTitle>Contact & Office</CardTitle>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Mail className="inline mr-1 h-5 w-5" />
                    <p>{professor.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="inline mr-1 h-4 w-4" />
                    <p>{professor.office}</p>
                  </div>
                </CardHeader>
              </Card> */}

              {/* Student Reviews */}
              <div className="border border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-lg">Student Reviews</span>
                  <div className="ml-auto">
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-white bg-[#8B0000] hover:bg-[#8B0000]"
                          >
                            <PlusIcon className="h-4 w-4 text-white" />
                            Write a Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Write a Review</DialogTitle>
                            <DialogDescription>
                              Share your experience with Professor{" "}
                              {professor.data.name} to help other students.
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
                              <div>
                                <Label htmlFor="comment">Your Review</Label>
                                <textarea
                                  id="comment"
                                  rows={4}
                                  className="w-full mt-1 rounded-md border bg-muted p-3 text-sm"
                                  placeholder="Share your thoughts about this professor..."
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
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

                {professor?.data?.reviews?.length === 0 ? (
                  <h2 className="text-lg font-semibold">No reviews found.</h2>
                ) : (
                  professor?.reviews?.map((review: Review) => (
                    <div key={review.id} className="mb-4 border rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <h1 className="text-md font-semibold ">
                          Anonymous Student
                        </h1>
                        <div className="flex ml-auto gap-2 items-center">
                          <StarRating value={review.rating} readOnly={true} />
                          <h1 className="text-sm">{review.rating} / 5</h1>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: 1/4 Overall Rating */}
            <div className="flex flex-col gap-4 lg:w-1/4 w-full h-fit mt-4 lg:mt-0">
              <Card className="border border-gray-300 rounded-md p-6 w-full">
                <h2 className="text-lg font-semibold">Overall Course Rating</h2>
                <h1 className="text-4xl font-bold justify-center items-center text-center flex mt-6">
                  {professor.data.averageRate}
                </h1>
                <div className="flex justify-center mt-2">
                  <StarRating
                    value={professor.data.averageRate ?? 0}
                    readOnly={true}
                  />
                </div>
                <p className="text-gray-600 mt-2 text-center">
                  {professor.data.totalReviews} Reviews
                </p>
              </Card>

              <Card className="border border-gray-300 rounded-md p-6 w-full">
                <h2 className="text-lg font-semibold mb-2">Education</h2>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {professor.data.education.map((edu, index) => (
                    <li key={index}>{edu.degree}</li>
                  ))}
                </ul>
              </Card>

              {/* <Card className="border border-gray-300 rounded-md p-6 w-full">
                <h2 className="text-lg font-semibold ">Areas of Expertise</h2>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {professor.specializations.map((e, i) => (
                    <div
                      key={i}
                      className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-md mb-2"
                    >
                      {e}
                    </div>
                  ))}
                </ul>
              </Card> */}
            </div>
          </div>
        </div>
      ) : (
        <p>Professor not found</p>
      )}
    </>
  );
}
