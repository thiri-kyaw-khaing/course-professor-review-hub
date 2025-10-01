import type { Professor } from "@/types";
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
import {
  GraduationCap,
  LocateIcon,
  Mail,
  MapPin,
  PhoneCallIcon,
  PinIcon,
  Star,
} from "lucide-react";
import StarRating from "@/components/page-components/StarRating";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
export interface ProfessorListPageProps {
  professors: Professor[];
}
export default function ProfessorListPage({
  professors,
}: ProfessorListPageProps) {
  return (
    <>
      {professors.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No professors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {professors.map((professor) => (
            <Link key={professor.id} to={`/professors/${professor.id}`}>
              <Card key={professor.id}>
                <CardHeader>
                  <div className="flex gap-2 items-center">
                    <Avatar className="h-20 w-20">
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
                      <CardDescription>{professor.title}</CardDescription>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRating
                          value={professor?.averageRating ?? 0}
                          readOnly={true}
                        />
                        <span>{professor.averageRating} / 5</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-1 text-gray-600">
                    <GraduationCap className="inline mr-1 h-5 w-5" />
                    <p>{professor.faculty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="inline mr-1 h-4 w-4" />
                    <p>{professor.office}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Mail className="inline mr-1 h-4 w-4" />
                    <p>{professor.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <PhoneCallIcon className="inline mr-1 h-4 w-4" />
                    <p>{professor.phone}</p>
                  </div>
                </CardContent>
                {/* <Separator className="text-gray-600 w-[1px]" /> */}
                <CardFooter className="flex flex-wrap gap-2 items-center">
                  <div>
                    <p className="">Specializations: </p>
                    {professor.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-lg pl-2 mr-2 mb-2 font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <p className="">Education: </p>
                    {professor.education.map((edu, index) => (
                      <div>
                        {/* <PrizeIcon className="inline mr-1 h-4 w-4"/> */}
                        <h1
                          key={index}
                          className=" text-sm px-2 py-1  pl-2 mr-1 mb-1"
                        >
                          {edu}
                        </h1>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
