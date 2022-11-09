import {IReducerAction} from "~/types/IReducerAction";
import {Dispatch, useReducer} from "react";
import {AtMostOneOf} from "~/types/IAtMostOne";


enum HandleProductScrollActions {
    HandleWherePrice = "HandleWherePrice",
    HandleOrder = "HandleOrder",
}

type Actions =
    | IReducerAction<HandleProductScrollActions.HandleWherePrice, {price: { lt?: number; gt?: number }}>
    | IReducerAction<HandleProductScrollActions.HandleOrder, {value: 'price'|'name'}>


export interface IHandleProductScrollState {
    take: number,
    where?: {
        price?: {
            lt?: number
            gt?: number
        }
    },
    orderBy:{
        price?: 'asc' | 'desc' ;
        name?: 'asc' | 'desc' ;
    }
}

const HandleProductScrollInitState: IHandleProductScrollState = {
    take: 10,
    orderBy: {price: 'asc'}
}


interface InputInit {
    name: string;
    type: string;
    validation: string;
}

interface useHandleProductScrollArgs {
    (): {state: IHandleProductScrollState, dispatch: Dispatch<Actions>, actions:typeof HandleProductScrollActions}
}


const useHandleProductScroll: useHandleProductScrollArgs = () => {

    type Reducer<State, Actions> = (s: State, a: Actions) => State

    const HandleProductScrollReducer: Reducer<typeof HandleProductScrollInitState, Actions> = (state,
                                                                                         action) => {

        switch (action.type) {
            case HandleProductScrollActions.HandleWherePrice:
                const {
                    price
                } = action.payload

                return {...state,where: {price}};


            case HandleProductScrollActions.HandleOrder:

                const {
                    value
                } = action.payload

                const orderBy:any = {

                }

                if(value in state.orderBy){
                    if(state.orderBy[value] === 'asc'){
                        orderBy[value] = 'desc'
                    }else{
                        orderBy[value] = 'asc'
                    }
                }else{
                    orderBy[value] = 'asc'
                }





                return {
                    ...state,
                    orderBy: orderBy
                }

            default:
                return state;
        }
    }


    const [state, dispatch] = useReducer(HandleProductScrollReducer, HandleProductScrollInitState)




    return {state:state, dispatch:dispatch, actions:HandleProductScrollActions}

}

export default useHandleProductScroll