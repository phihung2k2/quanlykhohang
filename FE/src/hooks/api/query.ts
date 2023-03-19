import { useCallback, useState } from "react";

import { ListQueryI } from "@/common/models";

export interface UseQueryListI {
    perPage?: number;
    createAt?: "asc" | "desc";
}

export const useQueryList = (int?: UseQueryListI) => {
    const perPage = int?.perPage || 10;

    const createAt = int?.createAt || "asc";

    const [paginate, setPaginate] = useState<ListQueryI>({ page: 1, perPage, createAt });

    const setPage = useCallback(
        (page: number) => {
            setPaginate({
                page,
                perPage,
                createAt,
            });
        },
        [createAt, perPage]
    );

    const onNextPage = useCallback(() => {
        setPaginate({
            page: paginate.page + 1,
            perPage,
            createAt,
        });
    }, [createAt, paginate.page, perPage]);

    const onPrePage = useCallback(() => {
        if (paginate.page > 1) {
            return setPaginate({
                page: paginate.page - 1,
                perPage,
                createAt,
            });
        } else {
            return;
        }
    }, [createAt, paginate.page, perPage]);

    const onFirstPage = useCallback(() => {
        return setPaginate({
            page: 1,
            perPage,
            createAt,
        });
    }, [createAt, perPage]);

    const onAscPage = useCallback(() => {
        return setPaginate({
            ...paginate,
            createAt: "asc",
        });
    }, [paginate]);

    const onDescPage = useCallback(() => {
        return setPaginate({
            ...paginate,
            createAt: "desc",
        });
    }, [paginate]);

    const onChangeCreateAt = useCallback(() => {
        const createAtData = paginate.createAt === "asc" ? "desc" : "asc";
        return setPaginate({
            ...paginate,
            createAt: createAtData,
        });
    }, [paginate]);

    return {
        paginate,
        setPaginate,
        setPage,
        onNextPage,
        onPrePage,
        onFirstPage,
        onDescPage,
        onAscPage,
        onChangeCreateAt,
    };
};

export type UseQueryListType = ReturnType<typeof useQueryList>;
