import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useBoolean } from "ahooks";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FormInputBasic, FormInputBasicProps } from "../form/form-input-basic";

type TRegistration = Partial<UseFormRegisterReturn>;

export interface InputBasicProps extends React.InputHTMLAttributes<HTMLInputElement> {
    registration?: TRegistration;
    error?: boolean;
}

const InputBasic: React.FC<InputBasicProps> & { Form: React.FC<FormInputBasicProps & InputBasicProps> } = ({
    registration,
    error,
    ...props
}) => {
    const [eye, onEye] = useBoolean(false);

    const isPassword = props.type === "password";

    function getPaddingPassword() {
        return isPassword ? "pr-12 " : "";
    }

    function borderError() {
        return error ? "border-red-400" : "border-gray-300";
    }

    return (
        <div className='relative'>
            <input
                className={` text-base bg-gray-50 mb-2 border ${borderError()} text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  ${getPaddingPassword()}`}
                {...props}
                type={eye ? "text" : props.type}
                {...registration}
            />

            {isPassword && (
                <button type='button' className='absolute top-2 right-3' onClick={onEye.toggle}>
                    {eye ? (
                        <EyeSlashIcon className='h-5 w-5  fill-gray-700 hover:fill-gray-500' />
                    ) : (
                        <EyeIcon className='h-5 w-5  fill-gray-dark-700 hover:fill-gray-500' />
                    )}
                </button>
            )}
        </div>
    );
};

export default InputBasic;

InputBasic.Form = function Form({ label, helperText, error, errorText, ...props }) {
    return (
        <FormInputBasic label={label} helperText={helperText} error={error} errorText={errorText}>
            <InputBasic {...props} error={error} />
        </FormInputBasic>
    );
};
