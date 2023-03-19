import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationCreateType, useMutationUpdateType } from "../../api/api-type";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(4),
    order: z.number(),
});

type TForm = TypeOf<typeof formSchema>;

type UseForm = Partial<TForm> & { id?: number };

type UseFormProps = {
    intProps?: UseForm;
};

export const useFormCuType = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        name: props?.intProps?.name || "",
        description: props?.intProps?.description || "",
        order: props?.intProps?.order || 5,
    };

    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const id = props?.intProps?.id;

    const { onCreate, mutation: create } = useMutationCreateType();
    const { onUpdate, mutation: update } = useMutationUpdateType();

    const { dirtyFields } = form.formState;

    function onSubmit(values: TForm) {
        // loginApi(values);

        if (id) {
            const isEmptyCheck = isEmpty(dirtyFields);
            if (!isEmptyCheck) {
                logger().info("update type id " + id, values);

                const fieldsChange = dirtyValues(dirtyFields, values);

                onUpdate({ ...(fieldsChange as any), id });
            }
        } else {
            logger().info("create type", values);
            onCreate(values);
        }
    }

    return { form, onSubmit, create, update };
};
