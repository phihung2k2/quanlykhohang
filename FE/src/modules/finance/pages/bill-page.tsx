import React from "react";
import { useParams } from "react-router-dom";

import { TableCustom } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { DashboardTabsProps, DashboardViewDetail } from "@/widgets";

import { useQueryBill } from "../api";
import { useTableBillDetail } from "../hooks/table/use-table-bill";
import { BillProductEntity } from "../models";

export interface BillPageProps {}

export const BillPage: React.FC<BillPageProps> = () => {
    const { id } = useParams();
    const { data } = useQueryBill(Number(id));

    const obj: BillProductEntity | null = data?.billProduct ? JSON.parse(data?.billProduct) : null;
    const { columns, rows } = useTableBillDetail(obj?.items || []);

    const bodys: DashboardTabsProps[] = [
        {
            label: "infor",
            children: <TableCustom columns={columns} rows={rows} />,
        },
    ];
    return (
        <DashboardViewDetail
            title={"Bill: " + data?.orderId}
            name={data?.user?.email || ""}
            description={data?.user?.firstName + " " + data?.user?.lastName}
            bodys={bodys}
            imageUri={data?.user?.avatar}
            childrenHeader={<BadgeStyle type={data?.status as any}> {data?.status} </BadgeStyle>}
            // onSave={(file) => {
            //     onUpdate({ id: Number(id), thumbnail: file });
            // }}
        />
    );
};
