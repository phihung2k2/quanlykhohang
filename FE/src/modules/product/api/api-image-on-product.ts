import { gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { CreateImageInput, ImageOnProductEntity } from "../models";
import { productGql } from ".";

// create

const createGql = gql`
    mutation create($createImageInput: CreateImageInput!) {
        createImage(createImageInput: $createImageInput) {
            id
            image
        }
    }
`;

export const useMutationCreateImageOnProduct = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createImage: ImageOnProductEntity },
        { createImageInput: CreateImageInput }
    >(createGql);

    const onCreate = (createImageInput: CreateImageInput) => {
        mutate({
            variables: {
                createImageInput,
            },
            onCompleted(data) {
                toast.success("created image " + data.createImage.image);
            },
            onError(error) {
                toast.error(error.message);
            },
            refetchQueries: [{ query: productGql, variables: { id: createImageInput.productId } }],
            ...props,
        });
    };

    return { onCreate, mutation };
};

// remove

const removeGql = gql`
    mutation remove($id: Int!) {
        removeImage(id: $id) {
            id
            productId
        }
    }
`;

export const useMutationRemoveImageOnProduct = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ removeImage: ImageOnProductEntity }, { id: number }>(removeGql);

    const onRemove = (id: number, productId: number) => {
        mutate({
            variables: {
                id,
            },
            refetchQueries: [
                {
                    query: productGql,
                    variables: { id: productId },
                },
            ],

            onCompleted() {
                toast.success("delete image success");
            },

            ...props,
        });
    };

    return { onRemove, mutation };
};
