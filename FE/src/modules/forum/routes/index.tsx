import { RouteObject } from "react-router-dom";

import { lazyImport } from "@/utils";
const { ForumPage } = lazyImport(() => import("@/modules/forum/pages"), "ForumPage");
const { ForumsPage } = lazyImport(() => import("@/modules/forum/pages"), "ForumsPage");

class Path {
    home = "forums";
    _detail = "detail";
    _comments = "comments";

    private _getPath(path: string) {
        return this.home + "/" + path;
    }

    private _getPathWithId(path: string) {
        return path + "/:id";
    }

    detailPath = this._getPathWithId(this._detail);
}
export const forumPath = new Path();

export const forumRoute = (): RouteObject => {
    return {
        path: forumPath.home,
        children: [
            { index: true, element: <ForumsPage /> },
            { path: forumPath._detail + "/:id", element: <ForumPage /> },
        ],
    };
};

export const commentRoute = (): RouteObject => {
    return {
        path: forumPath._comments,
        children: [{ index: true, element: <ForumPage /> }],
    };
};
