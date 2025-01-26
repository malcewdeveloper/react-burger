import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { checkResponse, getCookie } from "../../utils";

type RequestData = {
    ingredients: string[];
};

type ResponseData = {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
};

export const postOrder = createAsyncThunk<ResponseData, RequestData>(
    "order/post",
    async (data) => {
        return await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify(data),
        }).then(checkResponse);
    },
);
