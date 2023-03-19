import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { authByFirebase } from "@/app/provider/firebase";
import InputBasic from "@/components/input/input-basic";

import { useFormSignIn } from "../hooks/form/use-form-login";
import { AuthLayoutWidget } from "../widgets";

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
    const { form, onSubmit, mutation } = useFormSignIn();
    const { formState, register: registerForm } = form;

    const { errors } = formState;

    return (
        <AuthLayoutWidget.View
            title='Login'
            description='Access to your account'
            footer={<Link to={"/auth/register"}>Register Account?</Link>}
        >
            <AuthLayoutWidget.Form button='Login' form={{ form, onSubmit }} error={mutation.error?.message}>
                <InputBasic.Form
                    label='Email'
                    placeholder='type email'
                    registration={registerForm("email")}
                    error={!!errors.email}
                    errorText={errors.email?.message}
                />
                <InputBasic.Form
                    type={"password"}
                    label='Password'
                    placeholder='type password'
                    registration={registerForm("password")}
                    error={!!errors.password}
                    errorText={errors.password?.message}
                />
            </AuthLayoutWidget.Form>
        </AuthLayoutWidget.View>
    );
};
