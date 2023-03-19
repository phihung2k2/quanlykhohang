import { Avatar } from "@nextui-org/react";
import React from "react";

export interface NameDesInforProps {
    name: string;
    description: string;
    firstChildren?: React.ReactNode;
}

export interface NameDesInforAvatarProps extends Omit<NameDesInforProps, "firstChildren"> {
    thumbnail: string;
}

interface Props {
    Avatar: React.FC<NameDesInforAvatarProps>;
}

export const NameDesInfor: React.FC<NameDesInforProps> & Props = ({ firstChildren, name, description }) => {
    return (
        <div className=' flex space-x-2 '>
            {firstChildren}
            <div className=' flex flex-col space-y-0 '>
                <h5 className=' text-[14px] m-0 line-clamp-1'>{name}</h5>
                <p className=' text-[12px] line-clamp-1'>{description}</p>
            </div>
        </div>
    );
};

NameDesInfor.Avatar = function AvatarFunc(props) {
    return <NameDesInfor {...props} firstChildren={<Avatar squared src={props.thumbnail} text={props.name} />} />;
};
