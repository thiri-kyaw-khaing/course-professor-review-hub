import { Outlet } from "react-router-dom";
import AdminHeader from "./adminHeader";

export default function AdminRootLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 container mx-auto px-4 py-6 pt-16">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
      ;
    </>
  );
}
