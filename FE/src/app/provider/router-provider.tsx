import { memo } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "@/app/widgets";
import { getStoreAuth } from "@/modules/auth/func/auth-func";
import { authRoute } from "@/modules/auth/routes";

import { errorRoute, loginProtectRoute } from "../routes";
// import { useStoreAuth } from "@/modules/auth/hooks/useStoreAuth";
// import { authRoute } from "@/modules/auth/routes";
// import { ERROR_PATH } from "@/modules/error/config";
// import { errorRoute } from "@/modules/error/routes";

// import { loginProtectRoute, publicRoute } from "../routes";

export const APP_PATH = {
    ALL: "*",
    SLASH: "slash",
    DIR_NAME: "/",
    APP: "/app",
    ERROR: "/error",
};

const { DIR_NAME, APP } = APP_PATH;

const Router = memo(() => {
    // const { access_token } = useStoreAuth();
    // const is_logged_in = access_token ? true : false;

    const auth = getStoreAuth();
    const isLogged = !!auth;

    const role = auth?.user.role;

    return useRoutes([
        {
            path: DIR_NAME,
            element: <MainLayout />,
            children: [
                { index: true, element: isLogged ? <Navigate to={APP} /> : <Navigate to='auth/login' /> },
                // publicRoute(),
                loginProtectRoute(isLogged, role),
                errorRoute(),
                authRoute(isLogged),
            ],
        },
        {
            path: APP_PATH.ALL,
            // element: <Navigate to={DIR_NAME + "error"} />,
            element: <div>error</div>,
        },
    ]);
});

export const RoutesProvider = memo(() => {
    return <Router />;
});
