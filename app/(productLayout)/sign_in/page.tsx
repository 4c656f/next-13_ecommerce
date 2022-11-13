'use client'
import React, {FC, FormEvent, useState} from 'react';
import Button from "~/components/ui/Button/Button";
import {useUserStore} from "~/store/userStore";
import FormInput from "~/components/client/FormInput/FormInput";
import classes from "./singUp.module.scss";
import {useRouter} from "next/navigation";
import {trpc} from "~/utils/trpcClient";


type SignInPageProps = {}

const SignInPage: FC<SignInPageProps> = (props: SignInPageProps) => {

    const {} = props

    const [formValue, setFormValue] = useState<Record<any, string>>({})

    const setUser = useUserStore(state => state.setIsUser)


    const router = useRouter()

    const {
        refetch,


    } = trpc.user.signIn.useQuery({
        userName: formValue.userName,
        password: formValue.password
    }, {
        enabled: false,
        retry: false,
        onError: err => {

        },
        onSuccess: data1 =>{
            setUser({
                isUser: true,
                userNickname: data1.userName
            })
            router.replace('/')
        }
    })



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()

    }


    return (
        <div
            className={classes.container}
        >

            <form
                className={classes.form}
                onSubmit={(e) => handleSubmit(e)}
            >
                <FormInput
                    placeholder={'userName'}
                    onChange={(e) => setFormValue(prevState => {
                        return {...prevState, userName: e.target.value}
                    })}
                    errorMessage={'This field required'}
                    required={true}
                    size={'large'}

                />
                <FormInput
                    placeholder={'password'}
                    type={'password'}
                    onChange={(e) => setFormValue(prevState => {
                        return {...prevState, password: e.target.value}
                    })}
                    errorMessage={'This field required'}
                    required={true}
                    size={'large'}

                />

                <Button
                    type={'submit'}
                    className={classes.btn}
                ><h3>sign In</h3></Button>
            </form>
        </div>
    );
};

export default SignInPage;