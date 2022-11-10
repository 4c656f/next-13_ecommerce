'use client';
import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import { ClientProvider } from '~/components/client/trpcClient';
import { SessionProvider } from 'next-auth/react';



type ThemeProviderProps = {
    children: ReactNode
}


export const ThemeContext = createContext({
    isDark: true,
    toggleTheme: () => {
    }
})

const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {

    const [isDark, setIsDark] = useState(true)


    const toggleTheme = (): void => {
        setIsDark((prevState) => !prevState)
    }

    useEffect(() => {
        document.body.dataset.theme = isDark ? 'dark' : 'light'
    }, [isDark])

    return (

        <ThemeContext.Provider value={{isDark: isDark, toggleTheme: toggleTheme}}>
            <SessionProvider
                refetchOnWindowFocus={false}
            >
                <ClientProvider>
                    {children}
                </ClientProvider>
            </SessionProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;