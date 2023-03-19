import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";

import { ListGqlResponseI, ListQueryI, UpdateDtoType } from "@/common";
import { FilterDateResultProps, useQueryList } from "@/hooks";
import { getListWidgetProps } from "@/utils";

import { ForumCreateInputDtoI, ForumEntity } from "./../models/index";
import { useFilterForums, UseFilterForumsI } from "./filter-forum";

// get all course
const forumsGql = gql`
    query getAll($paginateInput: PaginateInput!, $queryListForumInput: QueryListForumInput!) {
        forums(paginateInput: $paginateInput, queryListForumInput: $queryListForumInput) {
            items {
                name
                id
                slug
                createdAt
                thumbnail
                status
                description
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

export const useQueryForums = () => {
    const queryList = useQueryList();
    const filter = useFilterForums();

    const query = useQuery<
        { forums: ListGqlResponseI<ForumEntity> },
        {
            paginateInput: ListQueryI;
            queryListForumInput: UseFilterForumsI & FilterDateResultProps;
        }
    >(forumsGql, {
        variables: {
            paginateInput: queryList.paginate,
            queryListForumInput: { ...filter.filter },
        },
    });

    const listWidgetProps = getListWidgetProps(query.data?.forums, queryList, query);

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

export type UseQueryForumsI = ReturnType<typeof useQueryForums>;

// create

const createGql = gql`
    mutation create($createForumInput: CreateForumInput!) {
        createForum(createForumInput: $createForumInput) {
            id
            name
            description
        }
    }
`;

export const useMutationCreateForum = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ createForum: ForumEntity }, { createForumInput: ForumCreateInputDtoI }>(
        createGql,
        {
            refetchQueries: [forumsGql],
        }
    );

    const onCreate = (createForumInput: ForumCreateInputDtoI) => {
        mutate({
            variables: {
                createForumInput,
            },
            ...props,
        });
    };

    return { onCreate, mutation };
};

// updateGql

const updateGql = gql`
    mutation update($updateForumInput: UpdateForumInput!) {
        updateForum(updateForumInput: $updateForumInput) {
            id
        }
    }
`;

export const useMutationUpdateForum = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateForum: ForumEntity },
        { updateForumInput: UpdateDtoType<ForumCreateInputDtoI> }
    >(updateGql);

    const onUpdate = (updateForumInput: UpdateDtoType<ForumCreateInputDtoI>) => {
        mutate({
            variables: {
                updateForumInput,
            },
            refetchQueries: [forumsGql],
            ...props,
        });
    };

    return { onUpdate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeForum(id: $id) {
            id
            name
        }
    }
`;

export const useMutationRemoveForum = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeForum: ForumEntity }, { id: number }>(removeGql, {
        refetchQueries: [forumsGql],
    });

    const onRemove = (id: number) => {
        mutate({
            variables: {
                id,
            },

            ...props,
        });
    };

    return { onRemove, mutation };
};

// find one

const forumGql = gql`
    query getOne($id: Int!) {
        forum(id: $id) {
            name
            id
            slug
            createdAt
            thumbnail
            status
            description
            detail
        }
    }
`;

export const useQueryForum = (id: number) => {
    const query = useQuery<{ forum: ForumEntity }, { id: number }>(forumGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.forum;

    return { query, data };
};
