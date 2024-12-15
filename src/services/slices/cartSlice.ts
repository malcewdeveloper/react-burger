import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types";

type CartState = {
    data: ItemType[];
};

const initialState: CartState = {
    data: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ItemType[]>) => {
            state.data = action.payload;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(
                (item) => item._id !== action.payload,
            );
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
