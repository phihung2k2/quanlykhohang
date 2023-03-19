import React from "react";

import { NameDesInfor, NameDesInforAvatarProps } from "@/components/item";
import { getUriImageLow } from "@/utils";

export interface CellRowNameProps extends NameDesInforAvatarProps {}

export const CellRowName: React.FC<CellRowNameProps> = (props) => {
    return (
        <div className=' w-full flex'>
            <NameDesInfor.Avatar {...props} thumbnail={getUriImageLow(props.thumbnail)} />
        </div>
    );
};
