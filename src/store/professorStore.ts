import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Professor } from "@/types";

type ProfessorState = {
  professors: Professor[];
};

type ProfessorActions = {
  setProfessors: (professors: Professor[]) => void;
  removeProfessor: (id: number) => void;
  addProfessor: (professor: Professor) => void;
  updateProfessor: (professorId: number, updatedProfessor: Professor) => void;
};

export const useProfessorsStore = create<ProfessorState & ProfessorActions>()(
  persist(
    (set) => ({
      professors: [],

      setProfessors: (professors) => set({ professors }),

      removeProfessor: (id) =>
        set((state) => ({
          professors: state.professors.filter((p) => p.id !== id),
        })),

      addProfessor: (professor: Professor) =>
        set((state) => ({
          professors: [...state.professors, professor],
        })),

      updateProfessor: (professorId: number, updatedProfessor: Professor) =>
        set((state) => ({
          professors: state.professors.map((p) =>
            p.id === professorId ? { ...p, ...updatedProfessor } : p
          ),
        })),
    }),
    {
      name: "professor-storage", // unique key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
