import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "../thunks/orderThunks";

type OrderState = {
    number: number | null;
    isLoading: boolean;
    isError: boolean;
};

const initialState: OrderState = {
    number: null,
    isLoading: false,
    isError: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postOrder.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
    },
});

export default orderSlice.reducer;
