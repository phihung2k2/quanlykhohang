import React from "react";

import { ConfirmModal, FormCuView } from "@/widgets";

import { useMutationRemoveProgram } from "../../api";
import { useMutationRemoveType } from "../../api/api-type";

export interface ConfirmDeleteProps {
    id: number;
    name: string;
}

export const ConfirmTypeDelete: React.FC<ConfirmDeleteProps> = ({ id, name }) => {
    const { onRemove, mutation } = useMutationRemoveType();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id)}
            confirm={"You confirm delete category " + name}
            title='Delete confirm'
            successChildren={
                mutation.data && (
                    <FormCuView.CreateSuccess first='Deleted Category ' name={name} to={"/app/type-program"} />
                )
            }
        />
    );
};

export const ConfirmProgramDelete: React.FC<ConfirmDeleteProps> = ({ id, name }) => {
    const { onRemove, mutation } = useMutationRemoveProgram();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id)}
            confirm={"You confirm delete program " + name}
            title='Delete confirm'
            successChildren={
                mutation.data && <FormCuView.CreateSuccess first='Deleted program ' name={name} to={"/app/products"} />
            }
        />
    );
};
