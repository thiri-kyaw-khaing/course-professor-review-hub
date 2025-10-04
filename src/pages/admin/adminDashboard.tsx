import AdminDashboardCard from "@/components/page-components/admin/adminDashboardCard";
import {
  BookOpen,
  GraduationCap,
  MessageCircle,
  User2,
  UserCog,
  UserSquare2,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4">Admin Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Manage courses, professors, reviews, and view analytics
      </p>

      <div className="flex mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <AdminDashboardCard
          title="Total Students"
          description="11111"
          icon={<User2 className="text-[#8B0000]" size={40} />}
        />
        <AdminDashboardCard
          title="Total Courses"
          description="2222"
          icon={<BookOpen className="text-[#8B0000]" size={40} />}
        />
        <AdminDashboardCard
          title="Total Professors"
          description="3333"
          icon={<GraduationCap className="text-[#8B0000]" size={40} />}
        />
        <AdminDashboardCard
          title="Total Reviews"
          description="5678"
          icon={<MessageCircle className="text-[#8B0000]" size={40} />}
        />
      </div>
    </div>
  );
}
