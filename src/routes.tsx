import { createBrowserRouter } from "react-router";

import RootLayout from "./components/RootLayout";
import HomePage from "@/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: HomePage }],
  },
]);
