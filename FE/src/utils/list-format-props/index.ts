import { QueryResult } from "@apollo/client";

import { ListGqlResponseI } from "@/common/models";
import { UseQueryListType } from "@/hooks";

export function getListWidgetProps<T>(
    data: ListGqlResponseI<T> | undefined,
    queryList: UseQueryListType,
    query: QueryResult<any, any>
) {
    if (!data) {
        return {};
    } else {
        return {
            data: data.items,
            totalPage: data.meta.totalPages,
            totalResults: data.meta.totalItems,
            onChangePage: queryList.setPage,
            onRefeatch: () => query.refetch(),
            onChangeCreateAt: queryList.onChangeCreateAt,
            sortCreateAt: queryList.paginate.createAt,
            page: queryList.paginate.page,
        };
    }
}

export type GetListWidgetPropsType = Omit<ReturnType<typeof getListWidgetProps>, "data">;

export type OrderByCreateAtType = Pick<ReturnType<typeof getListWidgetProps>, "onChangeCreateAt" | "sortCreateAt">;
