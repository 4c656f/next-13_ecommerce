'use client'
import React, {FC, FormEvent, useState} from 'react';
import Button from "~/components/ui/Button/Button";
import {useUserStore} from "~/store/userStore";
import Link from "next/link";
import FormInput from "~/components/client/FormInput/FormInput";
import classes from "./singUp.module.scss";
import {useRouter} from "next/navigation";


type SignInPageProps = {}

const SignInPage: FC<SignInPageProps> = (props: SignInPageProps) => {

    const {} = props

    const [formValue, setFormValue] = useState<Record<any, string>>({})

    const setUser = useUserStore(state => state.setIsUser)


    const router = useRouter()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const resp = await fetch('/api/auth/signUp', {
            method: 'POST',
            body: JSON.stringify({
                userName: formValue?.['userName'],
                email: formValue?.['email'],
                password: formValue?.['password']
            })
        })

        router.replace('/')


    }


    return (
        <div
            className={classes.container}
        >

            <form
                className={classes.form}
                onSubmit={(e)=>handleSubmit(e)}
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
                    placeholder={'email'}
                    onChange={(e) => setFormValue(prevState => {
                        return {...prevState, email: e.target.value}
                    })}
                    errorMessage={'Email is not valid'}
                    required={true}
                    type={'email'}
                    size={'large'}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                ><h3>sign Un</h3></Button>
            </form>
        </div>
    );
};

export default SignInPage;