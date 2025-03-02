import React from "react";
import AppHeader from "../../components/app-header/AppHeader";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../services/store";
import { getIngredients } from "../../services/thunks/ingredientsThunks";
import styles from "./BaseLayout.module.css";

export default function BaseLayout() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getIngredients());
    }, []);

    return (
        <>
            <AppHeader />
            <section className={styles.section}>
                <Outlet />
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="dark"
            />
        </>
    );
}
