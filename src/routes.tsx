import { createBrowserRouter } from "react-router";

import RootLayout from "./components/page-components/RootLayout";
import HomePage from "@/pages/Home";
import AuthRootLayout from "./components/page-components/AuthRootLayout";
import SignUpPage from "./pages/auth/signUp";
import OTPPage from "./pages/auth/OTPpage";
import CreateAccForm from "./pages/auth/createAcc";

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
      { path: "otp", Component: OTPPage },
      { path: "create", Component: CreateAccForm },
    ],
  },
]);
