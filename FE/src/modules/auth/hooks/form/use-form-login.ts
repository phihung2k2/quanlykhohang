import { TypeOf, z } from "zod";

import { useFormWithSchema } from "@/hooks";

import { useMutationLogin } from "../../api";

const formSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(4),
});

export type TLoginForm = TypeOf<typeof formSchema>;

const defaultValues: TLoginForm = {
    email: "",
    password: "",
};

export const useFormSignIn = () => {
    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const { onLogin, mutation } = useMutationLogin();

    function onSubmit(values: TLoginForm) {
        onLogin(values);
    }

    return { form, onSubmit, mutation };
};
