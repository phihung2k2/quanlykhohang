import React from "react";
import { useParams } from "react-router-dom";

import { logger } from "@/utils";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useMutationUpdateWorkout, useQueryWorkout } from "../api/api-workout";
import { InforWorkout } from "../widgets/detail/infor-workout";

export interface WorkoutPageProps {}

export const WorkoutPage: React.FC<WorkoutPageProps> = () => {
    const { id } = useParams();
    const { data } = useQueryWorkout(Number(id));
    logger().info("Workout", data);

    const { onUpdate } = useMutationUpdateWorkout();

    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: <InforWorkout data={data} />,
        },
    ];

    return (
        <DashboardViewDetail
            title={"Workout"}
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
