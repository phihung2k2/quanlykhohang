import { lazyImport } from "@/utils/common";

const { RouteErrorPage } = lazyImport(() => import("../pages"), "RouteErrorPage");
export const errorRoute = () => {
    return {
        path: "/error",
        element: <RouteErrorPage />,
    };
};
