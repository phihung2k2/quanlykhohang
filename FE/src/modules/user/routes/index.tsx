import { Navigate, RouteObject } from "react-router-dom";

import { lazyImport } from "@/utils";
const { UserPage } = lazyImport(() => import("@/modules/user/pages"), "UserPage");
const { UsersPage } = lazyImport(() => import("@/modules/user/pages"), "UsersPage");

class Path {
    home = "user";
    _list = "list";
    _detail = "detail";

    private _getPath(path: string) {
        return this.home + "/" + path;
    }

    private _getPathWithId(path: string) {
        return path + "/:id";
    }

    listPath = this._getPath(this._list);
    detailPath = this._getPathWithId(this._detail);
}
export const userPath = new Path();

export const userRoute = (): RouteObject => {
    return {
        path: userPath.home,
        children: [
            { index: true, element: <Navigate to={userPath._list} /> },
            { path: userPath._list, element: <UsersPage /> },
            { path: userPath._detail + "/:id", element: <UserPage /> },
        ],
    };
};
