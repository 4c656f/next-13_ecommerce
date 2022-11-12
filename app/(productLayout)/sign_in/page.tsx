'use client'
import React, {FC} from 'react';
import Input from "~/components/ui/Input/Input";
import Button from "~/components/ui/Button/Button";
import {useUserStore} from "~/store/userStore";
import Link from "next/link";
import {trpc} from "~/utils/trpcClient";


type SignInPageProps = {}

const SignInPage: FC<SignInPageProps> = (props: SignInPageProps) => {

    const {} = props

    const setUser = useUserStore(state => state.setIsUser)

    const handleClick = async () => {
        const resp = await fetch('/api/auth/signin')
        setUser(true)
        console.log(resp)
    }



    return (
        <div>
            <Input
                placeholder={'login'}
            />
            <Button
                onClick={handleClick}
            ><h1>sign in</h1></Button>
            <Link href={'/protectedRoute'}><h1>protected</h1></Link>

        </div>
    );
};

export default SignInPage;