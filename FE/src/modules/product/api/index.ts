import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-toastify";

import { ListGqlResponseI, ListQueryI, UpdateDtoType } from "@/common";
import { FilterDateResultProps, useQueryList } from "@/hooks";
import { getListWidgetProps } from "@/utils";

import { ProductCreateInputDtoI, ProductEntity } from "./../models/index";
import { UseFilterListProductI, useFilterProducts } from "./use-filter-product";

// get all course
const productsGql = gql`
    query getAll($paginateInput: PaginateInput!, $queryListProductInput: QueryListProductInput!) {
        products(paginateInput: $paginateInput, queryListProductInput: $queryListProductInput) {
            data {
                name
                id
                createdAt
                price
                quantity
                description
                category {
                    id
                    name
                }
            }
            meta {
                currentPage
                total
                perPage

                total
            }
        }
    }
`;

export const useQueryProducts = () => {
    const queryList = useQueryList();
    const filter = useFilterProducts();

    const query = useQuery<
        { products: ListGqlResponseI<ProductEntity> },
        {
            paginateInput: ListQueryI;
            queryListProductInput: UseFilterListProductI & FilterDateResultProps;
        }
    >(productsGql, {
        variables: {
            paginateInput: queryList.paginate,
            queryListProductInput: { ...filter.filter },
        },
    });

    const listWidgetProps = getListWidgetProps(query.data?.products, queryList, query);

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

export type UseQueryProductsI = ReturnType<typeof useQueryProducts>;

// create

const createGql = gql`
    mutation create($createProductInput: CreateProductInput!) {
        createProduct(createProductInput: $createProductInput) {
            id
            name
            description
        }
    }
`;

export const useMutationCreateProduct = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createProduct: ProductEntity },
        { createProductInput: ProductCreateInputDtoI }
    >(createGql);

    const onCreate = (createProductInput: ProductCreateInputDtoI) => {
        mutate({
            variables: {
                createProductInput,
            },
            onCompleted() {
                toast.success("created product " + createProductInput.name);
            },
            onError(error) {
                toast.error(error.message);
            },
            refetchQueries: [productsGql],

            ...props,
        });
    };

    return { onCreate, mutation };
};

// updateGql

const updateGql = gql`
    mutation update($updateProductInput: UpdateProductInput!) {
        updateProduct(updateProductInput: $updateProductInput) {
            id
        }
    }
`;

export const useMutationUpdateProduct = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateProduct: ProductEntity },
        { updateProductInput: UpdateDtoType<ProductCreateInputDtoI> }
    >(updateGql);

    const onUpdate = (updateProductInput: UpdateDtoType<ProductCreateInputDtoI>) => {
        mutate({
            variables: {
                updateProductInput,
            },
            onCompleted(data) {
                toast.success("updated product " + data.updateProduct.name);
            },
            onError(error) {
                toast.error(error.message);
            },
            refetchQueries: [productsGql, { query: productGql, variables: { id: updateProductInput.id } }],
            ...props,
        });
    };

    return { onUpdate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeProduct(id: $id) {
            id
            name
        }
    }
`;

export const useMutationRemoveProduct = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeProduct: ProductEntity }, { id: number }>(removeGql, {
        refetchQueries: [productsGql],
    });

    const onRemove = (id: number) => {
        mutate({
            variables: {
                id,
            },
            onCompleted(data) {
                toast.success("removed product " + data.removeProduct.name);
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

export const productGql = gql`
    query getOne($id: Int!) {
        product(id: $id) {
            name
            id
            slug
            createdAt
            order
            thumbnail
            price
            quantity
            status
            description
            category {
                id
                name
            }
            categoryId
            detail
            images {
                id
                productId
                image
                createdAt
            }
        }
    }
`;

export const useQueryProduct = (id: number) => {
    const query = useQuery<{ product: ProductEntity }, { id: number }>(productGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.product;

    return { query, data };
};
