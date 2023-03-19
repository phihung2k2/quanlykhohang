import React from "react";
import { useParams } from "react-router-dom";

import { BadgeStyle } from "@/components/badge/badge-style";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useQueryUser } from "../api";
import { InforUser } from "../widgets/detail/infor-user";

export interface UserPageProps {}

export const UserPage: React.FC<UserPageProps> = () => {
    const { id } = useParams();

    const { data } = useQueryUser(Number(id));
    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: <InforUser data={data} />,
        },
    ];
    return (
        <DashboardViewDetail
            title={"User"}
            name={data?.email || ""}
            description={data?.firstName + " " + data?.lastName}
            bodys={bodys}
            imageUri={data?.avatar}
            childrenHeader={<BadgeStyle type={data?.role as any}>{data?.role}</BadgeStyle>}
        />
    );
};
