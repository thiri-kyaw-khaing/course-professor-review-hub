import { createBrowserRouter } from "react-router";

import RootLayout from "./components/page components/RootLayout";
import HomePage from "@/pages/Home";
import AuthRootLayout from "./components/page components/AuthRootLayout";
import SignUpPage from "./pages/auth/signUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: HomePage }],
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      { index: true, Component: SignUpPage },
      //   { path: "create-acc", Component: CreateAccPage },
    ],
  },
]);
