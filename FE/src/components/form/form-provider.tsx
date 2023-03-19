import { ComponentProps, useEffect } from "react";
import { FieldNamesMarkedBoolean, FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

export const dirtyValues = <TFormValues extends FieldValues = FieldValues>(
    dirtyFields: FieldNamesMarkedBoolean<TFormValues>,
    allValues: TFormValues
): Partial<TFormValues> => {
    if (dirtyFields === true || Array.isArray(dirtyFields)) {
        return allValues;
    }

    return Object.fromEntries(
        Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])])
    ) as Partial<TFormValues>;
};

type FormProps<TFormValues extends FieldValues> = Omit<ComponentProps<"form">, "onSubmit"> & {
    className?: string;
    id?: string;

    form: UseFormReturn<TFormValues>;
    onSubmit: SubmitHandler<TFormValues>;
};

export const Form = <TFormValues extends FieldValues>({
    form,
    onSubmit,
    children,
    id,
    ...props
}: FormProps<TFormValues>) => {
    useEffect(
        () => () => {
            // reset on unmount
            form.clearErrors();
            form.reset();
        },
        [form]
    );

    return (
        <FormProvider {...form}>
            <form id={id ?? "form"} onSubmit={form.handleSubmit(onSubmit)} {...props}>
                {children}
            </form>
        </FormProvider>
    );
};
