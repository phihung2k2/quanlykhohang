import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";

import { UpdateDtoType } from "@/common";

import { CategoriesCreateInputDtoI, CategoriesEntity } from "../models";

// categoriesGql

const categoriesGql = gql`
    query {
        categories {
            name
            id
            description
        }
    }
`;

export const useQueryCategories = () => {
    const query = useQuery<{ categories: CategoriesEntity[] }>(categoriesGql);

    const data = query.data?.categories;

    const options = query.data
        ? query.data.categories.map((item) => {
              return { value: item.id, label: item.name };
          })
        : [];

    return { query, data, options };
};

// create

const createGql = gql`
    mutation create($createCategoryInput: CreateCategoryInput!) {
        createCategory(createCategoryInput: $createCategoryInput) {
            id
            name
            description
        }
    }
`;

export const useMutationCreateCategory = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createCategory: CategoriesEntity },
        { createCategoryInput: CategoriesCreateInputDtoI }
    >(createGql, {
        refetchQueries: [categoriesGql],
    });

    const onCreate = (createCategoryInput: CategoriesCreateInputDtoI) => {
        mutate({
            variables: {
                createCategoryInput,
            },

            ...props,
        });
    };

    return { onCreate, mutation };
};

// updateGql

const updateGql = gql`
    mutation update($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            id
        }
    }
`;

export const useMutationUpdateCategory = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateCategory: CategoriesEntity },
        { updateCategoryInput: UpdateDtoType<CategoriesCreateInputDtoI> }
    >(updateGql, {
        refetchQueries: [categoriesGql],
    });

    const onUpdate = (updateCategoryInput: UpdateDtoType<CategoriesCreateInputDtoI>) => {
        mutate({
            variables: {
                updateCategoryInput,
            },
            refetchQueries: [categoriesGql],
            ...props,
        });
    };

    return { onUpdate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeCategory(id: $id) {
            id
            name
        }
    }
`;

export const useMutationRemoveCategory = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeCategory: CategoriesEntity }, { id: number }>(removeGql, {
        refetchQueries: [categoriesGql],
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
