import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType, OrderType } from "../../types";

type ViewState = {
    selectProduct: ItemType | null;
    selectOrder: OrderType | null;
};

const initialState: ViewState = {
    selectProduct: null,
    selectOrder: null,
};

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ItemType>) => {
            state.selectProduct = action.payload;
        },
        removeProduct: (state) => {
            state.selectProduct = null;
        },
        addOrder: (state, action: PayloadAction<OrderType>) => {
            state.selectOrder = action.payload;
        },
        removeOrder: (state) => {
            state.selectOrder = null;
        },
    },
});

export const { addProduct, removeProduct, addOrder, removeOrder } =
    viewSlice.actions;
export default viewSlice.reducer;
