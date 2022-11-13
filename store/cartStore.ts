import create from 'zustand'

interface CartStore {
    cartCount: number
    increaseCartCount: () => void
}

export const useCartStore = create<CartStore>((set) => ({
    cartCount: 0,
    increaseCartCount: () => set((state) => ({cartCount: state.cartCount + 1})),
}))