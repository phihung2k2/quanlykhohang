import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormProps as UseHookFormProps } from "react-hook-form";
import { useForm as useHookForm } from "react-hook-form";
import type { TypeOf, ZodSchema, ZodTypeDef } from "zod";

type UseFormProps<S extends ZodSchema<any, ZodTypeDef>> = {
    schema: S;
    options?: Omit<UseHookFormProps<TypeOf<S>>, "resolver">;
};
/**
 * @param UseFormProps with two properties: schema: Zod schema validations and options: UseFormProps from react-hook-form
 * @returns useForm with zod schema to pass props into <Form /> component
 * @example const form = useFormWithSchema({
 *    schema: loginFormSchema,
 *    options: {
 *    ...
 *    }
 * })
 *  const { register, formState } = form;
 *    <Form form={form} onSubmit={(values)=> {
 *      console.log(values)
 *    }}>
 *       <InputField label="Name" error={formState.errors.name} registration={register('name')} />
 *    </Form>
 */
export const useFormWithSchema = <S extends ZodSchema<any, ZodTypeDef>>({ schema, options }: UseFormProps<S>) =>
    useHookForm({
        ...options,
        resolver: zodResolver(schema),
    });
