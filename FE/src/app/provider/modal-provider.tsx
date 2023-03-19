import { Modal } from "@nextui-org/react";
import React, { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface ModalProviderProps extends PropsWithChildren {}

// base
export type ModalStateType = {
    isOpen: boolean;
    children: JSX.Element;
};

export interface ModalStore {
    modal: ModalStateType;
    isOpen: boolean;
    modalOnClose: (callback?: () => void) => void;
    close: () => void;
    modalOnOpen: (children: any, props?: any) => void;
    callbackOnClose: any;
}

const modal: ModalStateType = {
    isOpen: false,
    children: <div />,
};
export const useModalStore = create<ModalStore>()(
    devtools((set, get) => ({
        modal,
        isOpen: false,
        callbackOnClose: undefined,
        modalOnClose: (callback) => {
            set({ isOpen: false });
            if (get().callbackOnClose) {
                const hi = get().callbackOnClose;
                hi();
            }

            if (callback) {
                callback();
            }
        },
        close: () => {
            set({ modal });
        },
        modalOnOpen: (children: JSX.Element, callback?: () => void) => {
            set({ modal: { ...get().modal, children, isOpen: true }, isOpen: true, callbackOnClose: callback });
        },
    }))
);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children: childrenC }) => {
    const { modal, close } = useModalStore();
    const { pathname } = useLocation();
    const { children, isOpen } = modal;

    useEffect(() => {
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <React.Fragment>
            {childrenC}
            <Modal
                width='400px'
                className=' w-[90%] mobile:w-[100%] m-auto'
                closeButton
                aria-labelledby='accessibility'
                aria-label='dsad'
                open={isOpen}
                onClose={close}
            >
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </React.Fragment>
    );
};
