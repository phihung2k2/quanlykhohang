import React from "react";
import { useParams } from "react-router-dom";

import { logger } from "@/utils";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useMutationUpdateForum, useQueryForum } from "../api";
import { InforForum } from "../widgets/detail/infor-forum";

export interface ForumPageProps {}

export const ForumPage: React.FC<ForumPageProps> = () => {
    const { id } = useParams();

    const { data } = useQueryForum(Number(id));
    logger().info("ForumPage", data);

    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: <InforForum data={data} />,
        },
    ];
    const { onUpdate } = useMutationUpdateForum();

    return (
        <DashboardViewDetail
            title={"Forum"}
            name={data?.name || ""}
            description={data?.description}
            bodys={bodys}
            imageUri={data?.thumbnail}
            onSave={(file) => {
                onUpdate({ id: Number(id), thumbnail: file });
            }}
        />
    );
};
