import React from "react";

import { ConfirmModal, FormCuView } from "@/widgets";

import { useMutationRemoveForum } from "../../api";

export interface ConfirmCategoryDeleteProps {
    id: number;
    name: string;
}

export const ConfirmForumDelete: React.FC<ConfirmCategoryDeleteProps> = ({ id, name }) => {
    const { onRemove, mutation } = useMutationRemoveForum();

    return (
        <ConfirmModal
            error={mutation.error?.message}
            onConfirm={() => onRemove(id)}
            confirm={"You confirm delete forum " + name}
            title='Delete confirm'
            successChildren={
                mutation.data && <FormCuView.CreateSuccess first='Deleted forum ' name={name} to={"/app/forums"} />
            }
        />
    );
};

// export const ConfirmProductDelete: React.FC<ConfirmCategoryDeleteProps> = ({ id, name }) => {
//     const { onRemove, mutation } = useMutationRemoveProduct();

//     return (
//         <ConfirmModal
//             error={mutation.error?.message}
//             onConfirm={() => onRemove(id)}
//             confirm={"You confirm delete product " + name}
//             title='Delete confirm'
//             successChildren={
//                 mutation.data && <FormCuView.CreateSuccess first='Deleted product ' name={name} to={"/app/products"} />
//             }
//         />
//     );
// };
