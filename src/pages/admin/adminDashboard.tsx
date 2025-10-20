import AdminDashboardCard from "@/components/page-components/admin/adminDashboardCard";
import PieChartComponent from "@/components/page-components/admin/piechart";
import {
  BookOpen,
  GraduationCap,
  MessageCircle,
  PieChart,
  PieChartIcon,
  User2,
  UserCog,
  UserSquare2,
} from "lucide-react";
import { totalQuery } from "@/api/query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
type total = number;
export default function AdminDashboardPage() {
  const { data: total } = useQuery(totalQuery);
  console.log("Total Data:", total);

  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4">Admin Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Manage courses, professors, reviews, and view analytics
      </p>

      <div className="flex mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {/* <AdminDashboardCard
          title="Total Students"
          description="11111"
          icon={<User2 className="text-[#8B0000]" size={40} />}
        /> */}
        <AdminDashboardCard
          title="Total Courses"
          description={total?.courses || "Loading..."}
          icon={<BookOpen className="text-[#8B0000]" size={40} />}
        />
        <AdminDashboardCard
          title="Total Professors"
          description={total?.professors || "Loading..."}
          icon={<GraduationCap className="text-[#8B0000]" size={40} />}
        />
        <AdminDashboardCard
          title="Total Reviews"
          description={total?.reviews || "Loading..."}
          icon={<MessageCircle className="text-[#8B0000]" size={40} />}
        />
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg border w-[700px] mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Distribution</h2>
        <p className="text-gray-500 mb-4">
          Overall distribution of RateWise (Courses/Professors/Reviews)
        </p>
        <PieChartComponent />
      </div>
    </div>
  );
}
