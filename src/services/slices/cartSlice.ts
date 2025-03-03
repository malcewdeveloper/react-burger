import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemTypeWithId } from "../../types";

type CartState = {
    data: ItemTypeWithId[];
};

const initialState: CartState = {
    data: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ItemTypeWithId>) => {
            if (action.payload.type === "bun") {
                state.data = state.data.filter((item) => item.type !== "bun");

                state.data = [action.payload, ...state.data, action.payload];

                return;
            }

            if (state.data.length) {
                state.data = [
                    state.data[0],
                    action.payload,
                    ...state.data.slice(1),
                ];
            } else {
                state.data = [action.payload];
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(
                (item) => item.id !== action.payload,
            );
        },
        moveItem: (
            state,
            action: PayloadAction<{ fromId: string; toId: string }>,
        ) => {
            const { fromId, toId } = action.payload;

            const fromIndex = state.data.findIndex(
                (item) => item.id === fromId,
            );

            const toIndex = state.data.findIndex((item) => item.id === toId);

            if (fromIndex !== -1 && toIndex !== -1) {
                const items = [...state.data];

                [items[fromIndex], items[toIndex]] = [
                    items[toIndex],
                    items[fromIndex],
                ];

                state.data = items;
            }
        },
        clearCart: (state) => {
            state.data = [];
        },
    },
});

export const { addItem, removeItem, moveItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
