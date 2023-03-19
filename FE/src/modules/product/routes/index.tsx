import { useCallback } from "react";
import { Navigate, RouteObject, useNavigate } from "react-router-dom";

import { lazyImport } from "@/utils";

const { ProductsPage } = lazyImport(() => import("@/modules/product/pages"), "ProductsPage");
const { ProductPage } = lazyImport(() => import("@/modules/product/pages"), "ProductPage");
const { CategorysPage } = lazyImport(() => import("@/modules/product/pages"), "CategorysPage");

class ProductPath {
    product = "products";
    _list = "list";
    _detail = "detail";
    _categorys = "categorys";

    private _getPath(path: string) {
        return this.product + "/" + path;
    }

    private _getPathWithId(path: string) {
        return path + "/:id";
    }

    listPath = this._getPath(this._list);
    detailPath = this._getPathWithId(this._detail);
}

export const productPath = new ProductPath();

export const productRoute = (): RouteObject => {
    return {
        path: productPath.product,
        children: [
            { index: true, element: <ProductsPage /> },
            { path: productPath.detailPath, element: <ProductPage /> },
        ],
    };
};

export const categoryRoute = (): RouteObject => {
    return {
        path: productPath._categorys,
        children: [{ index: true, element: <CategorysPage /> }],
    };
};

export const useNavigateProduct = () => {
    const navigate = useNavigate();
    const onNavigateProducts = useCallback(() => {
        navigate(productPath.listPath);
    }, [navigate]);
    const onNavigateProduct = useCallback(
        (id: unknown) => {
            navigate(productPath.detailPath + "/" + id);
        },
        [navigate]
    );

    return {
        onNavigateProducts,
        onNavigateProduct,
    };
};
