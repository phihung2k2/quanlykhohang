import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

import { Form, SelectBasic } from "@/components";
import { BadgeStyle } from "@/components/badge/badge-style";
import InputBasic from "@/components/input/input-basic";
import { UserEntity } from "@/modules/user/models";
import { DashboardViewDetail } from "@/widgets";

import { useMutationUpdateProfile, useQueryProfile } from "../api";
import { useFormProfile } from "../hooks/use-form-profile";

export interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = () => {
    const { data } = useQueryProfile();
    const { onUpdate } = useMutationUpdateProfile();

    return (
        <DashboardViewDetail
            title='My Profile'
            bodys={[]}
            name={data?.email || ""}
            description={data?.firstName + " " + data?.lastName}
            childrenHeader={<BadgeStyle type={data?.role as any}>{data?.role}</BadgeStyle>}
            imageUri={data?.avatar}
            onSave={(file) => onUpdate({ avatar: file as any })}
        >
            <div className=' border-t-2 py-7 mt-5'>
                <div className=' w-[400px] m-auto max-w-full'>{data && <FormProfile data={data} />}</div>
            </div>
        </DashboardViewDetail>
    );
};

const FormProfile: React.FC<{ data: UserEntity }> = ({ data }) => {
    const { form, onSubmit, update } = useFormProfile({ intProps: data as any });
    const { formState, register: registerForm, control } = form;

    const { errors } = formState;

    return (
        <Form form={form} onSubmit={onSubmit}>
            <InputBasic.Form
                label='firstName'
                placeholder='type firstName'
                registration={registerForm("firstName")}
                error={!!errors.firstName}
                errorText={errors.firstName?.message}
            />
            <InputBasic.Form
                label='lastName'
                placeholder='type lastName'
                registration={registerForm("lastName")}
                error={!!errors.lastName}
                errorText={errors.lastName?.message}
            />

            <Controller
                control={control}
                name='dob'
                render={({ field: { onChange, value, ...restField } }) => {
                    return (
                        <InputBasic.Form
                            type={"date"}
                            label='birth day'
                            placeholder='type dob'
                            onChange={(e) => onChange(e.target.value)}
                            defaultValue={dayjs(value).format("YYYY-MM-DD")}
                            {...restField}
                            error={!!errors.dob}
                            errorText={errors.dob?.message}
                        />
                    );
                }}
            />

            <Controller
                control={control}
                name='gender'
                render={({ field: { onChange, ...restField } }) => {
                    return (
                        <SelectBasic
                            options={[
                                { value: "men", label: "men" },
                                { value: "woman", label: "woman" },
                            ]}
                            label='Gender'
                            {...restField}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            error={!!errors.gender}
                            errorText={errors.gender?.message}
                        />
                    );
                }}
            />

            <InputBasic.Form
                label='address'
                placeholder='type address'
                registration={registerForm("address")}
                error={!!errors.address}
                errorText={errors.address?.message}
            />
            <InputBasic.Form
                type={"number"}
                label='Height'
                placeholder='type height'
                registration={registerForm("height", { valueAsNumber: true })}
                error={!!errors.height}
                errorText={errors.height?.message}
            />
            <InputBasic.Form
                type={"number"}
                label='weight'
                placeholder='type weight'
                registration={registerForm("weight", { valueAsNumber: true })}
                error={!!errors.weight}
                errorText={errors.weight?.message}
            />
            <div className=' w-full flex-col flex justify-center items-center mt-5'>
                <p>{update.data?.updateProfile && "update success"}</p>

                <Button type='submit' className=' w-full '>
                    SAVE
                </Button>
            </div>
        </Form>
    );
};
