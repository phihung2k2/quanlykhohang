import { Button } from "@nextui-org/react";
import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";

export interface ConfirmModalProps {
    title: string;
    success?: string;
    error?: string;
    successChildren?: React.ReactNode;
    buttonText?: string;
    confirm: string;
    onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    confirm,
    buttonText,
    title,
    error,
    success,
    successChildren,
    onConfirm,
}) => {
    const { close } = useModalStore();
    return (
        <div className=' flex flex-col w-full '>
            <div className='mb-5'>
                <h5 className=' text-center'>{title}</h5>
            </div>
            <div>{successChildren || <p>{confirm}?</p>}</div>

            {success && <p className='  text-green-500 text-[13px]'>{success}</p>}
            {error && <p className=' text-red-500 text-[13px]'>{error}</p>}
            {!successChildren && (
                <div className=' flex justify-center space-x-[40%] mt-5'>
                    <Button onClick={close} className=' !min-w-fit !bg-gray-500 '>
                        Cancel
                    </Button>
                    <Button className=' !min-w-fit ' onClick={onConfirm}>
                        {buttonText || "Delete"}
                    </Button>
                </div>
            )}
        </div>
    );
};
