import React from "react";
import { useParams } from "react-router-dom";

import { logger } from "@/utils";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useMutationUpdateProduct, useQueryProduct } from "../api";
import { ImageOnProduct } from "../widgets/detail/image-on-product";
import { InforProfuct } from "../widgets/detail/infor-profuct";

export interface ProductPageProps {}

export const ProductPage: React.FC<ProductPageProps> = () => {
    const { id } = useParams();

    const { data } = useQueryProduct(Number(id));

    logger().info("product", data);

    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: <InforProfuct data={data} />,
        },
        {
            label: "detail",
            children: data ? <ImageOnProduct data={data} /> : "",
        },
    ];

    const { onUpdate } = useMutationUpdateProduct();

    return (
        <DashboardViewDetail
            title={"Product"}
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
