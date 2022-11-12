import React, {ReactNode} from 'react';
import ServerHeader from "../../components/server/ServerHeader/ServerHeader";
import {prisma} from "~/utils/prisma";

type ProductIndexLayoutProps = {
    children: ReactNode
}




export default async function ProductIndexLayout(props: ProductIndexLayoutProps) {

    const {
        children
    } = props



    return (
        <>
            {/*@ts-ignore*/}
            <ServerHeader

            />
            {children}
        </>
    );
};

