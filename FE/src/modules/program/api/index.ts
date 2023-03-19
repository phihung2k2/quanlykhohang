import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-toastify";

import { ListGqlResponseI, ListQueryI, UpdateDtoType } from "@/common";
import { FilterDateResultProps, useQueryList } from "@/hooks";
import { getListWidgetProps } from "@/utils";

import { ProgramCreateInputDtoI, ProgramEntity } from "./../models/index";
import { useFilterPrograms, UseFilterProgramsI } from "./use-filter-program";

// get all course
const programsGql = gql`
    query getAll($paginateInput: PaginateInput!, $queryListProgramInput: QueryListProgramInput!) {
        programs(paginateInput: $paginateInput, queryListProgramInput: $queryListProgramInput) {
            items {
                name
                id
                slug
                createdAt
                order
                thumbnail

                status
                description
                typeId
                type {
                    id
                    name
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

export const useQueryPrograms = () => {
    const queryList = useQueryList();
    const filter = useFilterPrograms();

    const query = useQuery<
        { programs: ListGqlResponseI<ProgramEntity> },
        {
            paginateInput: ListQueryI;
            queryListProgramInput: UseFilterProgramsI & FilterDateResultProps;
        }
    >(programsGql, {
        variables: {
            paginateInput: queryList.paginate,
            queryListProgramInput: { ...filter.filter },
        },
    });

    const listWidgetProps = getListWidgetProps(query.data?.programs, queryList, query);

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

export type UseQueryProgramsI = ReturnType<typeof useQueryPrograms>;

// create

const createGql = gql`
    mutation create($createProgramInput: CreateProgramInput!) {
        createProgram(createProgramInput: $createProgramInput) {
            id
            name
            description
        }
    }
`;

export const useMutationCreateProgram = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createProgram: ProgramEntity },
        { createProgramInput: ProgramCreateInputDtoI }
    >(createGql, {
        refetchQueries: [programsGql],
    });

    const onCreate = (createProgramInput: ProgramCreateInputDtoI) => {
        mutate({
            variables: {
                createProgramInput,
            },
            onCompleted() {
                toast.success("created program " + createProgramInput.name);
            },
            onError(error) {
                toast.error(error.message);
            },

            ...props,
        });
    };

    return { onCreate, mutation };
};

// updateGql

const updateGql = gql`
    mutation update($updateProgramInput: UpdateProgramInput!) {
        updateProgram(updateProgramInput: $updateProgramInput) {
            id
        }
    }
`;

export const useMutationUpdateProgram = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateProgram: ProgramEntity },
        { updateProgramInput: UpdateDtoType<ProgramCreateInputDtoI> }
    >(updateGql);

    const onUpdate = (updateProgramInput: UpdateDtoType<ProgramCreateInputDtoI>) => {
        mutate({
            variables: {
                updateProgramInput,
            },
            onCompleted(data) {
                toast.success("updated product " + data.updateProgram.name);
            },
            onError(error) {
                toast.error(error.message);
            },
            refetchQueries: [
                programsGql,
                {
                    query: programGql,
                    variables: { id: updateProgramInput.id },
                },
            ],
            ...props,
        });
    };

    return { onUpdate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeProgram(id: $id) {
            id
            name
        }
    }
`;

export const useMutationRemoveProgram = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeProgram: ProgramEntity }, { id: number }>(removeGql, {
        refetchQueries: [programsGql],
    });

    const onRemove = (id: number) => {
        mutate({
            variables: {
                id,
            },
            onCompleted(data) {
                toast.success("removed program " + data.removeProgram.name);
            },
            onError(error) {
                toast.error(error.message);
            },
            ...props,
        });
    };

    return { onRemove, mutation };
};

// find one

const programGql = gql`
    query getOne($id: Int!) {
        program(id: $id) {
            name
            id
            slug
            createdAt
            order
            thumbnail
            status
            description
            typeId
            type {
                id
                name
            }
            detail
        }
    }
`;

export const useQueryProgram = (id: number) => {
    const query = useQuery<{ program: ProgramEntity }, { id: number }>(programGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.program;

    return { query, data };
};
