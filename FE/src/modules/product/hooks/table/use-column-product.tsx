import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowDate, CellRowName, CellRowOrder, ColumnTableType } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { CellRowAction } from "@/components/table/components/cell-row-action";
import { getRowsTable } from "@/utils";

import { ProductEntity } from "../../models";
import { ModalCuProduct } from "../../widgets";
import { ConfirmProductDelete } from "../../widgets/confirm/confirm-delete";

export function getRowProduct(item: ProductEntity) {
    return {
        ...item,
    };
}

export type RowTableProduct = ReturnType<typeof getRowProduct>;

export const useColumnProduct = (data?: ProductEntity[]) => {
    const { modalOnOpen } = useModalStore();
    const navigate = useNavigate();
    const columns: ColumnTableType<RowTableProduct>[] = [
        {
            id: "name",
            label: "Name",
            renderCell(values) {
                return <CellRowName thumbnail={values.thumbnail} name={values.name} description={values.description} />;
            },
            columnProps: { align: "start", width: 400 },
        },

        {
            id: "price",
            label: "Price",
            // renderCell(values) {
            //     return <CellRowOrder order={values.order} />;
            // },
            columnProps: { align: "center", width: 200 },
        },
        {
            id: "quantity",
            label: "Quantity",
            // renderCell(values) {
            //     return <CellRowOrder order={values.order} />;
            // },
            columnProps: { align: "center", width: 100 },
        },
        {
            id: "category",
            label: "Category",
            renderCell(values) {
                return <p>{values.category.name}</p>;
            },
            columnProps: { align: "center" },
        },

        {
            id: "createdAt",
            label: "Created At",

            columnProps: { align: "start", width: 200 },

            renderCell(values) {
                return <CellRowDate time={values.createdAt} />;
            },
        },
        {
            id: "id",
            label: "",
            columnProps: { align: "end" },
            renderCell(values) {
                return (
                    <CellRowAction
                        onDetail={() => navigate("detail/" + values.id)}
                        onDelete={() => modalOnOpen(<ConfirmProductDelete {...values} />)}
                        onEdit={() => modalOnOpen(<ModalCuProduct {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowProduct), [data]);

    return { columns, rows };
};
