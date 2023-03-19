import dayjs from "dayjs";
import React from "react";

import { NameInfor } from "@/components/item/infor/name-infor";
import { DashboardViewDetail } from "@/widgets";

import { UserEntity } from "../../models";

export interface InforUserProps {
    data?: UserEntity;
}

export const InforUser: React.FC<InforUserProps> = ({ data }) => {
    return (
        <DashboardViewDetail.Body
            first={
                <DashboardViewDetail.Paper title='Infor'>
                    <NameInfor name={"Birthday"} value={dayjs(data?.dob).format("YYYY-MM-DD")} />
                    <NameInfor name={"Address"} value={data?.address} />
                    <NameInfor name={"Height"} value={data?.height} />
                    <NameInfor name={"Weight"} value={data?.weight} />
                </DashboardViewDetail.Paper>
            }
        />
    );
};
