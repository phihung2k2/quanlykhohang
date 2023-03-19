import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";

import { ListGqlResponseI, ListQueryI } from "@/common";
import { FilterDateResultProps, useQueryList } from "@/hooks";
import { getListWidgetProps } from "@/utils";

import { BillEntity } from "./../models/index";
import { useFilterBills, UseFilterBillsI } from "./filter";

// get all course
const billsGql = gql`
    query getAll($paginateInput: PaginateInput!, $queryListBillInput: QueryListBillInput!) {
        bills(paginateInput: $paginateInput, queryListBillInput: $queryListBillInput) {
            items {
                id
                billProduct
                createdAt
                userId
                status
                billInfo
                orderId
                user {
                    id
                    email
                    firstName
                    lastName
                }
            }
            meta {
                currentPage
                totalPages
                itemsPerPage
                itemCount
                totalItems
            }
        }
    }
`;

export const useQueryBills = () => {
    const queryList = useQueryList();
    const filter = useFilterBills();

    const query = useQuery<
        { bills: ListGqlResponseI<BillEntity> },
        {
            paginateInput: ListQueryI;
            queryListBillInput: UseFilterBillsI & FilterDateResultProps;
        }
    >(billsGql, {
        variables: {
            paginateInput: queryList.paginate,
            queryListBillInput: { ...filter.filter },
        },
    });

    const listWidgetProps = getListWidgetProps(query.data?.bills, queryList, query);

    const onSearchByName = useCallback(
        (e: any) => {
            filter.onChangeName(e);
            queryList.onFirstPage();
        },
        [filter, queryList]
    );

    const onFilterByDate = useCallback(
        (e: FilterDateResultProps) => {
            filter.setFilterDate(e);
            queryList.onFirstPage();
        },
        [filter, queryList]
    );

    const onSearch = () => {
        filter.onSearch();
        queryList.onFirstPage();
    };

    const headerSearchProps = { onSearchByName };

    const filterListProps = { onSearch, filter };

    return {
        query,
        queryList,
        filter,
        listWidgetProps,
        onSearchByName,
        onFilterByDate,
        headerSearchProps,
        filterListProps,
        onSearch,
    };
};

export type UseQueryForumsI = ReturnType<typeof useQueryBills>;

// create

// find one

const billGql = gql`
    query getOne($id: Int!) {
        bill(id: $id) {
            id
            billProduct
            createdAt
            userId
            status
            billInfo
            orderId
            user {
                id
                email
                firstName
                lastName
                avatar
            }
        }
    }
`;

export const useQueryBill = (id: number) => {
    const query = useQuery<{ bill: BillEntity }, { id: number }>(billGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.bill;

    return { query, data };
};
