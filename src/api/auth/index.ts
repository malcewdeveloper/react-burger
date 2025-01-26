import { API_URL } from "../../constants";
import { checkResponse, deleteCookie, getCookie, setCookie } from "../../utils";
import {
    ResponseAuth,
    RequestRegisterData,
    ResponseAuthData,
    RequestForgotData,
    RequestResetData,
    RequestLoginData,
} from "./types";

const authMiddleware = (data: ResponseAuthData) => {
    const { accessToken, refreshToken } = data;

    const [_, token] = accessToken.split(" ");

    setCookie("token", token, {
        expires: 20 * 60,
    });
    setCookie("refresh", refreshToken);

    return data;
};

const authApi = {
    register: async (data: RequestRegisterData): Promise<ResponseAuthData> => {
        return fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        })
            .then(checkResponse)
            .then(authMiddleware);
    },
    login: async (data: RequestLoginData): Promise<ResponseAuthData> => {
        return fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        })
            .then(checkResponse)
            .then(authMiddleware);
    },
    logout: async (): Promise<ResponseAuth> => {
        const token = getCookie("refresh");

        return fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ token }),
        })
            .then(checkResponse)
            .then((data) => {
                deleteCookie("token");
                deleteCookie("refresh");

                return data;
            });
    },
    forgotPassword: async (data: RequestForgotData): Promise<ResponseAuth> => {
        return fetch(`${API_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(checkResponse);
    },
    resetPassword: async (data: RequestResetData): Promise<ResponseAuth> => {
        return fetch(`${API_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(checkResponse);
    },
    getToken: async () => {
        const token = getCookie("refresh");

        return fetch(`${API_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ token }),
        })
            .then(checkResponse)
            .then(authMiddleware);
    },
};

export default authApi;
