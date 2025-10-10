import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "react-router";
import type { UserInfo } from "@/types";
import { BookOpen, Calendar, LogOut, PersonStanding, User } from "lucide-react";
interface ProfileAdminAvatarProps {
  // Define any props if needed
  user: User;
}
export default function ProfileAdminAvatar({ user }: ProfileAdminAvatarProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/src/assets/profile3.jpeg"
              alt="Profile Picture"
              className="object-cover rounded-full"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <User className="inline mr-2 h-4 w-4 text-[#8B0000]" />
            Administrator
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Form method="post" action="/logout">
              <LogOut className="inline mr-2 h-4 w-4 text-[#8B0000]" />
              <button type="submit" className="w-full">
                Log Out
              </button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
