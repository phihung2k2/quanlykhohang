import { TypeOf, z } from "zod";

import { useFormWithSchema } from "@/hooks";

import { useMutationRegister } from "./../../api/index";

const formSchema = z
    .object({
        email: z.string().email().min(1),
        password: z.string().min(6),
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"],
    });

export type TRegisterForm = TypeOf<typeof formSchema>;

const defaultValues: TRegisterForm = {
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
};

export const useFormRegister = () => {
    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const { onRegister, mutation } = useMutationRegister();

    function onSubmit(values: TRegisterForm) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...tValues } = values;
        onRegister(tValues);
    }

    return { form, onSubmit, mutation };
};
