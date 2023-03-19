import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import React from "react";

import { useModalStore } from "@/app/provider/modal-provider";
import { TableCustom } from "@/components";

import { useQueryWorkouts } from "../../api/api-workout";
import { useTableWorkout } from "../../hooks/table/use-table-workout";
import { ModalCuWorkout } from "../modal";

export interface WorkoutOnProgramProps {
    programId: number;
}

export const WorkoutOnProgram: React.FC<WorkoutOnProgramProps> = ({ programId }) => {
    const { data } = useQueryWorkouts(programId);
    const { columns, rows } = useTableWorkout(data);
    const { modalOnOpen } = useModalStore();
    return (
        <div>
            <div className=' flex justify-end'>
                <Button
                    className=' !min-w-fit '
                    onClick={() => modalOnOpen(<ModalCuWorkout programIdCreate={programId} />)}
                >
                    <div className='justify-start flex items-center'>
                        <p className='hidden mobile:block pr-3'>Add Workout</p>
                        <PlusCircleIcon className=' fill-white h-6 w-6' />
                    </div>
                </Button>
            </div>
            <TableCustom columns={columns} rows={rows} />
        </div>
    );
};
