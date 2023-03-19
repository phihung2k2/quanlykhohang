import { RouteObject } from "react-router-dom";

import { lazyImport } from "@/utils";
const { FinancesPage } = lazyImport(() => import("@/modules/finance/pages"), "FinancesPage");
const { BillsPage } = lazyImport(() => import("@/modules/finance/pages"), "BillsPage");
const { HistoryPage } = lazyImport(() => import("@/modules/finance/pages"), "HistoryPage");
const { BillPage } = lazyImport(() => import("@/modules/finance/pages"), "BillPage");

class Path {
    home = "finances";
    _bill = "bills";
    _list = "list";
    _history = "history";
    _detail = "detail";

    private _getPath(path: string) {
        return this.home + "/" + path;
    }

    private _getPathWithId(path: string) {
        return path + "/:id";
    }
}
export const financePath = new Path();
const path = financePath;

export const financeRoute = (): RouteObject => {
    return {
        path: path.home,
        children: [
            { index: true, element: <FinancesPage /> },
            { path: path._history + "/:id", element: <HistoryPage /> },
        ],
    };
};

export const billRoute = (): RouteObject => {
    return {
        path: path._bill,
        children: [
            { index: true, element: <BillsPage /> },
            { path: path._detail + "/:id", element: <BillPage /> },
        ],
    };
};
