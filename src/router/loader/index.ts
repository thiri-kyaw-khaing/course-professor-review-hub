import api from "@/api";
import { courseQuery, oneCourseQuery, queryClient } from "@/api/query";
import type { LoaderFunctionArgs } from "react-router-dom";

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
