import React from "react";
import { Link } from "react-router-dom";

import InputBasic from "@/components/input/input-basic";

import { useFormRegister } from "../hooks/form/use-form-register";
import { AuthLayoutWidget } from "../widgets";

export interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
    const { form, onSubmit, mutation } = useFormRegister();
    const { formState, register: registerForm } = form;

    const { errors } = formState;
    return (
        <AuthLayoutWidget.View
            title='Register'
            description='Register to your account'
            footer={<Link to={"/auth/login"}>Login To App</Link>}
        >
            {mutation.data?.createUser ? (
                <div>Your was register success account {mutation.data?.createUser?.email}</div>
            ) : (
                <AuthLayoutWidget.Form button='register' form={{ form, onSubmit }} error={mutation.error?.message}>
                    <InputBasic.Form
                        label='firstName'
                        placeholder='type firstName'
                        registration={registerForm("firstname")}
                        error={!!errors.firstname}
                        errorText={errors.firstname?.message}
                    />
                    <InputBasic.Form
                        label='lastName'
                        placeholder='type lastName'
                        registration={registerForm("lastname")}
                        error={!!errors.lastname}
                        errorText={errors.lastname?.message}
                    />

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
                    <InputBasic.Form
                        type={"password"}
                        label='Confirm Password'
                        placeholder='type confirmPassword'
                        registration={registerForm("confirmPassword")}
                        error={!!errors.confirmPassword}
                        errorText={errors.confirmPassword?.message}
                    />
                </AuthLayoutWidget.Form>
            )}
        </AuthLayoutWidget.View>
    );
};
