import React from "react";

import InputBasic from "@/components/input/input-basic";
import { FormCuView } from "@/widgets";

import { useFormCuType } from "../../hooks/form/use-form-cu-type";
import { TypeProgramEntity } from "../../models";

export interface ModalCuTypeProps extends Partial<TypeProgramEntity> {}

export const ModalCuType: React.FC<ModalCuTypeProps> = (props) => {
    const { form, onSubmit, create, update } = useFormCuType({ intProps: props });
    const { formState, register: registerForm } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    return (
        <FormCuView
            title={title + " " + "Program Type"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            success={update.data?.updateType && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess first='Created Category name:' name={create.data?.createType.name} />
                )
            }
        >
            <InputBasic.Form
                label='name'
                placeholder='type name'
                registration={registerForm("name")}
                error={!!errors.name}
                errorText={errors.name?.message}
            />
            <InputBasic.Form
                label='description'
                placeholder='type description'
                registration={registerForm("description")}
                error={!!errors.description}
                errorText={errors.description?.message}
            />
            <InputBasic.Form
                label='order'
                registration={registerForm("order", { valueAsNumber: true })}
                error={!!errors.order}
                errorText={errors.order?.message}
            />
        </FormCuView>
    );
};
