import create from 'zustand'


type is = {
    isUser: false
}|{
    isUser: true,
    userNickname: string
}

interface UserStore {
    isUser: boolean;
    userNickname?: string;
    isLoading: boolean
    setIsUser: (is:is) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isUser: false,
    userNickname: undefined,
    isLoading: true,
    setIsUser: (is) => set((state) =>{
        if(!is.isUser){
            return {
                isUser: false,
                isLoading: false
            }
        }
        return{
            isUser: is.isUser,
            isLoading: false,
            userNickname: is.userNickname
        }
    }

    ),
}))