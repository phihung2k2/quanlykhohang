import { UserEntity } from "@/modules/user/models";

export interface UserAuth {
    userId: number;
    email: string;
    role: string;
}

export interface LoginResponseI {
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
    user: UserAuth;
}

export interface LoginInputI {
    email: string;
    password: string;
}

export interface RegisterInputI extends LoginInputI {
    firstname: string;
    lastname: string;
}
