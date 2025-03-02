import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ingredientReducer from "./slices/ingredientsSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import viewReducer from "./slices/viewSlice";
import authReducer from "./slices/authSlice";
import {
    connect,
    disconnect,
    onConnected,
    onDisconnected,
    sendMessage,
    onMessageReceived,
    onError,
} from "./slices/orderSlice";
import {
    connect as userConnect,
    disconnect as userDisconnect,
    onConnected as onUserConnected,
    onDisconnected as onUserDisconnected,
    sendMessage as userSendMessage,
    onMessageReceived as onUserMessageReceived,
    onError as onUserError,
} from "./slices/authSlice";
import { createWebSocketMiddleware } from "../middlewares/socket-middleware";
import { OrderMessageType } from "../types";

const orderWebSocketMiddleware = createWebSocketMiddleware<OrderMessageType>(
    {
        connect,
        disconnect,
        onConnected,
        onDisconnected,
        sendMessage,
        onMessageReceived,
        onError,
    },
    { withTokenRefresh: false },
);

const userOrderWebSocketMiddleware =
    createWebSocketMiddleware<OrderMessageType>(
        {
            connect: userConnect,
            disconnect: userDisconnect,
            onConnected: onUserConnected,
            onDisconnected: onUserDisconnected,
            sendMessage: userSendMessage,
            onMessageReceived: onUserMessageReceived,
            onError: onUserError,
        },
        {
            withTokenRefresh: true,
        },
    );

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    cart: cartReducer,
    order: orderReducer,
    view: viewReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            orderWebSocketMiddleware,
            userOrderWebSocketMiddleware,
        ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
