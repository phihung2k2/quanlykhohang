import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { TypeOf, z } from "zod";

import { dirtyValues } from "@/components";
import { useFormWithSchema } from "@/hooks/index";
import { logger } from "@/utils";

import { useMutationUpdateProfile } from "./../api/index";

const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string(),
    dob: z.string(),
    height: z.number(),
    weight: z.number(),
    gender: z.string(),
});

type TForm = TypeOf<typeof formSchema>;

type UseForm = Partial<TForm> & { id?: number };

type UseFormProps = {
    intProps?: UseForm;
};

export const useFormProfile = (props?: UseFormProps) => {
    const defaultValues: TForm = {
        firstName: props?.intProps?.firstName || "",
        lastName: props?.intProps?.lastName || "",
        address: props?.intProps?.address || "",
        dob: props?.intProps?.dob || "",

        height: props?.intProps?.height || 170,
        weight: props?.intProps?.weight || 50,
        gender: props?.intProps?.gender || "men",
    };

    const form = useFormWithSchema({
        schema: formSchema,
        options: {
            defaultValues,
        },
    });

    const id = props?.intProps?.id;

    const { onUpdate, mutation: update } = useMutationUpdateProfile();

    const { dirtyFields } = form.formState;

    function onSubmit(values: TForm) {
        // loginApi(values);

        const isEmptyCheck = isEmpty(dirtyFields);
        if (!isEmptyCheck) {
            logger().info("update forum id " + id, values);

            const fieldsChange = dirtyValues(dirtyFields, values);

            const dob = fieldsChange.dob ? dayjs(fieldsChange.dob) : undefined;

            onUpdate({ ...(fieldsChange as any), dob });
        }
    }

    return { form, onSubmit, update };
};
