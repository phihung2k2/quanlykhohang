import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Button, FormElement, Input, Popover } from "@nextui-org/react";
import { useBoolean } from "ahooks";
import React, { useCallback, useRef, useState } from "react";

export interface CellRowOrderProps {
    order: number;
    onSetOrder?: (o: number) => void;
}

export const CellRowOrder: React.FC<CellRowOrderProps> = ({ order, onSetOrder }) => {
    const [orderS, setOrderS] = useState(order);

    const [popover, onPopover] = useBoolean();

    const inputRef: React.Ref<FormElement> = useRef(null);

    const handleSetOrder = useCallback(() => {
        const v = inputRef.current?.value;

        if (v) {
            setOrderS(Number(v));

            if (onSetOrder) {
                onSetOrder(Number(v));
            }
        }

        onPopover.setFalse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className=' flex justify-center space-x-4 items-center'>
            <h5>{orderS}</h5>
            <Popover placement={"bottom-right"} isOpen={popover} onClose={onPopover.setFalse}>
                <Popover.Trigger>
                    <Button auto bordered className=' !px-2' onClick={onPopover.setTrue}>
                        <PencilIcon className=' h-5 w-5' />
                    </Button>
                </Popover.Trigger>
                <Popover.Content>
                    <div className=' p-5 flex space-x-2 w-fit'>
                        <Input width='50px' ref={inputRef} placeholder={orderS.toString()} />

                        <Button auto className='!px-2' onClick={handleSetOrder}>
                            <CheckCircleIcon className=' h-5 w-5 fill-white' />
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
