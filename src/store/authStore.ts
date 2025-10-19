import { email } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const Status = {
  otp: "otp",
  confirm: "confirm",
  none: "none",
};

export type Status = (typeof Status)[keyof typeof Status];

type State = {
  email: string | null;
  token: string | null;
  status: Status;
};

const initialState: State = {
  email: null,
  token: null,
  status: Status.none,
};

type Actions = {
  setAuth: (email: string, token: string, status: Status) => void;
  clearAuth: () => void;
};

const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (email, token, status) =>
        set((state) => {
          state.email = email;
          state.token = token;
          state.status = status;
        }),
      clearAuth: () => set(initialState),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAuthStore };
