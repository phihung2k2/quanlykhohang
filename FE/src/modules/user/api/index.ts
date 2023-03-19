import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";

import { ListGqlResponseI, ListQueryI } from "@/common";
import { FilterDateResultProps, useQueryList } from "@/hooks";
import { getListWidgetProps } from "@/utils";

import { UserEntity } from "./../models/index";
import { useFilterUsers, UseFilterUsersI } from "./filter-user";

// get all course
const usersGql = gql`
    query getAll($paginateInput: PaginateInput!, $queryListUserInput: QueryListUserInput!) {
        users(paginateInput: $paginateInput, queryListUserInput: $queryListUserInput) {
            data {
                email
                id
                createdAt
                status
                role
                firstname
                lastname
            }
            meta {
                currentPage
                lastPage
                total
            }
        }
    }
`;

export const useQueryUsers = () => {
    const queryList = useQueryList();
    const filter = useFilterUsers();

    const query = useQuery<
        { users: ListGqlResponseI<UserEntity> },
        {
            paginateInput: ListQueryI;
            queryListUserInput: UseFilterUsersI & FilterDateResultProps;
        }
    >(usersGql, {
        variables: {
            paginateInput: queryList.paginate,
            queryListUserInput: { ...filter.filter },
        },
    });

    const listWidgetProps = getListWidgetProps(query.data?.users, queryList, query);

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

export type UseQueryUsersI = ReturnType<typeof useQueryUsers>;

// find one

const userGql = gql`
    query getOne($id: Int!) {
        user(id: $id) {
            id
            email
            firstname
            lastname
            role
        }
    }
`;

export const useQueryUser = (id: number) => {
    const query = useQuery<{ user: UserEntity }, { id: number }>(userGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.user;

    return { query, data };
};
