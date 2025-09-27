import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileAvatar() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src="/src/assets/profile3.jpeg" alt="Profile Picture" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  );
}
