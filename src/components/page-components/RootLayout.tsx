import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
