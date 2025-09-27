import { Outlet } from "react-router";
import Footer from "./page components/Footer";
import Header from "./page components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
