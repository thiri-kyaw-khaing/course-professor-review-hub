import { QueryClient } from "@tanstack/react-query";
import api from "@/api/index";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      // retry: 2,
    },
  },
});

const fetchProfessors = async () => {
  const response = await api.get("users/professors");
  return response.data;
};

export const professorQuery = {
  queryKey: ["professors"],
  queryFn: () => fetchProfessors(),
};

const fetchCourses = async () => {
  const response = await api.get("users/courses");
  return response.data;
};

export const courseQuery = {
  queryKey: ["courses"],
  queryFn: () => fetchCourses(),
};
