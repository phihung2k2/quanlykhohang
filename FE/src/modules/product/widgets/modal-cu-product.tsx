import React from "react";
import { Controller } from "react-hook-form";

import { SelectBasic } from "@/components";
import InputBasic from "@/components/input/input-basic";
import { statusOptions } from "@/configs/options";
import { FormCuView } from "@/widgets";

import { useQueryCategories } from "../api/api-category";
import { useFormCuProduct } from "../hooks/form/use-form-cu-product";
import { ProductEntity } from "../models";

export interface ModalCuProductProps extends Partial<ProductEntity> {}

export const ModalCuProduct: React.FC<ModalCuProductProps> = (props) => {
    const { form, onSubmit, create, update } = useFormCuProduct({ intProps: props });
    const { formState, register: registerForm, control } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    // options

    const { options } = useQueryCategories();

    return (
        <FormCuView
            title={title + " " + "Product"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            success={update.data?.updateProduct && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess
                        first='Created Category name:'
                        name={create.data?.createProduct.name}
                        to={"/app/products/detail/" + create.data?.createProduct.id}

                        // to={"detail/" + create.data?.createProduct.id}
                    />
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
                type={"number"}
                label='price'
                registration={registerForm("price", { valueAsNumber: true })}
                error={!!errors.price}
                errorText={errors.price?.message}
            />

            <InputBasic.Form
                type={"number"}
                label='quatity'
                registration={registerForm("quantity", { valueAsNumber: true })}
                error={!!errors.quantity}
                errorText={errors.quantity?.message}
            />

            <Controller
                control={control}
                name='categoryId'
                render={({ field: { onChange, ...restField } }) => {
                    return (
                        <SelectBasic
                            options={options}
                            label='Category'
                            {...(restField as any)}
                            onChange={(e) => {
                                onChange(Number(e));
                            }}
                            error={!!errors.categoryId}
                            errorText={errors.categoryId?.message}
                        />
                    );
                }}
            />
        </FormCuView>
    );
};
