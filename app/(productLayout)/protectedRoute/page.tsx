'use client'
import React, {FC} from 'react';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

type PageProps = {

}

const Page:FC<PageProps> = (props:PageProps) => {

    const {

    } = props

    const {data, status} = useSession({
        required: true,
        onUnauthenticated(){
            redirect('/')
        }
    })

    if(status=== 'loading'){
        return (
            <span>...loading</span>
        )
    }
    return (
        <div>
            <span>access</span>

        </div>
    );
};

export default Page;