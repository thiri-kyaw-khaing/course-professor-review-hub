import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Review } from "@/types";

type ReviewState = {
  reviews: Review[];
};

type ReviewActions = {
  setReviews: (reviews: Review[]) => void;
  removeReview: (id: number) => void;
  updateReview: (updatedReview: Review) => void;
};

export const useReviewsStore = create<ReviewState & ReviewActions>()(
  persist(
    (set) => ({
      reviews: [],

      setReviews: (reviews) => set({ reviews }),

      removeReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== id),
        })),
      updateReview: (updatedReview) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          ),
        })),
    }),
    {
      name: "review-storage", // unique key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
