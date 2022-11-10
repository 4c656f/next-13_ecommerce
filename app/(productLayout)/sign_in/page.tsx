'use client'
import React, {FC} from 'react';
import Input from "~/components/ui/Input/Input";
import Button from "~/components/ui/Button/Button";


type SignInPageProps = {

}

const SignInPage:FC<SignInPageProps> = (props:SignInPageProps) => {

    const {

    } = props


    const handleClick = async () => {
      const resp = await fetch('/api/auth/signin')
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

        </div>
    );
};

export default SignInPage;