import create from 'zustand'
import {trpc} from "~/utils/trpcClient";

interface CartStore {
    cartCount: number
    increaseCartCount: () => void
}

export const useCartStore = create<CartStore>((set) => ({
    cartCount: 0,
    increaseCartCount: async () => {-
        set((state) => ({cartCount: state.cartCount + 1}))
    },
}))