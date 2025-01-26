import { API_URL } from "../../constants";
import { checkResponse, getCookie } from "../../utils";
import authApi from "../auth";
import { RequestUserUpdate, ResponseUser } from "./types";

const userApi = {
    getUser: async (): Promise<ResponseUser> => {
        const token = getCookie("token");

        if (!token) {
            await authApi.getToken();
        }

        return fetch(`${API_URL}/auth/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getCookie("token")}`,
            },
        }).then(checkResponse);
    },
    updateUser: async (data: RequestUserUpdate) => {
        return fetch(`${API_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify(data),
        }).then(checkResponse);
    },
};

export default userApi;
