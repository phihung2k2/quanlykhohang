import { Button, Card, CardBody } from "@material-tailwind/react";
import React, { PropsWithChildren, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { imageUri } from "@/assets";
import { Form } from "@/components";

export interface AuthLayoutWidgetProps {}

type Props = {
    View: React.FC<PropsWithChildren & { title: string; description: string; footer?: React.ReactNode }>;

    Form: React.FC<
        PropsWithChildren & {
            form: {
                form: unknown;
                onSubmit: unknown;
            };
            successChildren?: React.ReactNode;
            button: string;
            success?: string;
            error?: string;
        }
    >;
};

export const AuthLayoutWidget: React.FC<AuthLayoutWidgetProps> & Props = () => {
    return (
        <div className=' flex justify-center w-full h-full items-center'>
            <Card className='w-[400px] max-w-[90%] py-10'>
                <CardBody>
                    {/* logo */}
                    <div className='grid place-content-center mb-10'>
                        <img src={imageUri.logos.main_logo} className='cursor-pointer' />
                    </div>
                    {/* body */}
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </CardBody>
            </Card>
        </div>
    );
};

AuthLayoutWidget.View = function View({ children, title, description, footer }) {
    return (
        <div className='w-full flex flex-col space-y-2'>
            <div className=' text-center'>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className='w-full flex flex-col space-y-2 py-5'>{children}</div>

            {footer && <div className='mt-10'>{footer}</div>}
        </div>
    );
};

AuthLayoutWidget.Form = function View({ children, successChildren, form, button, success, error }) {
    return (
        <div className='w-full flex flex-col space-y-2'>
            {successChildren ? (
                successChildren
            ) : (
                <div className='flex-1 overflow-y-auto max-h-[500px] pb-2'>
                    <Form {...(form as any)}>
                        <div className=' flex flex-col space-y-2'>{children}</div>
                    </Form>
                </div>
            )}
            <div className='pt-5' />
            {success && <p className='  text-green-500 text-[13px]'>{success}</p>}
            {error && <p className=' text-red-500 text-[13px]'>{error}</p>}
            <Button fullWidth className=' text-lg' type='submit' form='form'>
                {button}
            </Button>
        </div>
    );
};
