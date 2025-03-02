import { Outlet } from "react-router";
import { useAppDispatch } from "../../services/store";
import { connect, disconnect } from "../../services/slices/orderSlice";
import React from "react";

export default function MainLayout() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(connect("wss://norma.nomoreparties.space/orders/all"));

        return () => {
            dispatch(disconnect());
        };
    }, []);

    return <Outlet />;
}
