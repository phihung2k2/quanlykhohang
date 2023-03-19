import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { NavbarDashboardProps } from "../config/navbar-dashboard";

export interface ButtonNavbarComProps extends NavbarDashboardProps {
    isPath?: boolean;
}

export const ButtonNavbarCom: React.FC<ButtonNavbarComProps> = ({ name, menu }) => {
    const location = useLocation();

    const { pathname } = location;

    const isMatch = menu.some((item) => {
        return pathname.includes(item.path);
    });
    return (
        <>
            <Menu placement='bottom-end'>
                <MenuHandler>
                    <Button className={`text-lg ${isMatch ? "" : "bg-blue-gray-400"}`}>{name}</Button>
                </MenuHandler>
                <MenuList>
                    {menu.map((item, i) => (
                        <NavLink key={i} to={item.path} className=' no-underline hover:no-underline'>
                            {({ isActive }) => (
                                <MenuItem
                                    className={` text-xl ${
                                        isActive ? "text-red-900" : "text-blue-gray-700"
                                    } hover:text-red-900`}
                                >
                                    {item.name}
                                </MenuItem>
                            )}
                        </NavLink>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
};
