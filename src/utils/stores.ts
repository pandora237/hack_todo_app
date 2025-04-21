import { create } from "zustand";
import { persist } from 'zustand/middleware';

const key_storage = 'datas_todo_app'

const useStoreTodoApp = create<StoreState>()(
    persist(
        (set) => (
            {
                user: null,
                setUser: (user) => set(() => ({ user })),

                categories: [],
                setCategories: (categories) => set(() => ({ categories })),

            }),
        {
            name: key_storage,
            // getStorage: () => localStorage,
        }
    )
)

export default useStoreTodoApp;