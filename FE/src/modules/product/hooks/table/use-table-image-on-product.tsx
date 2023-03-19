import { useMemo } from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowAction, ColumnTableType } from "@/components";
import { getRowsTable, getUriImageLow } from "@/utils";

import { ImageOnProductEntity } from "../../models";
import { ConfirmImageOnProductDelete } from "../../widgets/confirm/confirm-delete";

export function getRowImageOnProduct(item: ImageOnProductEntity) {
    return {
        ...item,
    };
}

export type RowTableImageOnProduct = ReturnType<typeof getRowImageOnProduct>;

export const useTableImageOnProduct = (data?: ImageOnProductEntity[]) => {
    const { modalOnOpen } = useModalStore();

    const columns: ColumnTableType<RowTableImageOnProduct>[] = [
        {
            id: "id",
            label: "ID",
        },
        {
            id: "image",
            label: "Name",
            columnProps: { align: "start", width: "60%" },
            renderCell: (values) => (
                <div>
                    <img src={getUriImageLow(values.image)} className=' w-[200px] aspect-square' />
                </div>
            ),
        },

        {
            id: "",
            label: "",
            columnProps: { align: "end" },
            renderCell(values) {
                return (
                    <CellRowAction
                        onDelete={() => modalOnOpen(<ConfirmImageOnProductDelete name={values.image} {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowImageOnProduct), [data]);

    return { columns, rows };
};
