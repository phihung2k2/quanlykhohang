import { useCallback } from "react";
import { Navigate, RouteObject, useNavigate } from "react-router-dom";

import { lazyImport } from "@/utils";

import { AuthLayoutWidget } from "../widgets";

const { LoginPage } = lazyImport(() => import("@/modules/auth/pages"), "LoginPage");
const { RegisterPage } = lazyImport(() => import("@/modules/auth/pages"), "RegisterPage");
const { ForgotPasswordPage } = lazyImport(() => import("@/modules/auth/pages"), "ForgotPasswordPage");

class AuthPath {
    private _auth = "auth";
    private _login = "login";
    private _register = "register";
    private _forgotPassword = "forgot-password";

    private _getPath(path: string) {
        return "/" + this._auth + "/" + path;
    }

    loginPath = this._getPath(this._login);
    registerPath = this._getPath(this._register);
    forgotPasswordPath = this._getPath(this._forgotPassword);
}

export const authPath = new AuthPath();

export const authRoute = (isLoggedIn: boolean): RouteObject => {
    return {
        path: "auth",
        element: isLoggedIn ? <Navigate to='/app' /> : <AuthLayoutWidget />,
        children: [
            { index: true, element: <Navigate to={authPath.loginPath} /> },
            { path: authPath.loginPath, element: <LoginPage /> },
            { path: authPath.registerPath, element: <RegisterPage /> },
            { path: authPath.forgotPasswordPath, element: <ForgotPasswordPage /> },
        ],
    };
};

export const useNavigateAuth = () => {
    const navigate = useNavigate();
    const onNavigateLogin = useCallback(() => {
        navigate(authPath.loginPath);
    }, [navigate]);
    const onNavigateRegister = useCallback(() => {
        navigate(authPath.registerPath);
    }, [navigate]);
    const onNavigateForgotPassword = useCallback(() => {
        navigate(authPath.forgotPasswordPath);
    }, [navigate]);

    return {
        onNavigateLogin,
        onNavigateRegister,
        onNavigateForgotPassword,
    };
};
