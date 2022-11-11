'use client'
import React, {FC} from 'react';

import {redirect} from "next/navigation";
import {trpc} from "~/utils/trpcClient";

type PageProps = {

}

const Page:FC<PageProps> = (props:PageProps) => {

    const {

    } = props



    const {isLoading, data} = trpc.user.hello.useQuery({login: "some"})

    return (
        <div>
            <span>access</span>

        </div>
    );
};

export default Page;