import React from "react";
import { Controller } from "react-hook-form";

import { SelectBasic } from "@/components";
import InputBasic from "@/components/input/input-basic";
import { statusOptions } from "@/configs/options";
import { FormCuView } from "@/widgets";

import { useFormCuForum } from "../../hooks/form/use-cu-form-forum";
import { ForumEntity } from "../../models";

export interface ModalCuForumProps extends Partial<ForumEntity> {}

export const ModalCuForum: React.FC<ModalCuForumProps> = (props) => {
    const { form, onSubmit, create, update } = useFormCuForum({ intProps: props });
    const { formState, register: registerForm, control } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    return (
        <FormCuView
            title={title + " " + "Forum"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            success={update.data?.updateForum && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess
                        first='Created Forum name:'
                        name={create.data?.createForum.name}
                        to={"/app/forums/detail/" + create.data?.createForum.id}
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
