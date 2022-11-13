import React, {ReactNode} from 'react';
import ServerHeader from "../../components/server/ServerHeader/ServerHeader";
import classes from "./layoutClasses.module.css"

type ProductIndexLayoutProps = {
    children: ReactNode
}


export default async function ProductIndexLayout(props: ProductIndexLayoutProps) {

    const {
        children
    } = props


    return (
        <main
            className={classes.main_container}
        >
            {/*@ts-ignore*/}
            <ServerHeader

            />
            <div
                className={classes.content_container}
            >
                {children}
            </div>
        </main>
    );
};

