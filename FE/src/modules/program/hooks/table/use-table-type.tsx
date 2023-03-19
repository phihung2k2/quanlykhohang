import { useMemo } from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowAction, CellRowName, CellRowOrder, ColumnTableType } from "@/components";
import { getRowsTable } from "@/utils";

import { TypeProgramEntity } from "../../models";
import { ModalCuType } from "../../widgets";
import { ConfirmTypeDelete } from "../../widgets/confirm/confirm-delete";

export function getRowType(item: TypeProgramEntity) {
    return {
        ...item,
    };
}

export type RowTableType = ReturnType<typeof getRowType>;

export const useTableType = (data?: TypeProgramEntity[]) => {
    const { modalOnOpen } = useModalStore();

    const columns: ColumnTableType<RowTableType>[] = [
        {
            id: "name",
            label: "Name",
            renderCell(values) {
                return <CellRowName thumbnail={""} name={values.name} description={values.description} />;
            },
            columnProps: { align: "start", width: "60%" },
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
            id: "id",
            label: "",
            columnProps: { align: "end" },
            renderCell(values) {
                return (
                    <CellRowAction
                        onDelete={() => modalOnOpen(<ConfirmTypeDelete {...values} />)}
                        onEdit={() => modalOnOpen(<ModalCuType {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowType), [data]);

    return { columns, rows };
};
