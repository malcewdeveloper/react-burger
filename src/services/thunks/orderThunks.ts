import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

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
    async (data: RequestData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                return rejectWithValue(await response.json());
            }

            return (await response.json()) as ResponseData;
        } catch (error) {
            return rejectWithValue("Failed to create order");
        }
    },
);
