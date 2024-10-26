// types.ts
export interface User {
    id: string;
    username: string;
    email: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
    setUser: (userData: User, token: string) => void;
    clearUser: () => void;
}

// userSlice.ts
import { StateCreator } from 'zustand';

const userSlice: StateCreator<UserState> = (set) => ({
    user: null,
    token: null,

    setUser: (userData: User, token: string) => set({ user: userData, token: token }),
    clearUser: () => set({ user: null, token: null }),
});

export default userSlice;
