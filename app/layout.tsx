
import './globals.css'
import ThemeProvider from "../components/client/ThemeProvider/ThemeProvider";



function RootLayout({
                                       children,
                                   }: {
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

            <ThemeProvider>
                {children}
            </ThemeProvider>
            </body>

            </html>


    )
}

export default RootLayout;