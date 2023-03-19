import React from "react";

import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryUsers } from "../api";
import { useTableUser } from "../hooks/use-table-user";

export interface UsersPageProps {}

export const UsersPage: React.FC<UsersPageProps> = () => {
    const { query, queryList, filter } = useQueryUsers();
    const { columns, rows } = useTableUser(query.data?.users.data);

    return (
        <DashboardViewList
            onSearchByName={filter.onChangeName}
            title='User'
            buttonText='Register User'
            name='List User'
        >
            <TableCustom
                columns={columns}
                rows={rows}
                isPanigation
                panigationProps={{
                    page: queryList.paginate.page,
                    total: query.data?.users.meta.total,
                    onChange: queryList.setPage,
                }}
            />
        </DashboardViewList>
    );
};
