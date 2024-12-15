import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ingredientReducer from "./slices/ingredientsSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import viewReducer from "./slices/viewSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        cart: cartReducer,
        order: orderReducer,
        view: viewReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
