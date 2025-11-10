interface AdminDashboardCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}
export default function AdminDashboardCard({
  title,
  description,
  icon,
}: AdminDashboardCardProps) {
  return (
    <>
      <div className="flex mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between bg-white p-4 h-[100px] rounded-xl border w-[400px]">
          <div>
            <h2 className="text-md text-gray-500 mb-2">{title}</h2>
            <p className="text-3xl font-semibold">{description}</p>
          </div>
          {icon}
        </div>
      </div>
    </>
  );
}
