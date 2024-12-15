import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types";

type ViewState = {
    selectProduct: ItemType | null;
};

const initialState: ViewState = {
    selectProduct: null,
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
    },
});

export const { addProduct, removeProduct } = viewSlice.actions;
export default viewSlice.reducer;
