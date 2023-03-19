import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { CellRowDate, CellRowName, ColumnTableType } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { CellRowAction } from "@/components/table/components/cell-row-action";
import { getRowsTable } from "@/utils";

import { BillEntity as Entity } from "../../models";
export function getRowBill(item: Entity) {
    return {
        ...item,
    };
}

export type RowTableForum = ReturnType<typeof getRowBill>;

const getRow = getRowBill;

type RowTable = RowTableForum;

export const useTableBill = (data?: Entity[]) => {
    const navigate = useNavigate();
    const columns: ColumnTableType<RowTable>[] = [
        {
            id: "orderId",
            label: "Order Paypal Id",

            columnProps: { align: "start", width: 400 },
        },
        {
            id: "name",
            label: "Name",
            renderCell(values) {
                const user = values.user;
                return (
                    <CellRowName
                        thumbnail={""}
                        description={user?.firstName + " " + user?.lastName}
                        name={user?.email || ""}
                    />
                );
            },
            columnProps: { align: "start" },
        },
        {
            id: "status",
            label: "Status",
            renderCell(values) {
                return <BadgeStyle type={values.status as any}>{values.status}</BadgeStyle>;
            },
            columnProps: { align: "center", width: 400 },
        },
        {
            id: "createdAt",
            label: "Created At",

            columnProps: { align: "start", width: 400 },

            renderCell(values) {
                return <CellRowDate time={values.createdAt} />;
            },
        },
        {
            id: "id",
            label: "",
            columnProps: { align: "end" },
            renderCell(values) {
                return <CellRowAction onDetail={() => navigate("detail/" + values.id)} />;
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRow), [data]);

    return { columns, rows };
};
