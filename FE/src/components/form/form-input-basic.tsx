import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React, { PropsWithChildren } from "react";

export interface FormInputBasicProps extends PropsWithChildren {
    label?: string;
    helperText?: string;
    errorText?: string;
    error?: boolean;
}

export const FormInputBasic: React.FC<FormInputBasicProps> = ({ label, helperText, error, errorText, children }) => {
    return (
        <div className='w-full'>
            {label && <label className={`block text-base mb-2 ${error ? "label-error" : ""}`}>{label}:</label>}
            <p className='text-helper'>{helperText}</p>
            {children}
            {error && errorText && (
                <div className='flex flex-row items-center space-x-2'>
                    <ExclamationTriangleIcon className='h-5 w-5 text-blue-500 fill-red-500' />
                    <p className='text-error'>{errorText}</p>
                </div>
            )}
        </div>
    );
};
