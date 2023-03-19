import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useModalStore } from "@/app/provider/modal-provider";
import { CellRowAction, CellRowDate, CellRowName, CellRowOrder, ColumnTableType } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import { getRowsTable, getUriImageLow } from "@/utils";

import { UserEntity } from "../models";

export function getRowUser(item: UserEntity) {
    return {
        ...item,
    };
}

export type RowTableUser = ReturnType<typeof getRowUser>;

export const useTableUser = (data?: UserEntity[]) => {
    const { modalOnOpen } = useModalStore();
    const navigate = useNavigate();

    const columns: ColumnTableType<RowTableUser>[] = [
        {
            id: "name",
            label: "Name",
            renderCell(values) {
                return (
                    <CellRowName
                        thumbnail={""}
                        description={values.firstname + " " + values.lastname}
                        name={values.email}
                    />
                );
            },
            columnProps: { align: "start", width: "60%" },
        },
        {
            id: "role",
            label: "Role",
            renderCell(values) {
                return <BadgeStyle type={values.role as any}>{values.role}</BadgeStyle>;
            },
            columnProps: { align: "start" },
        },
        // {
        //     id: "status",
        //     label: "Status",
        //     renderCell(values) {
        //         return <BadgeStyle type={values.status as any}>{values.status}</BadgeStyle>;
        //     },
        //     columnProps: { align: "center" },
        // },
        {
            id: "createdAt",
            label: "Created At",

            columnProps: { align: "start" },

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
                    // onDelete={() => modalOnOpen(<ConfirmCategoryDelete {...values} />)}
                    // onEdit={() => modalOnOpen(<ModalCuCategory {...values} />)}\
                    // onDetail={() => navigate("/app/user/detail/" + values.id)}
                    />
                );
            },
        },
    ];

    const rows = useMemo(() => getRowsTable(data, getRowUser), [data]);

    return { columns, rows };
};
