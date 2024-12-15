import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const postOrder = createAsyncThunk(
    "order/post",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
            });

            if (!response.ok) {
                throw Error("Something went wrong");
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error || "Failed to create order");
        }
    },
);
