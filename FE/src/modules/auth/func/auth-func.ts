import { clearLocalStored, getLocalStored } from "@/utils";

import { authKey } from "../hooks/store/use-auth-store";
import { LoginResponseI } from "../models";

export function getStoreAuth(): LoginResponseI | undefined | null {
    const store = getLocalStored(authKey);

    if (store) {
        return store.state.auth;
    } else {
        return null;
    }
}

export function getStoreToken() {
    const store = getLocalStored(authKey);

    if (store?.state?.auth) {
        const tokenAuth = store?.state?.auth;

        const token = {
            accessToken: tokenAuth?.accessToken || "",
            refreshToken: tokenAuth?.refreshToken || "",
        };
        return token;
    } else {
        return {
            accessToken: "",
            refreshToken: "",
        };
    }
}

export type GetStoreTokenType = ReturnType<typeof getStoreToken>;

export function getStoreUser() {
    const store = getLocalStored(authKey);

    if (store) {
        const user = store.state.auth.user;

        const token = {
            email: user.email,
            role: user.role,
            userId: user.userId,
        };
        return token;
    } else {
        return {
            email: "",
            role: "",
            userId: "",
        };
    }
}
export type GetStoreUserType = ReturnType<typeof getStoreUser>;

export function clearStoreAuth() {
    clearLocalStored(authKey);
}
