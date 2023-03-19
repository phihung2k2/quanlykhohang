import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { billRoute, financeRoute } from "@/modules/finance/routes";
import { commentRoute, forumRoute } from "@/modules/forum/routes";
import { paypalRoute } from "@/modules/paypal/routes";
import { categoryRoute, productRoute } from "@/modules/product/routes";
import { profileRoute } from "@/modules/profile/routes";
import { programRoute, typeRoute } from "@/modules/program/routes";
import { userRoute } from "@/modules/user/routes";

import { ErrorRolePage } from "../pages/error-role-page";
import { DashboardLayout } from "../widgets";

export const loginProtectRoute = (isLoggedIn: boolean, role: any): RouteObject => {
    return {
        path: "app",
        element: isLoggedIn ? <DashboardLayout /> : <Navigate to={"/" + "auth/login"} />,

        children: [
            // { index: true, element: <Navigate to='dashboard' /> },
            {
                index: true,
                element: <div>Dashboard</div>,
            },

            adminRoute(role),
            profileRoute(),
            {
                path: "error-role",
                element: <ErrorRolePage />,
            },
            // { path: '/*', element: <Navigate to='/app/dashboard' /> },
        ],
    };
};

const adminRoute = (role: any): RouteObject => {
    return {
        path: "",
        element: role === "ADMIN" ? <Outlet /> : <Navigate to={"/app/error-role"} />,
        children: [
            programRoute(),
            userRoute(),
            forumRoute(),
            commentRoute(),
            financeRoute(),
            categoryRoute(),
            paypalRoute(),
            typeRoute(),
            billRoute(),
            productRoute(),
        ],
    };
};
