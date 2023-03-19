import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryPrograms } from "../api";
import { useTableProgram } from "../hooks/table/use-table-program";
import { ModalCuProgram } from "../widgets";

export interface ProgramsPageProps {}

export const ProgramsPage: React.FC<ProgramsPageProps> = () => {
    const { query, filter, queryList } = useQueryPrograms();
    const { columns, rows } = useTableProgram(query.data?.programs.items);
    const { modalOnOpen } = useModalStore();

    return (
        <DashboardViewList
            onSearchByName={filter.onChangeName}
            title='Program'
            name='List Program'
            onCreate={() => modalOnOpen(<ModalCuProgram />)}
            buttonText='Add Program'
        >
            <TableCustom
                columns={columns}
                rows={rows}
                isPanigation
                panigationProps={{
                    page: queryList.paginate.page,
                    total: query.data?.programs.meta.totalPages,
                    onChange: queryList.setPage,
                }}
            />
        </DashboardViewList>
    );
};
