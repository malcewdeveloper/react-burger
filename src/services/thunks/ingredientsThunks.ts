import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const getIngredients = createAsyncThunk(
    "ingredients/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/ingredients`);

            if (!response.ok) {
                throw Error("Something went wrong");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error || "Failed to fetch ingredients");
        }
    },
);
