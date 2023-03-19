import { Button } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { Form } from "@/components";

export interface FormCuViewProps extends PropsWithChildren {
    title: string;
    buttonText: string;
    form: {
        form: unknown;
        onSubmit: unknown;
    };
    success?: string;
    error?: string;
    successChildren?: React.ReactNode;
}

interface Props {
    CreateSuccess: React.FC<{ first: string; name: string; to?: string }>;
}

export const FormCuView: React.FC<FormCuViewProps> & Props = ({
    successChildren,
    error,
    success,
    children,
    buttonText,
    title,
    form,
}) => {
    return (
        <div className=' w-full flex flex-col'>
            <div className='mb-5'>
                <h5 className=' text-center'>{title}</h5>
            </div>
            {successChildren ? (
                successChildren
            ) : (
                <div className='flex-1 overflow-y-auto max-h-[400px] pb-2'>
                    <Form {...(form as any)}>
                        <div className=' flex flex-col space-y-2'>{children}</div>
                    </Form>
                </div>
            )}
            {success && <p className='  text-green-500 text-[13px]'>{success}</p>}
            {error && <p className=' text-red-500 text-[13px]'>{error}</p>}
            {!successChildren && (
                <Button type='submit' form='form' className='mt-5'>
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

FormCuView.CreateSuccess = function ({ first, name, to }) {
    return (
        <div>
            <p>
                {first} {to ? <Link to={to}>{name}!</Link> : name}
            </p>
        </div>
    );
};
