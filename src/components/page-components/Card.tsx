import { PersonStandingIcon, User } from "lucide-react";

export default function Card({
  title,
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4  bg-white flex gap-4">
        <div className="border border-gray-300 rounded-lg p-2 flex items-center justify-center bg-red-100">
          {icon && <div className="text-[#8B0000]">{icon}</div>}
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 font-4xl text-start">{description}</p>
        </div>
      </div>
    </>
  );
}
