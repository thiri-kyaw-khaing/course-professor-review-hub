import api from "@/api";
import {
  courseQuery,
  oneCourseQuery,
  oneProfessorQuery,
  queryClient,
} from "@/api/query";
import { Status, useAuthStore } from "@/store/authStore";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

// export const homeLoader = async () => {
//   try {
//     const response = await api.get("/users/reviews");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to load home data", error);
//     throw error;
//   }
// };

export const oneCourseLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.courseId) {
    //courseId is from route (path: ":courseId",)
    throw new Error("No course ID provided");
  }

  await queryClient.ensureQueryData(oneCourseQuery(Number(params.courseId)));
  return { courseId: params.courseId };
};

export const oneProfessorLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.professorId) {
    throw new Error("No professor ID provided");
  }
  await queryClient.ensureQueryData(
    oneProfessorQuery(Number(params.professorId))
  );
  return { professorId: params.professorId };
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();
  console.log("OTP Loader - Auth Status:", authStore.status);
  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }
  return null;
};

export const createAccLoader = async () => {
  const authStore = useAuthStore.getState();
  console.log("Create Account Loader - Auth Status:", authStore.status);
  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};

// Assuming you have a similar query for fetching a single professor
