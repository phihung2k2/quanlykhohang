import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

import { UserEntity } from "@/modules/user/models";

// get all course
const profileGql = gql`
    query {
        profile {
            email
            firstname
            lastname
            role
        }
    }
`;

export const useQueryProfile = () => {
    const query = useQuery<{ profile: UserEntity }>(profileGql);

    const data = query.data?.profile;

    return { query, data };
};

// updateGql

const updateGql = gql`
    mutation update($updateProfileInput: UpdateProfileInput!) {
        updateProfile(updateProfileInput: $updateProfileInput) {
            id
        }
    }
`;

export const useMutationUpdateProfile = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ updateProfile: UserEntity }, { updateProfileInput: Partial<UserEntity> }>(
        updateGql
    );

    const onUpdate = (updateProfileInput: Partial<UserEntity & { avatar?: File }>) => {
        mutate({
            variables: {
                updateProfileInput,
            },
            onCompleted: () => {
                toast.success("update profile success");
            },
            onError: (err) => {
                toast.error(err.message);
            },
            refetchQueries: [profileGql],
            ...props,
        });
    };

    return { onUpdate, mutation };
};
