import React from "react";
import { Controller } from "react-hook-form";

import { SelectBasic } from "@/components";
import InputBasic from "@/components/input/input-basic";
import { statusOptions } from "@/configs/options";
import { FormCuView } from "@/widgets";

import { useFormCuWorkout } from "../../hooks/form/use-form-workout";
import { WorkoutEntity } from "../../models";

export interface ModalCuWorkoutProps extends Partial<WorkoutEntity> {
    programIdCreate: number;
}

export const ModalCuWorkout: React.FC<ModalCuWorkoutProps> = ({ programIdCreate, ...props }) => {
    const { form, onSubmit, create, update } = useFormCuWorkout(programIdCreate, { intProps: props });
    const { formState, register: registerForm, control } = form;

    const { errors } = formState;

    const title = props.id ? "Update" : "Create";
    // options

    return (
        <FormCuView
            title={title + " " + "Workout"}
            buttonText={props.id ? "UPDATE" : "CREATE"}
            form={{ form, onSubmit }}
            error={create.error?.message || update.error?.message}
            // success={update.data?.updateProgram && "update success"}
            successChildren={
                create.data && (
                    <FormCuView.CreateSuccess
                        first='Created Program name:'
                        name={create.data?.createWorkout.name}
                        to={"/app/programs/workout/detail/" + create.data?.createWorkout.id}
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
                label='video'
                placeholder='type video link'
                registration={registerForm("video")}
                error={!!errors.video}
                errorText={errors.video?.message}
            />

            <InputBasic.Form
                label='order'
                registration={registerForm("order", { valueAsNumber: true })}
                error={!!errors.order}
                errorText={errors.order?.message}
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
