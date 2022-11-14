import create from 'zustand'
import {trpc} from "~/utils/trpcClient";

interface CartStore {
    length: number,
    cartIds: {
        [key:string]: number
    }
    addToCart: (id:string) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    length: 0,
    cartIds: {},
    addToCart: (id) => {
        let {cartIds:cartItems, length} = get()

        if(id in cartItems){

            cartItems[id] += 1


        }else{
            cartItems[id] = 1
            length += 1
        }

        localStorage.setItem('products', JSON.stringify(cartItems))

        set((state) => {

            return {...state,
                length: length,
                cartIDS: {
                    ...cartItems
                }}
        })


    },
}))