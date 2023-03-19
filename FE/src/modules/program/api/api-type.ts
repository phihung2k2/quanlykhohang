import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";

import { UpdateDtoType } from "@/common";

import { TypeProgramCreateInputDtoI, TypeProgramEntity } from "../models";

// subjects

const typesGql = gql`
    query {
        types {
            name
            id
            slug
            order
            description
        }
    }
`;
export const useQueryTypes = () => {
    const query = useQuery<{ types: TypeProgramEntity[] }>(typesGql);

    const data = query.data?.types;

    const options = query.data
        ? query.data.types.map((item) => {
              return { value: item.id, label: item.name };
          })
        : [];

    return { query, data, options };
};

// create

const createGql = gql`
    mutation create($createTypeInput: CreateTypeInput!) {
        createType(createTypeInput: $createTypeInput) {
            id
            name
            description
            order
        }
    }
`;

export const useMutationCreateType = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createType: TypeProgramEntity },
        { createTypeInput: TypeProgramCreateInputDtoI }
    >(createGql, {
        refetchQueries: [typesGql],
    });

    const onCreate = (createTypeInput: TypeProgramCreateInputDtoI) => {
        mutate({
            variables: {
                createTypeInput,
            },

            ...props,
        });
    };

    return { onCreate, mutation };
};

// updateGql

const updateGql = gql`
    mutation update($updateTypeInput: UpdateTypeInput!) {
        updateType(updateTypeInput: $updateTypeInput) {
            id
        }
    }
`;

export const useMutationUpdateType = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateType: TypeProgramEntity },
        { updateTypeInput: UpdateDtoType<TypeProgramCreateInputDtoI> }
    >(updateGql);

    const onUpdate = (updateTypeInput: UpdateDtoType<TypeProgramCreateInputDtoI>) => {
        mutate({
            variables: {
                updateTypeInput,
            },
            refetchQueries: [typesGql],
            ...props,
        });
    };

    return { onUpdate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeType(id: $id) {
            id
            name
        }
    }
`;

export const useMutationRemoveType = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeType: TypeProgramEntity }, { id: number }>(removeGql, {
        refetchQueries: [typesGql],
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
