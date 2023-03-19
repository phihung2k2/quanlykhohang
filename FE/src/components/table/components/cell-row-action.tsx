import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Popover } from "@nextui-org/react";
import React from "react";

import { IconButton } from "@/components/button/icon-button";
import { DeleteIcon } from "@/components/icon/delete-icon";
import { EditIcon } from "@/components/icon/edit-icon";
import { EyeIcon } from "@/components/icon/eye-icon";

export interface CellRowActionProps {
    onEdit?: () => void;
    onDetail?: () => void;
    onDelete?: () => void;
}

export const CellRowAction: React.FC<CellRowActionProps> = ({ onDelete, onDetail, onEdit }) => {
    const isNoAction = !onDelete && !onDetail && !onEdit;
    return (
        <div>
            <Popover placement='bottom-right'>
                <Popover.Trigger>
                    <EllipsisVerticalIcon className=' fill-primary-main w-8 h-8 cursor-pointer' />
                </Popover.Trigger>
                <Popover.Content className=' !z-[9997]'>
                    <div className=' flex space-x-8 p-2'>
                        {onDetail && (
                            <IconButton onClick={onDetail}>
                                <EyeIcon size={20} fill='#979797' />
                            </IconButton>
                        )}

                        {onEdit && (
                            <IconButton onClick={onEdit}>
                                <EditIcon size={20} fill='#979797' />
                            </IconButton>
                        )}
                        {onDelete && (
                            <IconButton onClick={onDelete}>
                                <DeleteIcon size={20} fill='#FF0080' />
                            </IconButton>
                        )}
                        {isNoAction && "No Action"}
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
