import AdminDashboardCard from "@/components/page-components/admin/adminDashboardCard";
import PieChartComponent from "@/components/page-components/admin/piechart";
import { BookOpen, GraduationCap, MessageCircle } from "lucide-react";
import { totalQuery } from "@/api/query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
type total = number;
export default function AdminDashboardPage() {
  const { data: total } = useQuery(totalQuery);
  console.log("Total Data:", total);

  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4 text-center">
        Admin Dashboard
      </h1>
      <p className="text-gray-500 mt-2 text-center">
        Manage courses, professors, reviews, and view analytics
      </p>

      {/* Browse Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link to="/admin/courses">
          <Button className="bg-[#8B0000] text-white px-4 py-2 rounded-lg hover:bg-[#a52a2a] transition">
            Manage Courses
          </Button>
        </Link>
        <Link to="/admin/professors">
          <Button className="text-[#8B0000] px-4 py-2 rounded-lg bg-white hover:bg-white border border-[#8B0000]">
            Manage Professors
          </Button>
        </Link>
      </div>

      <div className="flex mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
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
