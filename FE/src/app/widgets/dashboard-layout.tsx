import React from "react";
import { Link, Outlet } from "react-router-dom";

import { imageUri } from "@/assets";

import { ButtonNavbarCom, UserLoginMenuCom } from "../components";
import { navbarDashboard } from "../config/navbar-dashboard";

export interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <header className='px-2 flex justify-between items-center'>
                <div className='my-4'>
                    <Link to={"/app"}>
                        <img src={imageUri.logos.main_logo} />
                    </Link>
                </div>
                <div>
                    <UserLoginMenuCom />
                </div>
            </header>
            <div className=' bg-orange-200 max-w-full px-2 py-3 overflow-x-auto '>
                <div className='flex space-x-5 w-max'>
                    {navbarDashboard.map((item, i) => (
                        <ButtonNavbarCom {...item} key={i} />
                    ))}
                </div>
            </div>
            <div className='px-2 grow flex-1 max-h-min  mt-5 w-full  overflow-y-hidden'>
                <Outlet />
            </div>
        </div>
    );
};
