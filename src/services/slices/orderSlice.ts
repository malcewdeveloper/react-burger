import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "../thunks/orderThunks";
import { OrderMessageType } from "../../types";

type OrderState = {
    data: OrderMessageType | null;
    number: number | null;
    error: Event | null;
    status:
        | "connecting"
        | "disconnecting"
        | "connected"
        | "disconnected"
        | "error";
    isLoading: boolean;
    isError: boolean;
};

const initialState: OrderState = {
    data: null,
    number: null,
    error: null,
    isLoading: false,
    isError: false,
    status: "disconnected",
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        connect: (state, _action: PayloadAction<string>) => {
            state.status = "connecting";
            state.data = null;
        },
        disconnect: (state) => {
            state.status = "disconnecting";
            state.data = null;
        },
        sendMessage: (_state, _action: PayloadAction<OrderMessageType>) => {},
        onConnected: (state, _action: PayloadAction<Event>) => {
            state.status = "connected";
            state.data = null;
        },
        onDisconnected: (state, _action: PayloadAction<CloseEvent>) => {
            state.status = "disconnected";
            state.data = null;
        },
        onMessageReceived: (state, action: PayloadAction<OrderMessageType>) => {
            state.data = action.payload;
        },
        onError: (state, action: PayloadAction<Event>) => {
            state.status = "error";
            state.error = action.payload;
        },
    },
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
            .addCase(postOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const {
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError,
} = orderSlice.actions;

export default orderSlice.reducer;
