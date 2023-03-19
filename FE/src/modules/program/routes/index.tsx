import { useCallback } from "react";
import { Navigate, RouteObject, useNavigate } from "react-router-dom";

import { lazyImport } from "@/utils";
const { ProgramPage } = lazyImport(() => import("@/modules/program/pages"), "ProgramPage");
const { ProgramsPage } = lazyImport(() => import("@/modules/program/pages"), "ProgramsPage");
const { TypesPage } = lazyImport(() => import("@/modules/program/pages"), "TypesPage");
const { WorkoutPage } = lazyImport(() => import("@/modules/program/pages"), "WorkoutPage");

class ProgramPath {
    home = "programs";
    _list = "list";
    _detail = "detail";
    _types = "type-program";
    _workout = "workout/detail";

    private _getPath(path: string) {
        return this.home + "/" + path;
    }

    private _getPathWithId(path: string) {
        return path + "/:id";
    }

    listPath = this._getPath(this._list);
    detailPath = this._getPathWithId(this._detail);
}
export const programPath = new ProgramPath();

export const programRoute = (): RouteObject => {
    return {
        path: programPath.home,
        children: [
            { index: true, element: <ProgramsPage /> },
            { path: programPath._detail + "/:id", element: <ProgramPage /> },
            { path: programPath._workout + "/:id", element: <WorkoutPage /> },
        ],
    };
};

export const typeRoute = (): RouteObject => {
    return {
        path: programPath._types,
        children: [{ index: true, element: <TypesPage /> }],
    };
};

export const useNavigateProgram = () => {
    const navigate = useNavigate();
    const onNavigatePrograms = useCallback(() => {
        navigate(programPath.listPath);
    }, [navigate]);
    const onNavigateProgram = useCallback(
        (id: unknown) => {
            navigate(programPath.detailPath + "/" + id);
        },
        [navigate]
    );

    return {
        onNavigatePrograms,
        onNavigateProgram,
    };
};
