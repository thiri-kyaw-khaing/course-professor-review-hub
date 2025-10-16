import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Course } from "@/types";

type CourseState = {
  courses: Course[];
};

type CourseActions = {
  setCourses: (courses: Course[]) => void;
  removeCourse: (id: number) => void;
  addCourse: (course: Course) => void;
};

export const useCoursesStore = create<CourseState & CourseActions>()(
  persist(
    (set) => ({
      courses: [],

      setCourses: (courses) => set({ courses }),

      removeCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),

      addCourse: (course) => {
        set((state) => ({
          courses: [...state.courses, course],
        }));
      },
    }),
    {
      name: "course-storage", // unique key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
