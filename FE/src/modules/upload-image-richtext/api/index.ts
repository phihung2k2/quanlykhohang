import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

import { getListImageOnRichText } from "../func/get-list-image-on-richtext";
import { ContentFolderEnum, ListImageOnRichtextI } from "../models";

// upload
const uploadImageOnRichtextGql = gql`
    mutation uploadImageOnRichtext($id: Int!, $folder: String!, $image: Upload!) {
        uploadImageOnRichtext(id: $id, folder: $folder, image: $image)
    }
`;

export const useMutationUploadImageOnRichtex = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutation, dataMutation] = useMutation<
        { uploadImageOnRichtext: string },
        { id: number; folder: ContentFolderEnum; image: File }
    >(uploadImageOnRichtextGql);

    const onMutation = (id: number, folder: ContentFolderEnum, image: File) => {
        return mutation({
            variables: {
                id,
                folder,
                image,
            },

            ...props,
        });
    };

    return { onMutation, dataMutation };
};

// remove

const removeImageOnRichtextGql = gql`
    mutation removeImageOnRichtext($name: String!) {
        removeImageOnRichtext(name: $name)
    }
`;
export const useMutationRemoveImageOnRichtext = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [remove, dataRemove] = useMutation<{ removeImageOnRichtext: string }, { name: string }>(
        removeImageOnRichtextGql
    );

    const onRemove = (name: string, id?: number, folder?: ContentFolderEnum) => {
        toast.info("removing image");
        const isRefetch = id && folder;
        remove({
            variables: {
                name,
            },
            onCompleted(data) {
                toast.success("Image " + data.removeImageOnRichtext + " removed");
            },
            onError(error) {
                toast.error(error.message);
            },
            refetchQueries: isRefetch
                ? [
                      {
                          query: getImagesOnRichtextGql,
                          variables: {
                              id,
                              folder,
                          },
                      },
                  ]
                : undefined,
            ...props,
        });
    };

    return { onRemove, dataRemove };
};

// query list image rich text

const getImagesOnRichtextGql = gql`
    query getImagesOnRichtext($id: Int!, $folder: String!) {
        getImagesOnRichtext(id: $id, folder: $folder) {
            resources {
                public_id
            }
        }
    }
`;

export const useQueryImagesOnRichtext = (id: number, folder: ContentFolderEnum) => {
    const query = useQuery<{ getImagesOnRichtext: ListImageOnRichtextI }, { id: number; folder: ContentFolderEnum }>(
        getImagesOnRichtextGql,
        {
            variables: {
                id,
                folder,
            },
        }
    );

    const data = query.data?.getImagesOnRichtext;

    const listImage = data ? getListImageOnRichText(data.resources) : [];

    return { query, data, listImage };
};
