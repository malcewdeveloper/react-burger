import { createSlice } from "@reduxjs/toolkit";
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
        builder
            .addCase(postOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.number = action.payload.order.number;
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;

                console.error(action.payload);
            });
    },
});

export default orderSlice.reducer;
