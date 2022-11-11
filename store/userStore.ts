import create from 'zustand'

interface UserStore {
    isUser: boolean
    setIsUser: (is:boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
    isUser: false,
    setIsUser: (is) => set((state) => ({ isUser: is})),
}))