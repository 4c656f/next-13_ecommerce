'use client';
import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {trpc} from "~/utils/trpcClient";
import {useUserStore} from "~/store/userStore";


type ThemeProviderProps = {

    children: ReactNode
}


export const ThemeContext = createContext({
    isDark: true,
    toggleTheme: () => {
    }
})

const ThemeProvider: FC<ThemeProviderProps> = (props) => {


    const {
        children
    } = props

    const [isDark, setIsDark] = useState(true)


    const setIsUser = useUserStore(state => state.setIsUser)


    const {data, isLoading, isFetching} = trpc.protected.getSession.useQuery()


    useEffect(() => {

        if (isLoading)return
        if(!data)return;
        setIsUser({isUser: true, userNickname: data.userName})
    }, [isFetching, isLoading])


    const toggleTheme = (): void => {
        setIsDark((prevState) => !prevState)
    }


    useEffect(() => {

        document.body.dataset.theme = isDark ? 'dark' : 'light'
    }, [isDark])

    return (

        <ThemeContext.Provider value={{isDark: isDark, toggleTheme: toggleTheme}}>

            {children}

        </ThemeContext.Provider>
    );
};

export default ThemeProvider;