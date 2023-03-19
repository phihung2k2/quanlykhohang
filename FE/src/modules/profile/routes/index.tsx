import { useCallback } from "react";
import { Navigate, RouteObject, useNavigate } from "react-router-dom";

import { lazyImport } from "@/utils";

const { ProfilePage } = lazyImport(() => import("@/modules/profile/pages"), "ProfilePage");

export const profileRoute = (): RouteObject => {
    return {
        path: "profile",
        children: [{ index: true, element: <ProfilePage /> }],
    };
};
