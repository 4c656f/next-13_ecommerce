'use client';
import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import { ClientProvider } from '~/client/trpcClient';




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
            <ClientProvider>
                {children}
            </ClientProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;