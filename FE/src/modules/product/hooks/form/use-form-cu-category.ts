import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationCreateCategory, useMutationUpdateCategory } from "../../api/api-category";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(4),
});

type TForm = TypeOf<typeof formSchema>;

type UseForm = Partial<TForm> & { id?: number };

type UseFormProps = {
    intProps?: UseForm;
};

export const useFormCuCategory = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        name: props?.intProps?.name || "",
        description: props?.intProps?.description || "",
    };

    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const id = props?.intProps?.id;

    const { onCreate, mutation: create } = useMutationCreateCategory();
    const { onUpdate, mutation: update } = useMutationUpdateCategory();

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
            onCreate(values);
        }
    }

    return { form, onSubmit, create, update };
};
