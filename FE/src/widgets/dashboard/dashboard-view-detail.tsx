import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardBody,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    // Popover,
    // PopoverContent,
    // PopoverHandler,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import React, { PropsWithChildren } from "react";

import { AvatarUpload, AvatarUploadProps } from "@/components/avatar/avatar-upload";
import { getUriImageLow } from "@/utils";

import { DashboardViewList, DashboardViewListProps } from "./dashboard-view-list";
export interface DashboardTabsProps {
    label: string;
    children: React.ReactNode;
}
export interface DashboardViewDetailProps extends PropsWithChildren, HeaderI, Pick<DashboardViewListProps, "title"> {
    bodys: DashboardTabsProps[];
}

interface HeaderI extends AvatarUploadProps {
    name: string;
    description?: string;
    childrenHeader?: React.ReactNode;
}

interface ButtonsPaper {
    name: string;
    onClick: () => void;
}

interface Props {
    Header: React.FC<HeaderI>;
    Body: React.FC<{ first?: React.ReactNode; side?: React.ReactNode }>;
    Paper: React.FC<{ title: string; buttons?: ButtonsPaper[] } & PropsWithChildren>;
}

export const DashboardViewDetail: React.FC<DashboardViewDetailProps> & Props = ({
    children,
    bodys,
    title,
    ...props
}) => {
    return (
        <DashboardViewList title={title}>
            <DashboardViewDetail.Header {...props} />
            {bodys.length > 0 && (
                <Tabs id='custom-animation' value={0}>
                    <TabsHeader>
                        {bodys.map(({ label }, i) => (
                            <Tab key={i} value={i} className={" !w-fit px-5"}>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}
                    >
                        {bodys.map(({ children }, i) => (
                            <TabPanel key={i} value={i}>
                                {children}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            )}

            {children}
        </DashboardViewList>
    );
};

DashboardViewDetail.Header = function Header({ childrenHeader, ...props }) {
    return (
        <div className=' flex justify-center mobile:justify-between w-full'>
            <div className='flex flex-col mobile:flex-row  gap-4'>
                <div className=' flex justify-center'>
                    <AvatarUpload {...props} imageUri={getUriImageLow(props.imageUri)} />
                </div>
                <div className=' text-center mobile:text-start mt-2 max-w-[300px]'>
                    <h5>{props.name}</h5>
                    <p>{props.description}</p>
                    {childrenHeader}
                </div>
            </div>
        </div>
    );
};

DashboardViewDetail.Body = function Body({ first, side }) {
    return (
        <div className=' flex flex-wrap w-full gap-4'>
            <div className='   grow min-w-[300px]'>{first}</div>
            <div className='  grow flex-1 basis-[450px] '>{side}</div>
        </div>
    );
};

DashboardViewDetail.Paper = function PaperF({ title, children, buttons }) {
    return (
        <div className=' flex flex-col w-full'>
            <Card className=' min-h-[200px]'>
                <CardBody>
                    <div className=' w-full flex justify-between items-center mb-4'>
                        <h5 className='m-0'>{title}</h5>

                        {buttons && (
                            <Menu>
                                <MenuHandler>
                                    <EllipsisHorizontalIcon className=' fill-blue-gray-700 h-8 w-8 cursor-pointer' />
                                </MenuHandler>
                                <MenuList>
                                    {buttons.map(({ name, onClick }, i) => (
                                        <MenuItem key={i} onClick={onClick}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        )}
                    </div>
                    <div className='w-full'>{children}</div>
                </CardBody>
            </Card>
        </div>
    );
};
