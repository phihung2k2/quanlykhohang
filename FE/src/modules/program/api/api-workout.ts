import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";

import { UpdateDtoType } from "@/common";

import { WorkoutCreateInputDtoI, WorkoutEntity } from "../models";

// workoutsGql

const workoutsGql = gql`
    query getAll($id: Int!) {
        workoutsByProgram(id: $id) {
            name
            thumbnail
            id
            slug
            order
            video
            description
            status
            programId
        }
    }
`;
export const useQueryWorkouts = (id?: number) => {
    const query = useQuery<{ workoutsByProgram: WorkoutEntity[] }>(workoutsGql, { variables: { id: id }, skip: !id });

    const data = query.data?.workoutsByProgram || [];

    return { query, data };
};

// create

const createGql = gql`
    mutation create($createWorkoutInput: CreateWorkoutInput!) {
        createWorkout(createWorkoutInput: $createWorkoutInput) {
            id
            name
            description
            order
            video
        }
    }
`;

export const useMutationCreateWorkout = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { createWorkout: WorkoutEntity },
        { createWorkoutInput: WorkoutCreateInputDtoI }
    >(createGql, {
        refetchQueries: [workoutsGql],
    });

    const onCreate = (createWorkoutInput: WorkoutCreateInputDtoI) => {
        mutate({
            variables: {
                createWorkoutInput: { ...createWorkoutInput },
            },

            ...props,
        });
    };

    return { onCreate, mutation };
};

// update

const updateGql = gql`
    mutation update($updateWorkoutInput: UpdateWorkoutInput!) {
        updateWorkout(updateWorkoutInput: $updateWorkoutInput) {
            id
        }
    }
`;

export const useMutationUpdateWorkout = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<
        { updateWorkout: WorkoutEntity },
        { updateWorkoutInput: UpdateDtoType<WorkoutCreateInputDtoI> }
    >(updateGql);

    const onUpdate = (updateWorkoutInput: UpdateDtoType<WorkoutCreateInputDtoI>) => {
        mutate({
            variables: {
                updateWorkoutInput,
            },
            refetchQueries: [
                workoutsGql,
                {
                    query: workoutGql,
                    variables: { id: updateWorkoutInput.id },
                },
            ],

            ...props,
        });
    };

    return { onUpdate, mutation };
};

// find one
const workoutGql = gql`
    query getOne($id: Int!) {
        workout(id: $id) {
            name
            thumbnail
            id
            slug
            order
            video
            description
            status
            programId
            program {
                id
                name
            }
            detail
        }
    }
`;

export const useQueryWorkout = (id: number) => {
    const query = useQuery<{ workout: WorkoutEntity }, { id: number }>(workoutGql, {
        variables: {
            id,
        },
        skip: !id,
    });

    const data = query.data?.workout;

    return { query, data };
};
