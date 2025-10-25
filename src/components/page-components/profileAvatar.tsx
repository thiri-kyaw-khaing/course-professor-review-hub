import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserInfo } from "@/types";
import { BookOpen, Calendar, LogOut, User } from "lucide-react";

import { data, Form } from "react-router";
interface ProfileAvatarProps {
  // Define any props if needed
  user: User;
}
import { userProfileQuery } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const { data: userData } = useQuery(userProfileQuery);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/src/assets/admin-avatar.jpg"
              alt="Profile Picture"
              className="object-cover rounded-full"
            />
            <AvatarFallback>{userData?.Year}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <User className="inline mr-2 h-4 w-4 text-[#8B0000]" />
            Anonymous Student {userData?.userId}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <BookOpen className="inline mr-2 h-4 w-4 text-[#8B0000]" />
            {userData?.Faculty}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="inline mr-2 h-4 w-4 text-[#8B0000]" />
            {userData?.Year} Student
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Form method="post" action="/logout">
              <button type="submit" className="w-full">
                <LogOut className="inline mr-2 h-4 w-4 text-[#8B0000]" />
                Log Out
              </button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
