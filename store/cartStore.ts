import create from 'zustand'
import {trpc} from "~/utils/trpcClient";
import {json} from "stream/consumers";

interface CartStore {
    length: number,
    cartIds: {
        [key:string]: number
    }
    addToCart: (id:string) => void;
    hydrateStore: ()=>void
}

export const useCartStore = create<CartStore>((set, get) => ({
    length: 0,
    cartIds: {},
    addToCart: (id) => {

        let length = 0
        let cartIdsObject: CartStore['cartIds']

        let prevLocal = (localStorage.getItem('products'))

        if(!prevLocal){
            console.log('if------')
            cartIdsObject = {[id]: 1}
            localStorage.setItem('products', JSON.stringify(cartIdsObject))
            length = 1
        }else{
            const prevLocalObj = JSON.parse(prevLocal) as CartStore['cartIds']

            const keysLength = Object.keys(prevLocalObj).length

            if(id in prevLocalObj){
                prevLocalObj[id] += 1
                length = keysLength
            }else{
                prevLocalObj[id] = 1
                length = keysLength + 1
            }
            cartIdsObject = prevLocalObj
            localStorage.setItem('products', JSON.stringify(prevLocalObj))
        }


        set((state) => {

            return {...state,
                length: length,
                cartIDS: {
                    ...cartIdsObject
                }}
        })


    },
    hydrateStore: ()=>{

        const products = localStorage.getItem('products')
        if(!products)return
        const productsObj = JSON.parse(products) as CartStore['cartIds']

        set((state => ({cartIds: productsObj, length: Object.keys(productsObj).length})))
    }
}))