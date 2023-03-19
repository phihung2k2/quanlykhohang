import dayjs from "dayjs";
import React from "react";

export interface CellRowDateProps {
    time: Date;
}

export const CellRowDate: React.FC<CellRowDateProps> = ({ time }) => {
    const date = dayjs(time).format("DD/MM/YYYY");

    const hour = dayjs(time).format("HH:mm:ss");

    return (
        <div className=' flex flex-col '>
            {date && <p className=' text-[15px] font-bold  leading-5'>{date}</p>}
            {hour && <p className=' text-[14px] leading-2'>{hour}</p>}
        </div>
    );
};
