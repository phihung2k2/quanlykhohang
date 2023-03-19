import React from "react";

import InputBasic from "@/components/input/input-basic";
import { FormCuView } from "@/widgets";

import { useFormCuCategory } from "../hooks/form/use-form-cu-category";
import { CategoriesEntity } from "../models";

export interface ModalCuCategoryProps extends Partial<CategoriesEntity> {}

export const ModalCuCategory: React.FC<ModalCuCategoryProps> = (props) => {
    const { form, onSubmit, create, update } = useFormCuCategory({ intProps: props });
    const { formState, register: registerForm } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    return (
        <FormCuView
            title={title + " " + "Category"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            success={update.data?.updateCategory && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess first='Created Category name:' name={create.data?.createCategory.name} />
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
        </FormCuView>
    );
};
