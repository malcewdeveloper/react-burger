import { UserTypeWithoutPassword } from "../../types";

export type ResponseAuth = {
    succes: boolean;
    message?: string;
};

export type RequestRegisterData = {
    email: string;
    password: string;
    name: string;
};

export type ResponseAuthData = ResponseAuth & {
    user: UserTypeWithoutPassword;
    accessToken: string;
    refreshToken: string;
};

export type ResponseAuthDataWithoutUser = Omit<ResponseAuthData, "user">;

export type RequestLoginData = {
    email: string;
    password: string;
};

export type RequestForgotData = {
    email: string;
};

export type RequestResetData = {
    password: string;
    token: string;
};
