import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryTypes } from "../api/api-type";
import { useTableType } from "../hooks/table/use-table-type";
import { ModalCuType } from "../widgets";

export interface TypesPageProps {}

export const TypesPage: React.FC<TypesPageProps> = () => {
    const { modalOnOpen } = useModalStore();

    const { data } = useQueryTypes();

    const { columns, rows } = useTableType(data);

    return (
        <DashboardViewList
            title='Type Program'
            buttonText='Add Type'
            onCreate={() => modalOnOpen(<ModalCuType />)}
            name='List Type'
        >
            <TableCustom columns={columns} rows={rows} />
        </DashboardViewList>
    );
};
