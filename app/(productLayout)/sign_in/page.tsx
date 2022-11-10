import React, {FC} from 'react';
import Input from "~/components/ui/Input/Input";

type SignInPageProps = {

}

const SignInPage:FC<SignInPageProps> = (props:SignInPageProps) => {

    const {

    } = props


    return (
        <div>
            <Input
                placeholder={'login'}
            />

        </div>
    );
};

export default SignInPage;