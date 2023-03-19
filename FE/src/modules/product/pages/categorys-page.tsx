import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryCategories } from "../api/api-category";
import { useTableCategory } from "../hooks/table/use-table-category";
import { ModalCuCategory, ModalCuProduct } from "../widgets";

export interface CategorysPageProps {}

export const CategorysPage: React.FC<CategorysPageProps> = () => {
    const { data } = useQueryCategories();

    const { columns, rows } = useTableCategory(data);

    const { modalOnOpen } = useModalStore();

    return (
        <DashboardViewList
            title='Category'
            buttonText='Add Category'
            onCreate={() => modalOnOpen(<ModalCuCategory />)}
            name='List Category'
        >
            <TableCustom columns={columns} rows={rows} />
        </DashboardViewList>
    );
};
