import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationCreateProgram, useMutationUpdateProgram } from "../../api";

const productFormSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    status: z.string(),
    order: z.number(),
    typeId: z.number(),
});

type TForm = TypeOf<typeof productFormSchema>;

type UseForm = Partial<TForm> & { id?: number };

// const defaultValues: TLoginForm = {
//     email: "",
//     password: "",
// };

type UseFormProps = {
    intProps?: UseForm;
};

export const useFormCuProgram = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        name: props?.intProps?.name || "",
        description: props?.intProps?.description || "",
        status: props?.intProps?.status || "ACTIVE",
        order: props?.intProps?.order || 10,
        typeId: props?.intProps?.typeId || (undefined as any),
    };

    const form = useFormWithSchema({
        schema: productFormSchema,
        options: {
            defaultValues,
        },
    });

    const { onCreate, mutation: create } = useMutationCreateProgram();
    const { onUpdate, mutation: update } = useMutationUpdateProgram();
    const id = props?.intProps?.id;

    const { dirtyFields } = form.formState;

    function onSubmit(values: TForm) {
        // loginApi(values);

        if (id) {
            const isEmptyCheck = isEmpty(dirtyFields);
            if (!isEmptyCheck) {
                logger().info("update category id " + id, values);

                const fieldsChange = dirtyValues(dirtyFields, values);

                onUpdate({ ...(fieldsChange as any), id });
            }
        } else {
            logger().info("create category", values);
            onCreate({ ...values });
        }
    }

    return { form, onSubmit, create, update };
};
