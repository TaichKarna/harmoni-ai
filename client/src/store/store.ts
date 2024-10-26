// store.ts
import { create } from 'zustand';
import userSlice from './user/userSlice';
import { UserState } from './user/userSlice';
// store.ts
import { persist } from 'zustand/middleware';

const useStore = create<UserState>()(
    persist(
        (...a) => ({
            ...userSlice(...a),
        }),
        {
            name: 'user-storage', // Key to store in localStorage
            partialize: (state) => ({ user: state.user, token: state.token }), // Save only user and token
        }
    )
);

export default useStore;
