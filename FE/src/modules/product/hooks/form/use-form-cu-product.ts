import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationCreateProduct, useMutationUpdateProduct } from "./../../api/index";

const productFormSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    price: z.number().min(0),
    quantity: z.number().min(0),
    categoryId: z.number(),
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

export const useFormCuProduct = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        name: props?.intProps?.name || "",
        description: props?.intProps?.description || "",
        price: props?.intProps?.price || 1,
        quantity: props?.intProps?.quantity || 0,
        categoryId: props?.intProps?.categoryId || (undefined as any),
    };

    const form = useFormWithSchema({
        schema: productFormSchema,
        options: {
            defaultValues,
        },
    });

    const { onCreate, mutation: create } = useMutationCreateProduct();
    const { onUpdate, mutation: update } = useMutationUpdateProduct();
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
