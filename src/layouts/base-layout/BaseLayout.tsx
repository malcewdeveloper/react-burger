import AppHeader from "../../components/app-header/AppHeader";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import styles from "./BaseLayout.module.css";

export default function BaseLayout() {
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
