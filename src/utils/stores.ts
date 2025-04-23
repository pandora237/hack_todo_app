import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

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
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

export default useStoreTodoApp;