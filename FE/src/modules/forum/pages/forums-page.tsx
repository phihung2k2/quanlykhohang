import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryForums } from "../api";
import { useTableForum } from "../hooks/table/use-table-forum";
import { ModalCuForum } from "../widgets/modal/modal-cu-forum";

export interface ForumsPageProps {}

export const ForumsPage: React.FC<ForumsPageProps> = () => {
    const { query, filter, queryList } = useQueryForums();

    const { columns, rows } = useTableForum(query.data?.forums.items);
    const { modalOnOpen } = useModalStore();
    return (
        <DashboardViewList
            onSearchByName={filter.onChangeName}
            name='List Forums'
            title='Forum'
            buttonText='Add Forum'
            onCreate={() => modalOnOpen(<ModalCuForum />)}
        >
            <TableCustom
                columns={columns}
                rows={rows}
                isPanigation
                panigationProps={{
                    page: queryList.paginate.page,
                    total: query.data?.forums.meta.totalPages,
                    onChange: queryList.setPage,
                }}
            />
        </DashboardViewList>
    );
};
