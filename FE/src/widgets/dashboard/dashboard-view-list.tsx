import { AdjustmentsHorizontalIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, FormElement, Input, Loading } from "@nextui-org/react";
import { useBoolean } from "ahooks";
import { debounce } from "lodash";
import React, { PropsWithChildren } from "react";

import DrawerBasic from "@/components/drawer/drawer-basic";

export interface DashboardViewListProps extends PropsWithChildren {
    title: string;
    buttonText?: string;

    onSearchByName?: (e: string) => void;
    loading?: boolean;
    name?: string;
    onCreate?: () => void;
    filter?: React.ReactNode;
}

export interface DashboardModalProps {
    title: string;
    children?: React.ReactNode;
}

export interface DashboardViewListRefProps {
    onClose: () => void;
}

export const DashboardViewList: React.FC<DashboardViewListProps> = ({
    children,
    title,
    buttonText,
    onSearchByName,
    loading,
    name,
    onCreate,
    filter,
}) => {
    const [drawer, onDrawer] = useBoolean(false);
    // ref

    const onSearchDebounce = onSearchByName
        ? debounce((e: React.ChangeEvent<FormElement>) => {
              onSearchByName(e.target.value);
          }, 1000)
        : undefined;
    return (
        <div className='w-full h-full'>
            {/* MODAL */}

            <DrawerBasic isOpen={drawer} onClose={onDrawer.setFalse}>
                dsads
            </DrawerBasic>

            <div className=' w-full flex h-full'>
                {filter && <div className=' w-[300px] bg-red-400 hidden desktop:block'>filter</div>}{" "}
                <div className=' w-full flex-1 flex justify-center'>
                    {/* body */}

                    <div className=' !max-w-full w-[1200px] flex flex-col'>
                        {/* header */}
                        <div className=' flex justify-between items-center '>
                            <h4 className='text-small-header-res'>{title}</h4>
                            <div>
                                {onCreate && (
                                    <Button className=' !min-w-fit ' onClick={onCreate}>
                                        <div className='justify-start flex items-center'>
                                            {buttonText && <p className='hidden mobile:block pr-3'>{buttonText}</p>}
                                            <PlusCircleIcon className=' fill-white h-6 w-6' />
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </div>
                        {/* title */}
                        <div className=' flex  items-center space-x-2'>
                            {filter && (
                                <AdjustmentsHorizontalIcon
                                    onClick={onDrawer.setTrue}
                                    className=' w-5 h-5 fill-red-300 cursor-pointer'
                                />
                            )}

                            <h5 className='m-0'>{name}</h5>
                        </div>

                        {onSearchDebounce && (
                            <div className=' my-5 pt-2'>
                                <Input
                                    onChange={onSearchDebounce}
                                    clearable
                                    bordered
                                    color='primary'
                                    labelPlaceholder='Search'
                                    contentRight={loading && <Loading size='xs' />}
                                    fullWidth
                                />
                            </div>
                        )}
                        {/* children */}
                        <div className='px-2 desktop:px-2 w-full  flex-1 overflow-y-auto overflow-x-visible'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
