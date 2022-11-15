import './globals.css'
import ThemeProvider from "../components/client/ThemeProvider/ThemeProvider";
import {ClientProvider} from "~/components/client/trpcClient";


async function RootLayout({children}: {
    children: React.ReactNode
}) {


    return (

        <html lang="en">
        <head>
            <meta name="description" content="Ecommerce site"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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