import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowDate, CellRowName, ColumnTableType } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { CellRowAction } from "@/components/table/components/cell-row-action";
import { getRowsTable } from "@/utils";

import { ProgramEntity } from "../../models";
import { ModalCuProgram } from "../../widgets";
import { ConfirmProgramDelete } from "../../widgets/confirm/confirm-delete";
// import { ModalCuProduct } from "../../widgets";
// import { ConfirmProductDelete } from "../../widgets/confirm/confirm-delete";

export function getRowProgram(item: ProgramEntity) {
    return {
        ...item,
    };
}

export type RowTableProduct = ReturnType<typeof getRowProgram>;

export const useTableProgram = (data?: ProgramEntity[]) => {
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
            id: "order",
            label: "Order",
            // renderCell(values) {
            //     return <CellRowOrder order={values.order} />;
            // },
            columnProps: { align: "center" },
        },
        {
            id: "type",
            label: "Type",
            renderCell(values) {
                return <p>{values.type.name}</p>;
            },
            columnProps: { align: "center", width: "20%" },
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
                return (
                    <CellRowAction
                        onDetail={() => navigate("detail/" + values.id)}
                        onDelete={() => modalOnOpen(<ConfirmProgramDelete {...values} />)}
                        onEdit={() => modalOnOpen(<ModalCuProgram {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowProgram), [data]);

    return { columns, rows };
};
