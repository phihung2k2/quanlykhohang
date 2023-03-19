import React from "react";

export interface NameInforProps {
    name: string;
    value?: unknown;
    render?: (v: any) => React.ReactNode;
}

export const NameInfor: React.FC<NameInforProps> = ({ name, value, render }) => {
    return (
        <div className='flex flex-col mb-2'>
            <h5 className=' m-0'>{name}:</h5>
            {render ? <div>{render(value)}</div> : <p>{value?.toString()}</p>}
        </div>
    );
};
