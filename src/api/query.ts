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

const fetchOneCourse = async (id: number) => {
  const course = await api.get(`users/courses/${id}`);

  if (!course) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return course.data;
};

export const oneCourseQuery = (id: number) => ({
  queryKey: ["courses", "detail", id],
  queryFn: () => fetchOneCourse(id),
});

export const fetchOneProfessor = async (id: number) => {
  const professor = await api.get(`users/professors/${id}`);

  if (!professor) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return professor.data;
};

export const oneProfessorQuery = (id: number) => ({
  queryKey: ["professors", "detail", id],
  queryFn: () => fetchOneProfessor(id),
});

const fetchAllReviews = async () => {
  const response = await api.get("users/reviews");
  return response.data;
};

export const allReviewsQuery = {
  queryKey: ["all-reviews"],
  queryFn: () => fetchAllReviews(),
};
