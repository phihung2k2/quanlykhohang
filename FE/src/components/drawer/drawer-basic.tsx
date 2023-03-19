import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { PropsWithChildren } from "react";

export interface DrawerBasicProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const DrawerBasic: React.FC<DrawerBasicProps> = ({ children, isOpen, onClose, title }) => {
    return (
        <main
            style={{ zIndex: 300 }}
            className={`fixed overflow-hidden !z-200 bg-blue-gray-200  bg-opacity-25 inset-0 transform ease-in-out ${
                isOpen
                    ? "transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  "
            }`}
        >
            <section
                className={` w-[300px] max-w-full left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ${
                    isOpen ? " translate-x-0 " : " translate-x-[-300px] "
                }`}
            >
                <article className='relative w-full pb-10 flex flex-col space-y-6 overflow-y-auto h-full'>
                    <div className='p-4'>
                        <header className='w-full flex justify-between mb-10 items-center'>
                            <h5>{title}</h5>
                            <button onClick={onClose}>
                                <XMarkIcon className='h-10 w-10' />
                            </button>
                        </header>
                        {children}
                    </div>
                </article>
            </section>
            <section className='w-screen h-full cursor-pointer ' onClick={onClose} />
        </main>
    );
};

export default DrawerBasic;
