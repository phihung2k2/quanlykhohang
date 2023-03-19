import React from "react";

import { ConfirmModal, FormCuView } from "@/widgets";

import { useMutationRemoveProduct } from "../../api";
import { useMutationRemoveCategory } from "../../api/api-category";
import { useMutationRemoveImageOnProduct } from "../../api/api-image-on-product";

export interface ConfirmCategoryDeleteProps {
    id: number;
    name: string;
}

export const ConfirmCategoryDelete: React.FC<ConfirmCategoryDeleteProps> = ({ id, name }) => {
    const { onRemove, mutation } = useMutationRemoveCategory();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id)}
            confirm={"You confirm delete category " + name}
            title='Delete confirm'
            successChildren={
                mutation.data && (
                    <FormCuView.CreateSuccess first='Deleted Category ' name={name} to={"/app/categorys"} />
                )
            }
        />
    );
};

export const ConfirmProductDelete: React.FC<ConfirmCategoryDeleteProps> = ({ id, name }) => {
    const { onRemove, mutation } = useMutationRemoveProduct();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id)}
            confirm={"You confirm delete product " + name}
            title='Delete confirm'
            successChildren={
                mutation.data && <FormCuView.CreateSuccess first='Deleted product ' name={name} to={"/app/products"} />
            }
        />
    );
};

export const ConfirmImageOnProductDelete: React.FC<ConfirmCategoryDeleteProps & { productId: number }> = ({
    id,

    productId,
}) => {
    const { onRemove, mutation } = useMutationRemoveImageOnProduct();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id, productId)}
            confirm={"You confirm delete image!"}
            title='Delete confirm'
            successChildren={mutation.data && <p>deleted image</p>}
        />
    );
};
