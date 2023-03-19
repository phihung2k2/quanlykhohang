import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationCreateForum, useMutationUpdateForum } from "./../../api/index";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(4),
    status: z.string().min(1),
});

type TForm = TypeOf<typeof formSchema>;

type UseForm = Partial<TForm> & { id?: number };

type UseFormProps = {
    intProps?: UseForm;
};

export const useFormCuForum = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        name: props?.intProps?.name || "",
        description: props?.intProps?.description || "",
        status: props?.intProps?.status || "ACTIVE",
    };

    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const id = props?.intProps?.id;

    const { onCreate, mutation: create } = useMutationCreateForum();
    const { onUpdate, mutation: update } = useMutationUpdateForum();

    const { dirtyFields } = form.formState;

    function onSubmit(values: TForm) {
        // loginApi(values);

        if (id) {
            const isEmptyCheck = isEmpty(dirtyFields);
            if (!isEmptyCheck) {
                logger().info("update forum id " + id, values);

                const fieldsChange = dirtyValues(dirtyFields, values);

                onUpdate({ ...(fieldsChange as any), id });
            }
        } else {
            logger().info("create forum", values);
            onCreate(values);
        }
    }

    return { form, onSubmit, create, update };
};
