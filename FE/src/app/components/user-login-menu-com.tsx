import { Avatar, Button, Popover } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

import { imageUri } from "@/assets";
import { BadgeStyle } from "@/components/badge/badge-style";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useQueryProfile } from "@/modules/profile/api";
import { getUriImageLow } from "@/utils";

export interface UserLoginMenuComProps {}

export const UserLoginMenuCom: React.FC<UserLoginMenuComProps> = () => {
    const { onLogout } = useAuth();
    const { data } = useQueryProfile();

    return (
        <div>
            <Popover placement={"bottom-right"}>
                <Popover.Trigger>
                    <Avatar src={getUriImageLow("")} alt='avatar' text='Profile' />
                </Popover.Trigger>
                <Popover.Content>
                    <div className=' p-5'>
                        <Link to={"/app/profile"}>{data?.email}</Link>
                        <BadgeStyle type={data?.role as any}>{data?.role}</BadgeStyle>
                        <p>{data?.firstname + " " + data?.lastname}</p>
                        <Button onClick={onLogout}>logout</Button>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
