import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { CellRowName, ColumnTableType } from "@/components";
import { CellRowAction } from "@/components/table/components/cell-row-action";
import { getRowsTable, getUriImageLow } from "@/utils";

import { BillProductItemEntity as Entity } from "../../models";
export function getRowBillDetail(item: Entity) {
    return {
        ...item,
    };
}

export type RowTableBillDetail = ReturnType<typeof getRowBillDetail>;

const getRow = getRowBillDetail;

type RowTable = RowTableBillDetail;

export const useTableBillDetail = (data?: Entity[]) => {
    const navigate = useNavigate();

    const columns: ColumnTableType<RowTable>[] = [
        {
            id: "name",
            label: "Product",
            renderCell(values) {
                return (
                    <CellRowName
                        thumbnail={values.thumbnail}
                        description={values.description}
                        name={values.name || ""}
                    />
                );
            },
            columnProps: { align: "start" },
        },
        {
            id: "detail",
            label: "Detail",
            renderCell(values) {
                return (
                    <p>
                        {values.unit_amount.value}USD x {values.quantity}
                    </p>
                );
            },
            columnProps: { align: "start" },
        },
        {
            id: "total",
            label: "Total",
            renderCell(values) {
                return <p>{values.quantity * values.unit_amount.value} USD</p>;
            },
            columnProps: { align: "start" },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRow), [data]);

    return { columns, rows };
};
