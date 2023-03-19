import React from "react";
import { Controller } from "react-hook-form";

import { SelectBasic } from "@/components";
import InputBasic from "@/components/input/input-basic";
import { statusOptions } from "@/configs/options";
import { FormCuView } from "@/widgets";

import { useQueryTypes } from "../../api/api-type";
import { useFormCuProgram } from "../../hooks/form/use-form-cu-program";
import { ProgramEntity } from "../../models";

export interface ModalCuProgramProps extends Partial<ProgramEntity> {}

export const ModalCuProgram: React.FC<ModalCuProgramProps> = (props) => {
    const { form, onSubmit, create, update } = useFormCuProgram({ intProps: props });
    const { formState, register: registerForm, control } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    // options

    const { options } = useQueryTypes();
    return (
        <FormCuView
            title={title + " " + "Program"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            success={update.data?.updateProgram && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess
                        first='Created Program name:'
                        name={create.data?.createProgram.name}
                        to={"/app/programs/detail/" + create.data?.createProgram.id}
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
                label='order'
                registration={registerForm("order", { valueAsNumber: true })}
                error={!!errors.order}
                errorText={errors.order?.message}
            />

            <Controller
                control={control}
                name='typeId'
                render={({ field: { onChange, ...restField } }) => {
                    return (
                        <SelectBasic
                            options={options}
                            label='Type'
                            {...(restField as any)}
                            onChange={(e) => {
                                onChange(Number(e));
                            }}
                            error={!!errors.typeId}
                            errorText={errors.typeId?.message}
                        />
                    );
                }}
            />

            <Controller
                control={control}
                name='status'
                render={({ field: { onChange, ...restField } }) => {
                    return (
                        <SelectBasic
                            options={statusOptions}
                            label='Status'
                            {...restField}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            error={!!errors.status}
                            errorText={errors.status?.message}
                        />
                    );
                }}
            />
        </FormCuView>
    );
};
