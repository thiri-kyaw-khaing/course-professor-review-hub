import { createBrowserRouter } from "react-router";

import RootLayout from "./components/page-components/RootLayout";
import HomePage from "@/pages/Home";
import AuthRootLayout from "./components/page-components/AuthRootLayout";
import SignUpPage from "./pages/auth/signUp";
import OTPPage from "./pages/auth/OTPpage";
import CreateAccForm from "./pages/auth/createAcc";
import Courses from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseRootLayout from "./components/page-components/CourseRelate/CourseRootLayout";
import ProfessorRootLayout from "./components/professors/professorRootLayout";
import ProfessorsPage from "./pages/Professors/professors";
import professorDetailPage from "./pages/Professors/professorDetailPage";
import MyReviewsPage from "./pages/MyReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "courses",
        Component: CourseRootLayout,
        children: [
          { index: true, Component: Courses },
          { path: ":courseId", Component: CourseDetailPage },
        ],
      },
      {
        path: "professors",
        Component: ProfessorRootLayout,
        children: [
          { index: true, Component: ProfessorsPage },
          { path: ":professorId", Component: professorDetailPage },
        ],
      },
      {
        path: "my-reviews",
        Component: MyReviewsPage,
      },
    ],
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      { index: true, Component: SignUpPage },
      { path: "otp", Component: OTPPage },
      { path: "create", Component: CreateAccForm },
    ],
  },
]);
