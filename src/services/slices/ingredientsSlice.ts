import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponseDataType, ItemType } from "../../types";
import { getIngredients } from "../thunks/ingredientsThunks";

type IngredientState = {
    data: ItemType[];
    isLoading: boolean;
    isError: boolean;
};

const initialState: IngredientState = {
    data: [],
    isLoading: false,
    isError: false,
};

const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(
                getIngredients.fulfilled,
                (
                    state,
                    action: PayloadAction<ApiResponseDataType<ItemType[]>>,
                ) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.data = action.payload.data;
                },
            )
            .addCase(getIngredients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default ingredientSlice.reducer;
