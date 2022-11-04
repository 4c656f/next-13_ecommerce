import {useContext} from "react";
import {ThemeContext} from "./components/ui/ThemeProvider/ThemeProvider";
import Header from "./components/ui/Header/Header";
import HeaderItem from "./components/ui/HeaderItem/HeaderItem";
import HeaderSection from "./components/ui/HeaderSection/HeaderSection";
import classes from "./page.module.scss";
import Button from "./components/ui/Button/Button";
import Link from "next/link";
import {PrismaClient} from "@prisma/client";


type HomeProps = {}
const prisma = new PrismaClient()
async function getData() {


    const res = await prisma.user.findFirst();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return res;
}


export default async function Home(props: HomeProps) {
    // const {} = props


    const data = await getData()



    return (
        <>
            <div
                className={classes.header_container}
            >
                <Header
                    logoSection={<h1>Logo</h1>}
                    mainSection={
                        [<HeaderItem title={"someTitle"} key={'someKey'}>
                            <HeaderSection
                                sectionTitle={<h1>SomeTitle</h1>}
                            />
                        </HeaderItem>
                        ]}
                    rightSection={[
                        <Button href={'/product/2'} as={Link}>Link</Button>
                    ]}
                />
            </div>
            {data?.username}
        </>
    )
}
