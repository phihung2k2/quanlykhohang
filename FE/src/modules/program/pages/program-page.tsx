import React from "react";
import { useParams } from "react-router-dom";

import { logger } from "@/utils";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useMutationUpdateProgram, useQueryProgram } from "../api";
import { InforProgram } from "../widgets/detail/infor-program";
import { WorkoutOnProgram } from "../widgets/detail/workout-on-program";

export interface ProgramPageProps {}

export const ProgramPage: React.FC<ProgramPageProps> = () => {
    const { id } = useParams();

    const { data } = useQueryProgram(Number(id));

    logger().info("product", data);

    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: data ? <InforProgram data={data} /> : "",
        },
        {
            label: "detail",
            children: id ? <WorkoutOnProgram programId={id ? Number(id) : 0} /> : "",
        },
    ];
    const { onUpdate } = useMutationUpdateProgram();

    return (
        <DashboardViewDetail
            title={"Program"}
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
