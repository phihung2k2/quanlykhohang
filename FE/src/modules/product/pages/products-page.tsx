import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";
import { DashboardViewList } from "@/widgets";

import { useQueryProducts } from "../api";
import { useColumnProduct } from "../hooks/table/use-column-product";
import { ModalCuProduct } from "../widgets";

export interface ProductsPageProps {}

export const ProductsPage: React.FC<ProductsPageProps> = () => {
    const { query, filter, queryList } = useQueryProducts();

    const { columns, rows } = useColumnProduct(query.data?.products.data);

    const { modalOnOpen } = useModalStore();

    return (
        <DashboardViewList
            onSearchByName={filter.onChangeName}
            title='Product'
            buttonText='Add Product'
            onCreate={() => modalOnOpen(<ModalCuProduct />)}
            name='List Product'
        >
            <TableCustom
                columns={columns}
                rows={rows}
                isPanigation
                panigationProps={{
                    page: queryList.paginate.page,
                    total: query.data?.products.meta.total,
                    onChange: queryList.setPage,
                }}
            />
        </DashboardViewList>
    );
};
