import React from "react";

import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryBills } from "../api";
import { useTableBill } from "../hooks/table/use-table-bills";

export interface BillsPageProps {}

export const BillsPage: React.FC<BillsPageProps> = () => {
    const { query, queryList } = useQueryBills();
    const { columns, rows } = useTableBill(query.data?.bills.items);

    return (
        <DashboardViewList title='Bill'>
            <TableCustom
                columns={columns}
                rows={rows}
                isPanigation
                panigationProps={{
                    page: queryList.paginate.page,
                    total: query.data?.bills.meta.totalPages,
                    onChange: queryList.setPage,
                }}
            />
        </DashboardViewList>
    );
};
