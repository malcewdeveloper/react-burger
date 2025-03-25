import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponseDataType, ItemType } from "../../../types";
import { getIngredients } from "../../thunks/ingredientsThunks";

type IngredientState = {
    data: ItemType[];
    isLoading: boolean;
    isError: boolean;
};

export const initialState: IngredientState = {
    data: [],
    isLoading: true,
    isError: false,
};

const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        incrementCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((item) =>
                item._id === action.payload
                    ? { ...item, __v: item.__v + 1 }
                    : item,
            );
        },
        decrementCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((item) =>
                item._id === action.payload
                    ? { ...item, __v: item.__v - 1 }
                    : item,
            );
        },
        incrementBun: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((item) =>
                item._id === action.payload
                    ? { ...item, __v: 2 }
                    : { ...item, __v: item.type === "bun" ? 0 : item.__v },
            );
        },
        decrementAll: (state) => {
            state.data = state.data.map((item) => ({ ...item, __v: 0 }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
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

export const { incrementCount, decrementCount, incrementBun, decrementAll } =
    ingredientSlice.actions;
export default ingredientSlice.reducer;
