import './globals.css'
import ThemeProvider from "../components/client/ThemeProvider/ThemeProvider";
import {ClientProvider} from "~/components/client/trpcClient";


async function RootLayout({children}: {
    children: React.ReactNode
}) {


    return (

        <html lang="en">
        <head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
        </head>

        <body>
        <ClientProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </ClientProvider>
        </body>
        </html>


    )
}

export default RootLayout;