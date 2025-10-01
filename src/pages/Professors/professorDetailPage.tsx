import { Button } from "@/components/ui/button";
import { professors } from "@/data";
import { ArrowLeft, GraduationCap, MapPin } from "lucide-react";
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
export default function professorDetailPage() {
  const { professorId } = useParams();
  const professor = professors.find((p) => p.id === Number(professorId));
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
          <div className="lg:w-3/4 mt-6 sm:w-full">
            <Card>
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
                <div>
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
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
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
