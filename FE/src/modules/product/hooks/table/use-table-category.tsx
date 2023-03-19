import { useMemo } from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowAction, CellRowName, CellRowOrder, ColumnTableType } from "@/components";
import { getRowsTable } from "@/utils";

import { CategoriesEntity } from "../../models";
import { ModalCuCategory } from "../../widgets";
import { ConfirmCategoryDelete } from "../../widgets/confirm/confirm-delete";

export function getRowCategory(item: CategoriesEntity) {
    return {
        ...item,
    };
}

export type RowTableCategory = ReturnType<typeof getRowCategory>;

export const useTableCategory = (data?: CategoriesEntity[]) => {
    const { modalOnOpen } = useModalStore();

    const columns: ColumnTableType<RowTableCategory>[] = [
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
            columnProps: { align: "start", width: "20%" },
        },

        {
            id: "id",
            label: "",
            columnProps: { align: "end" },
            renderCell(values) {
                return (
                    <CellRowAction
                        onDelete={() => modalOnOpen(<ConfirmCategoryDelete {...values} />)}
                        onEdit={() => modalOnOpen(<ModalCuCategory {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowCategory), [data]);

    return { columns, rows };
};
