import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowDate, CellRowName, ColumnTableType } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { CellRowAction } from "@/components/table/components/cell-row-action";
import { getRowsTable } from "@/utils";

import { ForumEntity as Entity } from "../../models";
import { ConfirmForumDelete } from "../../widgets/confirm/confirm-delete";
import { ModalCuForum } from "../../widgets/modal/modal-cu-forum";
// import { ModalCuProduct } from "../../widgets";
// import { ConfirmProductDelete } from "../../widgets/confirm/confirm-delete";

export function getRowForum(item: Entity) {
    return {
        ...item,
    };
}

export type RowTableForum = ReturnType<typeof getRowForum>;

const getRow = getRowForum;

type RowTable = RowTableForum;

export const useTableForum = (data?: Entity[]) => {
    const { modalOnOpen } = useModalStore();
    const navigate = useNavigate();
    const columns: ColumnTableType<RowTable>[] = [
        {
            id: "name",
            label: "Name",
            renderCell(values) {
                return <CellRowName thumbnail={values.thumbnail} name={values.name} description={values.description} />;
            },
            columnProps: { align: "start", width: 400 },
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
                        onDelete={() => modalOnOpen(<ConfirmForumDelete {...values} />)}
                        onEdit={() => modalOnOpen(<ModalCuForum {...values} />)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRow), [data]);

    return { columns, rows };
};
