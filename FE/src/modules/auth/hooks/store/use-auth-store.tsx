import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { LoginResponseI } from "../../models";

export interface AuthStore {
    auth: LoginResponseI | null;
    setAuth: (a: LoginResponseI) => void;
    logout: () => void;
}

export const authKey = "auth-storage";

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set, get) => ({
                auth: null,
                setAuth: (auth) => set({ auth }),
                logout: () => set({ auth: null }),
            }),
            {
                name: authKey, // name of the item in the storage (must be unique)
                // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            }
        )
    )
);
